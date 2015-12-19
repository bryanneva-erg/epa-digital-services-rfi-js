import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
// import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    editing: false,
};

class FacilityStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    getList() {
        return _store;
    }
}

const FacilityStore = new FacilityStoreClass();

AppDispatcher.register((payload) => {
    
    const action = payload;

    switch(action.type) {
        case AppConstants.NEW_FOO:
            _store.editing = true;
            FacilityStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SAVE_FOO:
            _store.list.push(action.foo);
            _store.editing = false;
            FacilityStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_FOO:
            _store.list = _store.list.filter((item,index) => {
                return index !== action.index;
            });
            FacilityStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

export default FacilityStore;