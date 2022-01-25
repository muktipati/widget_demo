import { combineReducers } from "redux"
import widgetReducer from "./widgetReducer"


const rootReducer = combineReducers({
    widget:widgetReducer
  })
  export default rootReducer