import React, {Component} from 'react';
import './AddWidget.css';

import _ from "lodash";


import Modal from "react-bootstrap/Modal";
import WidgetList from "../WidgetList.json"
// add widgets screens 
import Active_Orders_scrn from "../assets/image/Widgets/Active_Orders.png";
// import Drop_Analysis_scrn from "../../../assets/image/dashboard/Widgets/Drop_Analysis.png";
// import Fleet_Health_scrn from "../../../assets/image/dashboard/Widgets/Fleet_health.png";
import Orderd_in_Selected_Time_scrn from "../assets/image/Widgets/Orders_Selected_Time.png";
import Orders_Delivered_Today_scrn from "../assets/image/Widgets/Orders_delivered_Today.png";
import Total_Orders_scrn from "../assets/image/Widgets/Total_Orders.png";
import Orders_in_red_scrn from "../assets/image/Widgets/Orders_Red.png";
import Order_started_today_scrn from "../assets/image/Widgets/Orders_Started_today.png";
import Active_Trip_ETA_scrn from "../assets/image/Widgets/active_complete_eta_trip.png";
import Completed_Trip_ETA_scrn from "../assets/image/Widgets/active_complete_eta_trip.png";

import trip_towards_customer from "../assets/image/Widgets/Towards_Customer.jpg";
import trip_returning from "../assets/image/Widgets/Returning.jpg";
 import trip_atCustomer from "../assets/image/Widgets/Towards_Customer.jpg";
 import trip_inplant from "../assets/image/Widgets/Inplant.png";

class AddWidget extends Component {
    state = { widgetArray : [], 
      alllist : [],
      
      selected: 0,
      screeniconUrl:  {
        Active_OrdersUrl : Active_Orders_scrn,
        // Drop_Analysis_scrnUrl : Drop_Analysis_scrn,
        // Fleet_Health_scrnUrl :Fleet_Health_scrn,
        Orderd_in_Selected_TimeUrl : Orderd_in_Selected_Time_scrn, 
        TotalOrderIconUrl : Total_Orders_scrn, 
        Orders_in_redUrl : Orders_in_red_scrn, 
        Orders_Delivered_todayUrl : Orders_Delivered_Today_scrn,
        Orders_Started_todayUrl : Order_started_today_scrn, 
        Active_Trip_ETA_scrnUrl : Active_Trip_ETA_scrn, 
        Completed_Trip_ETA_scrnUrl : Completed_Trip_ETA_scrn,
        trip_towards_customerUrl:trip_towards_customer,
        trip_returnUrl:trip_returning,
         trip_at_customerUrl:trip_atCustomer,
         trip_at_plantUrl:trip_inplant
      }
     }

    toGetWidgetIcon = (key ) => {
        var iconUrl=  this.toReturnWidgetIcon(key, this.state.screeniconUrl)
        return iconUrl;
    };    
  
    toReturnWidgetIcon = (keys, data) => {
      return data[keys + "Url"];
    };
    
    componentDidMount(){
      let activeArr = this.props.activeArr;
      this.getAllInactiveWidgets(activeArr);
    }



    getAllInactiveWidgets=(activeArr)=>{
      var list = WidgetList.widgetsList;
       var widgettempArr = []
        for (let index = 0; index < activeArr.length; index++) {  
          const element = activeArr[index];
          if(widgettempArr.length!=0){
            widgettempArr= widgettempArr.filter(function (e) {
              if(e.id != element){
                e.active = false;
                return e.id != element;
              }else{
                e.active = true;
              }
          } )
         
          }
          else{
            widgettempArr= list.filter(function (e) {
              if(e.id != element){
                e.active = false;
                return e.id != element;
              }else{
                e.active = true;
              }
          } )
          }         
        }

      
      this.setState({ alllist: list, widgetArray: list, activeArr: activeArr })
    
    }


 

      
     

    render() { 
      const { selected, categories } = this.state;
        return (  
          
          <Modal
                show={this.props.isEditAlertshow}
                onHide={this.props.handleEditAlertClose}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Widgets
            </Modal.Title>
          </Modal.Header>
            <Modal.Body className="dashboard-modal-body">
              <div id="directory-page" className="widget-group">
              
              <div className="right-panel">
                <div className="list-panel">
                  <table className="table table-hover table-responsive-lg text-left">
                    <tbody className="table-scroller display">
                    { this.state.widgetArray.length > 0 ? 
                      this.state.widgetArray.map((value,index)=>
                      <tr key={index} className="highlight">
                        <td className="img-width120">
                          <img style={{ width: "120px", "height" : "60px" }} src={this.toGetWidgetIcon( value.img )} alt="Edit" />
                        </td>
                        <td className="widget-description">
                          <h6> {value.name}</h6>
                          <span>{value.description}</span>
                        </td>
                        <td className="button-action">
                         
                        <button className='btn  btn-fontweight btn-danger'    
                        disabled={value.active}
                        onClick={() =>{ //this.state.widgetArray.splice(index, 1);
                          value.active = true
                        this.props.addWidgetFun(value.cords)}}>
                        Add widget
                      </button>
                     
                          
                        </td>
                      </tr> 
                        ): <tr key={0}>{"NO WIDGETS FOUND"}</tr> }
                      </tbody>
                    </table>
                  </div>
              </div>
              </div>
            </Modal.Body>
          </Modal>
        
        );
    }
}
 
export default AddWidget;

