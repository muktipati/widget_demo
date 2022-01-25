import React from 'react';
import Total_Orders from "./assets/image/Total_Orders.png"

class TotalWidget extends React.Component {

  render() {
   
    const { widgetName,widgetCount } = this.props
    return (
      
        <div >
          <p className="marigin0 dashboard-header-text">{widgetName}</p>
          <div className="dashboard-order-content marigin0">
            <div className="dashboard-order-name-width padding0">
              <div className="dashboard-order-name">
                {/* <p className="marigin0">Total Orders</p> */}
                <h3 className="marigin0" style={{"cursor":"pointer"}}
                >{widgetCount}</h3>
      
              </div>
            </div>
            <div className="dashboard-order-imgcontent padding0">
              <img className="dashboard-img-width" src={Total_Orders} alt="Italian Trulli" />
            </div>

          </div>
        </div>
     
    )
  }
}
export default TotalWidget
