
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const intialState = {
    errorMessages : null,
    message: null, apiData : null
};

const updateWidgetDataSuccess = (state, action) => {
   
    return updateObject( state, { 
        errorMessages : null,
        apiData: action.message

     } );
};

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_WIDGETDATA_SUCCESS: return updateWidgetDataSuccess(state, action);
        default:
            return state;
    }
};
export default reducer;