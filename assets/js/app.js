var mathjs = require('mathjs');

var DataSource = (function() {
	'use strict';

	// var _url = 'http://ofmpub.epa.gov/echo/ecatt_ems_rest_services.get_ems';
	// var _url = '_sampledata/ecatt_ems_rest_services.get_ems.json';

	function get(url) {

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: {
				dataout: 'TopFacs',
				p_year:  2014,
				p_st:    'AK',
				p_pname: 'Sulfur dioxide',
				qcolumns: 10
			},
		})
		.done(function(data) {
			console.log("success");

			var total_annual_emission = 0;
			$.each(data.Results.TopFacs,function(indx,val) {
				if(this.UnitOfMeasure !== 'Pounds'){
					alert(this.UnitOfMeasure)
				}

				total_annual_emission += this.AnnualEmission;
			});

			console.log(total_annual_emission);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
		
	}

	return {
		get:get
	};
}());

$(document).ready(function() {

	var this_year = new Date().getFullYear();
	
	for (var i = this_year - 1; i >= this_year - 6; i --) {
		console.log(i);
		DataSource.get('/_sampledata/ecatt_ems_rest_services.get_ems.so2.' + i + '.json');
	};

    $('#container').highcharts({
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
            series: {
                allowPointSelect: true
            }
        },
        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
        	data: [216.4, 194.1,176.0,148.5,144.0,135.6, 129.2,106.4,   71.5,  95.6, 54.4,29.9]
        }
        ]
    });


    // the button action
    $('#button').click(function () {
        var chart = $('#container').highcharts(),
            selectedPoints = chart.getSelectedPoints();

        if (chart.lbl) {
            chart.lbl.destroy();
        }
        chart.lbl = chart.renderer.label('You selected ' + selectedPoints.length + ' points', 100, 60)
            .attr({
                padding: 10,
                r: 5,
                fill: Highcharts.getOptions().colors[1],
                zIndex: 5
            })
            .css({
                color: 'white'
            })
            .add();
    });
});