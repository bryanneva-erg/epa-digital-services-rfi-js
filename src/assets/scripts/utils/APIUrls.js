export const APIUrls = {
    'CORS_PREFIX': {
        // url: "https://cors-anywhere.herokuapp.com/"
        url: "https://crossorigin.me/"
    },
    'ECHO_PREFIX': {
        url: 'https://ofmpub.epa.gov/echo/'
    },
    'DFR': {
        url: 'dfr_rest_services.get_dfr',
        id: 'p_id'
    },
    'FACILITY':{
        url: 'air_rest_services.get_facilities?output=json&passthrough=Y',
        lookup: 'p_sfs'
    },
    'ECATT': {
        url: 'ecatt_ems_rest_services.get_ems'        
    },
    'CAAPR': {
        url: 'caa_poll_rpt_rest_services.get_caapr',
        id: 'p_id'
    }
}