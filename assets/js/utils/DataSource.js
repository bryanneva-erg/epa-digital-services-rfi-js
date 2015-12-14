var math = require('mathjs');

var DataSource = (function() {
    'use strict';

    // var _url = 'http://ofmpub.epa.gov/echo/ecatt_ems_rest_services.get_ems';
    // var _url = '_sampledata/ecatt_ems_rest_services.get_ems.json';

    function get(url, year, callback) {

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {
                dataout:   'TopFacEmissions',
                responseset: '40',
                p_year:    year,
                p_st:      'AK',
                p_pname:   'Sulfur dioxide',
                qcolumns:  '10',
                p_program: 'CAMD'
            },
        })
        .done(function(data) {

            var total_annual_emission = 0;
            $.each(data.Results.TopFacs,function(indx,val) {
                if(this.UnitOfMeasure !== 'Pounds'){
                    alert(this.UnitOfMeasure)
                }

                total_annual_emission = math.eval(total_annual_emission + parseInt(this.AnnualEmission));
            });
            
            callback(year,total_annual_emission);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
        });
        
        
    }

    return {
        get:get
    };
}());

module.exports = DataSource;