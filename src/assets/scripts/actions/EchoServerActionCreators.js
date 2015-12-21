import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import EchoWebAPIUtils from '../utils/EchoWebAPIUtils';
import _ from 'lodash';

class ActionCreators {

    findFacilityByFrs(frs){
        EchoWebAPIUtils.findFacilityByFRS(frs);
    }
    
    getSO2EmissionsRecursive(start,end,params){
        EchoWebAPIUtils.getSO2EmissionsRecursive(start,end,params);
    }

    getSO2EmissionsByYear(state,year){
        EchoWebAPIUtils.getSO2EmissionsByYear(state,year);
    }
}

const EchoServerActionCreators = new ActionCreators();

export default EchoServerActionCreators;