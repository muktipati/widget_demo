import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const initialState = {
	width: 100,
	
}

const WidthProvider = ComposedComponent => class extends Component {
	static propTypes = {
		measureBeforeMount: PropTypes.bool
	}

	static defaultProps = {
		measureBeforeMount: false
	}

	mounted = false

	// added a timeout to account for sidebar animation time
	onWindowResize = () => {
		setTimeout(() => {
			this.calculateWidth()
		}, 200)
	}

	calculateWidth = () => {
		if(!this.mounted) return
		let node = ReactDOM.findDOMNode(this);

		if(node instanceof HTMLElement) {
			this.setState({ width: node.offsetWidth })
		}
	}

	componentDidMount () {
		this.mounted = true
		window.addEventListener('resize', this.onWindowResize)
		this.onWindowResize()
	}

	componentWillUnmount () {
		this.mounted = false
		window.removeEventListener('resize', this.onWindowResize)
	}

	constructor(props) {
		super(props)
		this.state = initialState
	}

	render () {
		if(this.props.measureBeforeMount && !this.mounted) {
			return <div className={this.props.className} style={this.props.style} />
		}

		return <ComposedComponent {...this.props} {...this.state} />
	}
}

export default WidthProvider