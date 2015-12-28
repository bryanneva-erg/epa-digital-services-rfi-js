import FacilityActionCreators from '../actions/FacilityActionCreators';
import AmbientEmissionActionCreators from '../actions/AmbientEmissionActionCreators';
import FacilityEmissionActionCreators from '../actions/FacilityEmissionActionCreators';
import _ from 'lodash';
import math from 'mathjs';

class APIUtils {
    
    getMonitoringStations(){
        console.log('Get list of Monitoring Stations')
    }

    getMonitoringStation(id) {
        console.log('Get Monitoring Station data')
    }
}

const LocalStorageAQSUtils = new APIUtils();

export default LocalStorageAQSUtils;