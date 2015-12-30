import FacilityActionCreators from '../actions/FacilityActionCreators';
import AmbientEmissionActionCreators from '../actions/AmbientEmissionActionCreators';
import FacilityEmissionActionCreators from '../actions/FacilityEmissionActionCreators';
import request from 'superagent';
import { APIUrls } from './APIUrls';
import _ from 'lodash';
import math from 'mathjs';

let cache = {
    '': []
};

class APIUtils {
    
    findFacilityByFRS(frsId){
        
        FacilityActionCreators.newFacility();
        FacilityActionCreators.loadFacility();

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
                    name: selected_facility.NAME.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
                    frs: selected_facility.PUV,
                    lat: selected_facility.LAT,
                    lng: selected_facility.LON,
                    city: relevant_permit.FacilityCity.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
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

    fetchOptions(query) {
        return new Promise(function(resolve, reject) {
            var result = cache[query], url;

            if(result !== undefined) {
                resolve(results);
            } else {
                console.warn('Echo API Util -- fetchOptions:', query)

                request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + APIUrls.FACILITY.url)
                        .query({[APIUrls.FACILITY.lookup]: query})
                        .end(function(err, resp) {
                            let json = JSON.parse(resp.text);
                            resolve(json.Results.Facilities);
                        });

                

            }
        });
    }
}

const EchoWebAPIUtils = new APIUtils();

export default EchoWebAPIUtils;