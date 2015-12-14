import React from 'react';
import { render } from 'react-dom';
import './assets/styles/base.scss';
import { App } from './App';
import d3 from 'd3';
// import LineGraph from './assets/scripts/components/LineGraph';
import USMap from './assets/scripts/components/leaflet/USMap.js';
// import { LineChart } from 'react-d3-components';
import { LineGraph } from './assets/scripts/components/graph/LineGraph.js';
import LatLng from './assets/scripts/components/leaflet/LatLng.js';

render(<App />, document.getElementById('root'));
// render(<USMap />, document.getElementById('map'));
render(<LatLng />, document.getElementById('map'));


var example_data = [{

    "year":2005,
    "cumulative_so2":24446
},{
    "year":2006,
    "cumulative_so2":34446
},{
    "year":2007,
    "cumulative_so2":34446
},{ 
    "year":2008,
    "cumulative_so2":44446
},{
    "year":2009,
    "cumulative_so2":54446
},{
    "year":2010,
    "cumulative_so2":64446
},{
    "year":2011,
    "cumulative_so2":75284
},{
    "year":2012,
    "cumulative_so2":76284
},{
    "year":2013,
    "cumulative_so2":76384
},{
    "year":2014,
    "cumulative_so2":76784
}];


render(<LineGraph data={example_data} />, document.getElementById('line-graph-container'));
