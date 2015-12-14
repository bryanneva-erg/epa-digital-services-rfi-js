var DataSource = require('./utils/DataSource');
var LineGraph = require('./components/LineGraph');
var d3 = require('d3');
var L = require('leaflet');
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

$(document).ready(function() {
    /*
    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });
    /*/
    var map = L.map('map').setView([41.096, -100.327], 5);
    //*/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'bryanneva.oclj42hm',
        accessToken: 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ'
    }).addTo(map);


	var this_year = new Date().getFullYear();
	for (var i = this_year - 1; i >= this_year - 6; i --) {
		DataSource.get('/_sampledata/ecatt_ems_rest_services.get_ems.so2.' + i + '.json', i, useReturnData);
        // DataSource.get('http://ofmpub.epa.gov/echo/ecatt_ems_rest_services.get_ems',i,useReturnData)
	};

    var data_sum = [];

	function useReturnData(year,data){
	    data_sum.push({'year':year,'cumulative_so2':data});
	    console.log(JSON.stringify(data_sum));        
	};

    d3.json('data.json', function(error, json) {
      if (error) return console.warn(error);
      data = json;
      LineGraph.build(data);
    });

    
});
