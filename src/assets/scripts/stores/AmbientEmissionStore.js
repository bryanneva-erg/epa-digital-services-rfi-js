import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    selected: 'SO2',
    editing: false,
};

class AmbientEmissionStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    getList() {
        return _store;
    }

    getSelected() {
        return _store.selected;
    }
}

const AmbientEmissionStore = new AmbientEmissionStoreClass();

AppDispatcher.register((payload) => {
    const action = payload;

    switch(action.type) {
        case AppConstants.NEW_AMBIENTEMISSION:
            _store.editing = true;
            AmbientEmissionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SAVE_AMBIENTEMISSION:
            _store.list.push(action.ambientemission);
            _store.editing = false;
            AmbientEmissionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_AMBIENTEMISSION:
            _store.list = _store.list.filter((item,index) => {
                return index !== action.index;
            });
            AmbientEmissionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SELECT_AMBIENTEMISSION:
            _store.selected = payload.emission;
            AmbientEmissionStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

export default AmbientEmissionStore;