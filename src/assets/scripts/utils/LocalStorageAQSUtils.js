import _ from 'lodash';
import math from 'mathjs';
import { AQS_MONITORING_STATIONS } from '../../data/AQS_MONITORING_STATIONS';
import { AQS } from '../../data/AQS';
import MonitoringStationActionCreators from '../actions/MonitoringStationActionCreators';

class APIUtils {
    
    getMonitoringStationsByBounds(bounds){
        const selected_stations = _.filter(AQS_MONITORING_STATIONS.data, function(n) {
            let latitude = parseFloat(n.Latitude);
            let longitude = parseFloat(n.Longitude);
            if(latitude > bounds._southWest.lat && latitude < bounds._northEast.lat){

                if(longitude > bounds._southWest.lng && longitude < bounds._northEast.lng){
                    return n;    
                }                
            }
        });

        MonitoringStationActionCreators.addMonitoringStations(selected_stations);
    }

    getMonitoringStationsByPoint(point){
        const selected_stations = _.filter(AQS_MONITORING_STATIONS.data, function(n) {
            let latitude = parseFloat(n.Latitude);
            let longitude = parseFloat(n.Longitude);
            if(latitude > parseFloat(point.lat) - 0.1  && latitude < parseFloat(point.lat) + 0.1){

                if(longitude > parseFloat(point.lng) - 0.1 && longitude < parseFloat(point.lat) - 0.1){
                    n.data = this.getMonitoringStationData(n);
                    return n;
                }                
            }
        }.bind(this));


        // console.warn('Selected Stations',selected_stations)
        MonitoringStationActionCreators.addMonitoringStations(selected_stations);
    }

    getMonitoringStationData(item) {
        const selected_data = _.filter(AQS.data, function(n) {
            if(n['Site ID'] == item['Site Number'] && n.Latitude === item.Latitude && n.Longitude === item.Longitude){
                return n;
            }
        });

        return selected_data;

        // MonitoringStationActionCreators.addMonitoringStationData(index,selected_data);
    }
}

const LocalStorageAQSUtils = new APIUtils();

export default LocalStorageAQSUtils;