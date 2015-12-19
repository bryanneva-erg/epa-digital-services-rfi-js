import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

class ActionCreators {
    newFoo(data) {
        console.log(data)
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FOO,
            foo: data
        });    
    }

    saveFoo(data) {
        console.log(data);
        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FOO,
            foo: data
        });    
    }    

    removeFoo(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_FOO,
            foo: data
        });    
    }    
}

const EchoServerActionCreators = new ActionCreators();

export default EchoServerActionCreators;