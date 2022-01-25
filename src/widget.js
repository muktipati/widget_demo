import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive } from "react-grid-layout";
import WidthProvider from "./Width";
import WidgetList from "./WidgetList.json"
import TotalWidget from "./TotalWidget";
import AddWidget from "./addWidgetModal/AddWidget"
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
};

class Widget extends React.Component {


    static propTypes = {
        onLayoutChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        className: "layout",
        rowHeight: 20,
        margin: [50, 50, 50, 50],

        onLayoutChange: function () { },
        cols: { lg: 9, md: 8, sm: 6, xs: 4, xxs: 1 },

        initialLayout: this.getLayOut,
        resetLayout: [{ x: 0, y: 0, w: 2, h: 4, minH: 4, minW: 2, "i": "0" },
        { x: 2, y: 0, w: 2, h: 4, minH: 4, minW: 2, "i": "1" },
        { x: 4, y: 0, w: 2, h: 4, minH: 4, minW: 2, "i": "2" },
        { x: 0, y: 0, w: 2, h: 4, minH: 4, minW: 2, "i": "3" },
        { x: 2, y: 1, w: 2, h: 4, minH: 4, minW: 2, "i": "4" },
        { x: 4, y: 1, w: 2, h: 4, minH: 4, minW: 2, "i": "5" },
        { x: 6, y: 0, w: 2, h: 8, minH: 8, minW: 2, "i": "6" },
        { x: 6, y: 3, w: 2, h: 9, minH: 9, minW: 2, "i": "7" },
        { x: 0, y: 4, w: 3, h: 9, minH: 9, minW: 3, "i": "8" },
        { x: 3, y: 3, w: 3, h: 9, minH: 9, minW: 3, "i": "9" },
        { x: 0, y: 3, w: 3, h: 4, minH: 4, minW: 3, "i": "10" }
        ],
        isAutoRefresh: false,



    };
    constructor(props) {
        super(props);
        this.state = {
            changeLayout: "",
            initialLayout: "",
            updateLayout: "",
            widgetResponseData: [],
            activeArr: [],
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: this.props.initialLayout },
            updatevalue: 25,
            isAddWidget: false
        }
        this.getLayOut = this.getLayOut.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentDidMount() {
        this.getLayOut();
        this.setState({ mounted: true });
        let event = new CustomEvent("resize");
        window.dispatchEvent(event);
    }
    getLayOut = (updateData) => {
        let inputdata = updateData ? updateData : 1;

        let WidgetListArr = WidgetList.widgetsList;

        // call widget data apis 
        let str = "0,13,2,4,4,2,0|0,0,2,4,4,2,1|2,0,2,4,4,2,2|4,13,2,4,4,2,3|4,0,2,4,4,2,4|2,13,2,4,4,2,5|3,4,3,9,9,3,8|0,4,3,9,9,3,9|0,17,2,4,4,2,10|2,17,2,4,4,2,11|4,17,2,4,4,2,12|6,17,2,4,4,2,13";
        var oldArray = str.split('|');

        var newArray = [];
        var widgetArray = [];
        var activeArr = []
        let start = 0;
        let end = 6;
        let data = oldArray.slice(start, end);
        let str1 = str.toString().slice(0, -1)

        for (let i = 0; i < oldArray.length; i++) {

            const element = oldArray[i];
            let dataSeparate = element.split(',');
            let jsonObj = {};
            var defaultjsondata = _.filter(WidgetListArr, { 'id': dataSeparate[6] });
            if (defaultjsondata.length > 0) {
                jsonObj = {
                    x: parseInt(dataSeparate[0]), y: parseInt(dataSeparate[1]),
                    w: parseInt(dataSeparate[2]), h: parseInt(dataSeparate[3]),
                    minH: parseInt(dataSeparate[4]), minW: parseInt(dataSeparate[5]), "i": dataSeparate[6]
                }

                widgetArray.push(jsonObj);
                activeArr.push(dataSeparate[6])
                this.props.getwidgetAPIData(inputdata, dataSeparate[6], this.getData)

                newArray.push(oldArray);
            }

        }

        this.setState({ layouts: { lg: widgetArray }, changeLayout: str1, initialLayout: str1, activeArr: activeArr })


    }
    componentWillUnmount() {
        this.mounted = false
        window.removeEventListener('resize', this.onWindowResize)

    }
    getData = (data) => {
        this.state.widgetResponseData.push(data)
        this.onLayoutChange(this.state.layouts.lg);

    }
    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint
        });
    }
    onLayoutChange(layout, layouts) {
        let updatedWidgetOrder = "";
        let activeArr = [];
        if (layout) {
            for (let index = 0; index < layout.length; index++) {
                const element = layout[index];
                updatedWidgetOrder += element.x + "," + element.y + "," + element.w + "," + element.h + "," + element.minH + "," + element.minW + "," + element.i;
                if (index != layout.length - 1) {
                    updatedWidgetOrder += "|"
                }
                activeArr.push(element.i)

            }

            this.setState({ changeLayout: updatedWidgetOrder, updateLayout: updatedWidgetOrder, activeArr: activeArr });


            this.props.onLayoutChange(layout, layouts);




        }

    }
    onRemoveWidget(i) {


        let removeItem = this.state.layouts.lg;
        if (removeItem.length < 2) {
            alert("Dashboard", "At least One widget required");
        } else {
            let data = _.reject(removeItem, function (el) {
                return el.i === i;
            })

            var arr = this.state.activeArr;

            _.remove(arr, function (el) {
                return el === i;
            });
            this.setState({ layouts: { lg: data }, activeArr: arr })
        }


    }
    // Create layout Onload/changeLayout 
    createWidget = (el) => {
        //console.log("this.state.widgetResponseData",this.state.widgetResponseData)
        const i = el.i;
        let key = null
        let WidgetListArr = WidgetList.widgetsList;
        var defaultjsondata = _.filter(WidgetListArr, { 'id': i });
        var responsejsondata = _.filter(this.state.widgetResponseData, { 'id': i });
        if (responsejsondata.length > 0) {
            key = Object.keys(responsejsondata[0])[0];
        }

        if (defaultjsondata[0].type === "tabular") {
            //var widgetIcon = this.toGetWidgetIcon(defaultjsondata[0].img);

            return (<div key={i} data-grid={el} className="dashboard-order">
                <TotalWidget widgetName={defaultjsondata[0].name}
                    // widgetIcon={widgetIcon}
                    widgetCount={responsejsondata.length > 0 ?
                        // responsejsondata[0][defaultjsondata[0].inputParam] : ""}
                        responsejsondata[responsejsondata.length - 1][key] : ""}//to assign the key dynamically

                />
                <i className="fa fa-times-circle" style={removeStyle}
                    onClick={this.onRemoveWidget.bind(this, i)}
                ></i>


            </div>)
        }

    }

    stopData = () => {
        clearInterval(this.clearInterval);
    }
    refreshedSummary_reports = () => {
        this.setState({ updatevalue: ++this.state.updatevalue }, () => {
            this.getLayOut(this.state.updatevalue);
        })

    }
    updateData = () => {
        let refreshInterval = 1
        this.setState({ isAutoRefresh: true }, () => {

            if (this.state.isAutoRefresh) {
                this.clearInterval = setInterval(this.refreshedSummary_reports.bind(this), refreshInterval * 3000);
                //this.refreshedSummary_reports()
            } else {
                clearInterval(this.clearInterval);
            }
        })
    }
    handleEditAlertClose = () => {
        this.setState({
            isAddWidget: false
        })
    }
    handleEditModal = () => {
        this.setState({
            isAddWidget: true
        })
    }
    getAddWidgetData = (data) => {
        this.state.widgetResponseData.push(data)
      }
    
      //Method : New Widget Add Implementation
      onAddWidget = (cords) => {
       
        let WidgetListArr = WidgetList.widgetsList;
       
        var defaultjsondata = _.filter(WidgetListArr, { 'id': cords.i });
    
        const { layouts } = this.state;
        const newItem = cords;
    
        this.props.getwidgetAPIData(this.state.updatevalue, cords.i, this.getAddWidgetData)
        newItem.x = 0;
        newItem.y = 0;
        var newArray = layouts.lg.map(item => {
          if (item.x === 0) {
            return { y: item.y++, ...item };
          }
          return item;
        }).concat([newItem]);
    
        var arr = this.state.activeArr.push(cords.i)
    
    
        this.setState({ layouts: { lg: newArray }, activeArr: arr});
    
        // toastr.success("Dashboard", "Widget Successfully added")
    
      }
    render() {
        return (
            <div className="dashboard-gridDiv" >
                <div className="btn-section">
                    <button className="btn btn-danger m-1"
                        onClick={this.updateData}>update data</button>
                    <button className="btn btn-danger m-1" onClick={this.stopData}>stop data</button>
                    <button className="btn btn-danger m-1" onClick={this.handleEditModal}>add widget</button>
                </div>

                {this.state.isAddWidget ? (
                    <AddWidget
                        isEditAlertshow={this.state.isAddWidget}
                        handleEditAlertClose={this.handleEditAlertClose}
                        changeLayout={this.state.changeLayout}
                        activeArr={this.state.activeArr}
                        addWidgetFun={(cords) => this.onAddWidget(cords)}
                    />
                ) : (
                    ""
                )}

                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={(layout, layouts) =>
                        this.onLayoutChange(layout, layouts)
                    }
                    measureBeforeMount={true}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {_.map(this.state.layouts.lg, el => this.createWidget(el))}

                </ResponsiveReactGridLayout></div>
        )
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {

        getwidgetAPIData: (inputdata, widgetIndex, callbackfn) => dispatch(actions.totalOrders(inputdata, widgetIndex, callbackfn))
    };
};
// export default Widget;
export default connect(mapStateToProps, mapDispatchToProps)(Widget);