import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    newFacility(){
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FACILITY            
        });
    }

    saveFacility(facility){
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FACILITY,
            facility: facility
        });
    }

    selectFacility(facility){
        AppDispatcher.dispatch({
            type: AppConstants.SELECT_FACILITY,
            facility: facility
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