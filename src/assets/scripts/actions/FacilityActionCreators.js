import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';
import MonitoringStationActionCreators from './MonitoringStationActionCreators';

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

        MonitoringStationActionCreators.getAroundPoint(facility);
    }

    focusFacility(index) {
        AppDispatcher.dispatch({
            type: AppConstants.FOCUS_FACILITY,
            index: index
        });
    }

    unselectFacility(facility){
        AppDispatcher.dispatch({
            type: AppConstants.UNSELECT_FACILITY,
            facility: facility
        });
    }

    clearSelectedFacilities(){
        AppDispatcher.dispatch({
            type: AppConstants.CLEAR_FACILITIES,
        });
    }

    removeFacility(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_FACILITY,
            index: data
        });    
    }

    loadFacility(){
        AppDispatcher.dispatch({
            type: AppConstants.LOAD_FACILITY
        });
    }
}

const FacilityActionCreators = new ActionCreators();

export default FacilityActionCreators;