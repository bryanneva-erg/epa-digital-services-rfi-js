import React, { Component } from 'react';
import { LineGraph } from './assets/scripts/components/graph/LineGraph';
import './assets/styles/base.scss';
import { SAMPLE_DATA } from './assets/data/SAMPLE_DATA';
import { FacilityContainer } from './assets/scripts/components/Facilities/FacilityContainer';

export class App extends Component {
  render() {
    return (
        <div>
            <FacilityContainer /><br />
            
            <div id="line-graph-container"><LineGraph data={ SAMPLE_DATA } /></div>
        </div>
        
    );
  }
}