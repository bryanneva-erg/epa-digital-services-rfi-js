import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    SO2: [],
    CO2: [],
    NOx: [],
    years: [],
    editing: false,
};

class FacilityEmissionStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    get() {
        // _.sortBy(_store.list, function(item) {
        //     return item.year;
        // });
        return _store;
    }
}

const FacilityEmissionStore = new FacilityEmissionStoreClass();

AppDispatcher.register((payload) => {
    const action = payload;

    switch(action.type) {
        case AppConstants.NEW_FACILITYEMISSION:
            _store.editing = true;
            _store.SO2 = [];
            _store.CO2 = [];
            _store.NOx = [];
            FacilityEmissionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.SAVE_FACILITYEMISSION:
            _store.SO2.push(action.SO2);
            _store.CO2.push(action.CO2);
            _store.NOx.push(action.NOx);
            _store.years.push(action.years);
            _store.editing = false;
            FacilityEmissionStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.REMOVE_FACILITYEMISSION:
            _store.list = _store.list.filter((item,index) => {
                return index !== action.index;
            });
            FacilityEmissionStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

export default FacilityEmissionStore;