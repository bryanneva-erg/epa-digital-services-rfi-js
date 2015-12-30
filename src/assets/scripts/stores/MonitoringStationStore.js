import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    listData: [],
    focusedStation: false,
    editing: false,
};

class MonitoringStationStoreClass extends EventEmitter {
    
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    get() {
        return _store;
    }

    getData(index){
        return _.find(_store.listData,function(n){
            return n.index === index;
        });
    }

    getFocusedStation(){
        return _store.focusedStation
    }
}

const MonitoringStationStore = new MonitoringStationStoreClass();

AppDispatcher.register((payload) => {

    const action = payload;

    switch(action.type) {
        case AppConstants.ADD_MONITORINGSTATIONS:
            _.forEach(action.monitoring_stations, function(n, index) {
                _store.list.push(n);
            });
            MonitoringStationStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.ADD_MONITORINGSTATIONDATA:
            _store.listData.push({index:action.index,data:action.data});
            MonitoringStationStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.FOCUS_MONITORINGSTATION:
            _store.focusedStation = action.data;        
            MonitoringStationStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.CLEAR_MONITORINGSTATIONS:
            _store.list = [];
            _store.listData = [];
            MonitoringStationStore.emit(CHANGE_EVENT);
            break;
        
    }
});

export default MonitoringStationStore;