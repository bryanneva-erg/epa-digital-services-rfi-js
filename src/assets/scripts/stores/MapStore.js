import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    focused: { lat: 39.50, lng:-98.35 },
    editing: false,
};

class MapStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    get() {
        return _store;
    }

    getFocusedCoordinates(){
        return _store.focused;
    }
}

const MapStore = new MapStoreClass();

AppDispatcher.register((payload) => {

    const action = payload;

    switch(action.type) {
        case AppConstants.FOCUS_COORDINATES:
            // console.warn('MapStore -- Focusing on these coordinates:', action.lat,action.lng)
            _store.focused = {lat: action.lat, lng: action.lng};
            MapStore.emit(CHANGE_EVENT);
            break;
    }
});

export default MapStore;