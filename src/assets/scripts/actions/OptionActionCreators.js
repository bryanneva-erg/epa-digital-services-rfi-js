import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';

class ActionCreators {

    getOptions(inputValue){
        
        if(inputValue === '') return this.clearOptions();

        EchoWebAPIUtils.fetchOptions(inputValue).then(function(data) {
            AppDispatcher.dispatch({
                type: AppConstants.GET_OPTIONS_SUCCESS,
                options:data
            });
        });
    }

    clearOptions(){
        AppDispatcher.dispatch({
            type: AppConstants.CLEAR_OPTIONS
        });
    }
}

const OptionActionCreators = new ActionCreators();

export default OptionActionCreators;