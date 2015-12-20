import EchoServerActionCreators from '../actions/EchoServerActionCreators';
import reqwest from 'reqwest';
import $ from 'jquery';

class APIUtils {
    
    findFacilityByFRS(frsId){
        const data = frsId;
        // const url = 'http://jsonplaceholder.typicode.com';
        const url = 'http://ofmpub.epa.gov/echo/dfr_rest_services.get_dfr';
        
        $.ajax({
            url: url,
            type: 'GET',
            data: {p_id: frsId},
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
        // reqwest({
        //     url: url,
        //     type: 'jsonp',
        //     jsonpCallback: 'foo',
        //     success: function(resp) {
        //         let json = JSON.parse(resp);
        //         console.log(json);
        //     }
        // })

        const facility = {
                name: Math.random().toString(36).substring(7),
                frs: frsId,
                lat: Math.random().toString().substring(3,5),
                lng: Math.random().toString().substring(3,5)
            }
        
        EchoServerActionCreators.saveFacility(facility);
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