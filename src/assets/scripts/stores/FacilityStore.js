import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    selectedFacility: {},
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

    getSelectedFacility() {
        return _store.selectedFacility;
    }
}

const FacilityStore = new FacilityStoreClass();

AppDispatcher.register((payload) => {
    
    const action = payload;

    switch(action.type) {
        case AppConstants.NEW_FACILITY:
            _store.editing = true;
            FacilityStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SAVE_FACILITY:
            _store.list.push(action.facility);
            _store.editing = false;
            FacilityStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SELECT_FACILITY:
            _store.selectedFacility = action.facility
            FacilityStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_FACILITY:
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