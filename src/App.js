import React, { Component } from 'react';
import { Counter } from './assets/scripts/components/Counter';
import { NICE, SUPER_NICE } from './colors';
import LatLng from './assets/scripts/components/leaflet/LatLng.js';
import { LineGraph } from './assets/scripts/components/graph/LineGraph.js';
import './assets/styles/base.scss';

const example_data = [{
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

export class App extends Component {
  render() {
    return (
        <div>
            <Counter increment={1} color={NICE} />
            <Counter increment={5} color={SUPER_NICE} />

            <div id="line-graph-container"><LineGraph data={example_data} /></div>
            <div id="map"><LatLng /></div>
            
        </div>
        
    );
  }
}