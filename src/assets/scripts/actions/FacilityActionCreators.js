import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    newFacility(){
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FACILITY            
        });
    }

    saveFacility(facility, permits){
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FACILITY,
            facility: facility,
            permits: permits
        });
    }

    removeFacility(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_FACILITY,
            index: data
        });    
    }
}

const FacilityActionCreators = new ActionCreators();

export default FacilityActionCreators;