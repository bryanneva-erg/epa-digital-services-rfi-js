import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    getOptions(inputValue){
        console.warn('ActionCreators -- getOptions:', inputValue);
        EchoWebAPIUtils.fetchOptions(inputValue).then(function(data) {
            console.warn('ActionCreators -- Resolve Promise:', data)
            AppDispatcher.dispatch({
                type: AppConstants.GET_OPTIONS_SUCCESS,
                options:data
            });
        });
    }
}

const OptionActionCreators = new ActionCreators();

export default OptionActionCreators;