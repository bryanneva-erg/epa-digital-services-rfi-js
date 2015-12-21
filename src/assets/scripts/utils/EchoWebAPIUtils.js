import FacilityActionCreators from '../actions/FacilityActionCreators';
import AmbientEmissionActionCreators from '../actions/AmbientEmissionActionCreators';
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

            console.log(relevant_permit.FacilityState, relevant_permit.FacilityCity, relevant_permit.FacilityZip);            

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

    getSO2EmissionsRecursive(index,end,params){
        
        console.log('Getting:', index, '-- Progress:', index, '/', end);

        const pollutant = 'Sulfur dioxide';
        request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + APIUrls.ECATT.url)
                .query({ dataout: 'TopFacEmissions',
                         responseset: '100',
                         p_year: index,
                         p_st: params.state,
                         p_pname: pollutant })
                .end(function(err, resp) {
                    
                    console.log('Done', index);
                    
                    let json = JSON.parse(resp.text);
                    
                    callback(json.Results.TopFacEmissions);

                    if(index !== end){
                        this.getSO2EmissionsRecursive(++index,end,params);
                    } 

                }.bind(this));

        let callback = function(data) {
            let total_annual_emissions = 0;
            let unit = 'Pounds';
            _.forEach(data,function(n, key) {
                if(n.UnitOfMeasure !== 'Pounds'){
                    console.log('Warning: Non-standard unit of measure --', n.UnitOfMeasure);
                }

                total_annual_emissions = math.eval(total_annual_emissions + parseInt(n.AnnualEmission));

            });

            const ambient_emission = {
                year: index,
                emissions: total_annual_emissions,
                state: params.state,
                pollutant: pollutant,
                unit: unit
            }
            
            console.log('Saving data for year', index);
            
            AmbientEmissionActionCreators.saveAmbientEmission(ambient_emission);
        }
    }

    getSO2EmissionsByYear(state, year){
        console.log('Fetching data');
        AmbientEmissionActionCreators.newAmbientEmission()
        const pollutant = 'Sulfur dioxide';

        request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + 'ecatt_ems_rest_services.get_ems')
                .query({dataout: 'TopFacEmissions',
                        responseset: '100',
                        p_year: year,
                        p_st: state,
                        p_pname: pollutant})
                .end(function(err,resp) {
                    let json = JSON.parse(resp.text);
                    callback(json.Results.TopFacEmissions);
                });

        function callback(data) {
            let total_annual_emissions = 0;
            let unit = 'Pounds';
            _.forEach(data,function(n, key) {
                if(n.UnitOfMeasure !== 'Pounds'){
                    console.log(n.UnitOfMeasure);
                }

                total_annual_emissions = math.eval(total_annual_emissions + parseInt(n.AnnualEmission));

            });

            const ambient_emission = {
                year: year,
                emissions: total_annual_emissions,
                state: state,
                pollutant: pollutant,
                unit: unit
            }
            console.log('Data received for year', year);
            AmbientEmissionActionCreators.saveAmbientEmission(ambient_emission);
        }

    }
}

const EchoWebAPIUtils = new APIUtils();

export default EchoWebAPIUtils;