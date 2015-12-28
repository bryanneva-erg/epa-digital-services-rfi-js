import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';
import _ from 'lodash';

class ActionCreators {

    newFacilityEmission(){
        AppDispatcher.dispatch({
            type: AppConstants.NEW_FACILITYEMISSION
        });
    }

    saveFacilityEmission(report,years){
        let SO2 = _.filter(report, function(n) {
            return n.Pollutant === "Sulfur dioxide";
        });

        let CO2 = _.filter(report, function(n) {
            return n.Pollutant === "Carbon dioxide";
        });

        let NOx = _.filter(report, function(n) {
            return n.Pollutant === "Nitrous oxide";
        });


        AppDispatcher.dispatch({
            type: AppConstants.SAVE_FACILITYEMISSION,
            SO2: SO2,
            CO2: CO2,
            NOx: NOx,
            years: years
        });
    }

    removeFacilityEmission(data) {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_FACILITYEMISSION,
            index: data
        });    
    }
}

const FacilityEmissionActionCreators = new ActionCreators();

export default FacilityEmissionActionCreators;