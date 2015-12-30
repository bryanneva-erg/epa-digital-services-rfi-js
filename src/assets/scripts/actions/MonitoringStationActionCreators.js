import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import LocalStorageAQSUtils from '../utils/LocalStorageAQSUtils';

class ActionCreators {

    getWithinBounds(bounds){
        LocalStorageAQSUtils.getMonitoringStationsByBounds(bounds);
    }

    getAroundPoint(point){
        LocalStorageAQSUtils.getMonitoringStationsByPoint(point);
    }

    addMonitoringStations(monitoring_stations){
        AppDispatcher.dispatch({
            type: AppConstants.ADD_MONITORINGSTATIONS,
            monitoring_stations: monitoring_stations
        });
    }

    getMonitoringStationData(index, item){
        LocalStorageAQSUtils.getMonitoringStationData(index, item);
    }

    addMonitoringStationData(index,data){
        AppDispatcher.dispatch({
            type: AppConstants.ADD_MONITORINGSTATIONDATA,
            index:index,
            data: data
        });   
    }

    focusMonitoringStation(data){
        AppDispatcher.dispatch({
            type: AppConstants.FOCUS_MONITORINGSTATION,
            data: data
        });
    }
}

const MonitoringStationActionCreators = new ActionCreators();

export default MonitoringStationActionCreators;