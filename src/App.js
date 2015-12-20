import React, { Component } from 'react';
import { GraphContainer } from './assets/scripts/components/Graph/GraphContainer';
import './assets/styles/base.scss';
import { FacilityContainer } from './assets/scripts/components/Facilities/FacilityContainer';
// import EchoWebAPIUtils from './assets/scripts/utils/EchoWebAPIUtils';

export class App extends Component {
  render() {
    return (
        <div>
            <FacilityContainer /><br />
            <GraphContainer />
        </div>
        
    );
  }
}