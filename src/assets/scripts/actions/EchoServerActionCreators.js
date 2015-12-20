import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    findFacilityByFrs(frs){
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FACILITY,
        });

        EchoWebAPIUtils.findFacilityByFRS(frs);
    }

    saveFacility(facility){
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FACILITY,
            facility: facility
        });
    }

    newFoo(data) {
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FOO,
            foo: data
        });    
    }

    saveFoo(data) {
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FOO,
            foo: data
        });    
    }    

    removeFoo(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_FOO,
            index: data
        });    
    }    
}

const EchoServerActionCreators = new ActionCreators();

export default EchoServerActionCreators;