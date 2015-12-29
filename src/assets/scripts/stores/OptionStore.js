import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    editing: false,
};

class OptionStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    get() {
        return _store;
    }
}

const OptionStore = new OptionStoreClass();

AppDispatcher.register((payload) => {

    const action = payload;

    switch(action.type) {
        case AppConstants.GET_OPTIONS_SUCCESS:
            if(action.options !== undefined){
                _store.list = action.options;    
            }
            OptionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CLEAR_OPTIONS:
            _store.list = [];
            OptionStore.emit(CHANGE_EVENT);
            break;
    }
});

export default OptionStore;