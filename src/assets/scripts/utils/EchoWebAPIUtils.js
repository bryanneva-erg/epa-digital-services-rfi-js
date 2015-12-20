import EchoServerActionCreators from '../actions/EchoServerActionCreators';
import request from 'superagent';
import { APIUrls } from './APIUrls';

class APIUtils {
    
    findFacilityByFRS(frsId){        

        EchoServerActionCreators.newFacility();
        
        request.get(APIUrls.CORS_PREFIX.url + APIUrls.ECHO_PREFIX.url + APIUrls.DFR.url)
                .query({[APIUrls.DFR.id]: frsId})
                .end(function(err, resp) {
                    let json = JSON.parse(resp.text);
                    callback(json.Results.MapOutput.MapData[0]);                    
                });

        function callback(data){
            const facility = {
                    name: data.NAME,
                    frs: data.PUV,
                    lat: data.LAT,
                    lng: data.LON
                }

            EchoServerActionCreators.saveFacility(facility);
        }
    }

    newFoo(data){
        EchoServerActionCreators.newFoo(data);
    }

    saveFoo(data){    
        EchoServerActionCreators.saveFoo(data);
    }

    removeFoo(data){    
        EchoServerActionCreators.removeFoo(data);
    }
}

const EchoWebAPIUtils = new APIUtils();

export default EchoWebAPIUtils;