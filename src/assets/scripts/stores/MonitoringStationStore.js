import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
    list: [],
    listData: [],
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
            // console.warn('Adding this data:',action.index,action.data)
            _store.listData.push({index:action.index,data:action.data});
            MonitoringStationStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

export default MonitoringStationStore;