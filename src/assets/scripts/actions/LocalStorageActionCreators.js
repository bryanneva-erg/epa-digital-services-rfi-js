import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import LocalStorageAQSUtils from '../utils/LocalStorageAQSUtils';
import _ from 'lodash';

class ActionCreators {

    getMonitoringStations(){
        LocalStorageAQSUtils.getMonitoringStations();
    }

    getMonitoringStationData(id){
        LocalStorageAQSUtils.getMonitoringStationData(id);
    }
}

const LocalStorageActionCreators = new ActionCreators();

export default LocalStorageActionCreators;