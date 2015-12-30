import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    newAmbientEmission(){
        AppDispatcher.dispatch({
            type: AppConstants.NEW_AMBIENTEMISSION
        });
    }

    saveAmbientEmission(ambientemission){
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_AMBIENTEMISSION,
            ambientemission: ambientemission
        });
    }

    removeAmbientEmission(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_AMBIENTEMISSION,
            index: data
        });    
    }

    selectAmbientEmission(emission) {
        AppDispatcher.dispatch({
            type: AppConstants.SELECT_AMBIENTEMISSION,
            emission:emission
        });
    }
}

const AmbientEmissionActionCreators = new ActionCreators();

export default AmbientEmissionActionCreators;