import * as actionTypes from "./actionTypes";




export const updateWidgetDataSuccess = (message) => {
    return {
        type: actionTypes.GET_WIDGETDATA_SUCCESS,
        apiData: message,
    }
}


export const totalOrders = (inputdata,widgetindex, callbackfn) => {
  
    
    let resdata = {deliveredtoday:inputdata}
   
    return dispatch => {
        
            var data = resdata;
            data["id"] = widgetindex;
            callbackfn(data)
            dispatch(updateWidgetDataSuccess(data))
          
     
  
    }
  }