import React, { Component } from 'react';
import { GraphContainer } from './assets/scripts/components/Graph/GraphContainer';
import './assets/styles/base.scss';
import { FacilityContainer } from './assets/scripts/components/Facilities/FacilityContainer';
// import EchoWebAPIUtils from './assets/scripts/utils/EchoWebAPIUtils';
import FacilityActionCreators from './assets/scripts/actions/FacilityActionCreators';

const origin = {
    name: "Original Location (Colorado)",
    frs: 0,
    lat: "39.7",
    lng: "-105.1",
    state: 'CO',
    city: 'Denver',
    zip: '80123'
}

FacilityActionCreators.newFacility();
FacilityActionCreators.saveFacility(origin);
FacilityActionCreators.selectFacility([origin]);

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