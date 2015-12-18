import React, { Component } from 'react';
import LatLng from './assets/scripts/components/leaflet/LatLng';
import { LineGraph } from './assets/scripts/components/graph/LineGraph';
import './assets/styles/base.scss';
import { SAMPLE_DATA } from './assets/data/SAMPLE_DATA';
import { TextInput } from './assets/scripts/components/input/TextInput';

export class App extends Component {
  render() {
    return (
        <div>
            <TextInput label="Facility Name" />
            <div id="line-graph-container"><LineGraph data={ SAMPLE_DATA } /></div>
            <div id="map"><LatLng /></div>
        </div>
        
    );
  }
}