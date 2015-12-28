import FacilityActionCreators from '../actions/FacilityActionCreators';
import AmbientEmissionActionCreators from '../actions/AmbientEmissionActionCreators';
import FacilityEmissionActionCreators from '../actions/FacilityEmissionActionCreators';
import request from 'superagent';
import { APIUrls } from './APIUrls';
import _ from 'lodash';
import math from 'mathjs';

class APIUtils {
    
    findFacilityByFRS(frsId){
        
        FacilityActionCreators.newFacility();

        request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + APIUrls.DFR.url)
                .query({[APIUrls.DFR.id]: frsId})
                .end(function(err, resp) {
                    let json = JSON.parse(resp.text);
                    callback(json.Results.MapOutput.MapData, json.Results.Permits);
                });

        function callback(facility_data, permits){
            let selected_facility = _.find(facility_data, function(chr){
                return chr.PUV == frsId;
            });
            
            let relevant_permit = _.find(permits, function(chr) {
                return chr.SourceID == frsId;
            });

            // console.log(relevant_permit.FacilityState, relevant_permit.FacilityCity, relevant_permit.FacilityZip);            

            const facility = {
                    name: selected_facility.NAME,
                    frs: selected_facility.PUV,
                    lat: selected_facility.LAT,
                    lng: selected_facility.LON,
                    city: relevant_permit.FacilityCity,
                    state: relevant_permit.FacilityState,
                    zip: relevant_permit.FacilityZip
                }

            FacilityActionCreators.saveFacility(facility);
        }
    }

    getFacilityEmissions(frsId) {

        FacilityEmissionActionCreators.newFacilityEmission();

        request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + APIUrls.CAAPR.url)
                .query({[APIUrls.DFR.id]: frsId})
                .end(function(err, resp) {
                    let json = JSON.parse(resp.text);
                    if(json.Results.Message === "Success"){
                        callback(json.Results);    
                    } else {
                        console.log('CAAPR: Server reports error', json.Results);
                    }
                });

        function callback(data) {
            const triYears = [data.TRI_year_01,
                             data.TRI_year_02,
                             data.TRI_year_03,
                             data.TRI_year_04,
                             data.TRI_year_05,
                             data.TRI_year_06,
                             data.TRI_year_07,
                             data.TRI_year_08,
                             data.TRI_year_09,
                             data.TRI_year_10];

            const report = data.CAAPollRpt;

            FacilityEmissionActionCreators.saveFacilityEmission(report.Pollutants,triYears);
        }
    }
}

const EchoWebAPIUtils = new APIUtils();

export default EchoWebAPIUtils;