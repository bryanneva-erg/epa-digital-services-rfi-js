import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

class ActionCreators {

    focusCoordinates(lat,lng){
        console.warn("Focusing on these coords",lat,lng)
        AppDispatcher.dispatch({
            type: AppConstants.FOCUS_COORDINATES,
            lat: lat,
            lng: lng
        });
    }
}

const MapActionCreators = new ActionCreators();

export default MapActionCreators;