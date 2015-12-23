import React, { Component } from 'react';
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import './assets/styles/base.scss';

import { GraphContainer } from './assets/scripts/components/Graph/GraphContainer';
import { FacilityContainer } from './assets/scripts/components/Facilities/FacilityContainer';
import { FacilityContainerOld } from './assets/scripts/components/Facilities/FacilityContainer.old';
import { MapContainer } from './assets/scripts/components/Map/MapContainer';
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
        <div id="app__container">
            
            <div id="header__container">
                <div id="header__outer-container">
                    <div id="header__buttons">
                        <button className="button">Home</button>
                        <button className="button">Facility List</button>
                    </div>
                    <div id="header__tabs">
                        <ul>
                            <li><a href="#">SO<sub>2</sub></a></li>
                            <li><a href="#">CO<sub>2</sub></a></li>
                            <li><a href="#">NOx</a></li>
                        </ul>
                    </div>
                    <div id="header__spacer">
                    </div>
                </div>
            </div>
            
            <div id="map-data__container">
                
                <div id="map-data__map">
                    <MapContainer />
                </div>
                
                <div id="map-data__facility-info">
                    <FacilityContainer />
                </div>

                <div id="map-data__monitoring-stations">
                    <h2>Monitoring</h2>
                </div>
            </div>

            <div className="usa-grid">
                <h2>Original</h2>
                <FacilityContainerOld />
                <GraphContainer />
                <div className="usa-width-one-fourth">
                    <h2>Monitoring</h2>
                </div>
            </div>
            
            <div className="usa-grid" id="ambientemissions__container">
                <div className="usa-width-one-whole">
                    <h2>Ambient x Facility Emissions Graph</h2>
                </div>
            </div>
            
            <footer className="usa-footer usa-footer-big usa-sans" role="contentinfo">
                <div className="usa-grid usa-footer-return-to-top">
                    <a href="#">Return to top</a>
                </div>
                <div className="usa-footer-primary-section">
                    <div className="usa-grid-full">
                        <div className="usa-width-one-whole">
                            <p>Footer Area</p>
                        </div>
                    </div>                    
                </div>
            </footer>
        </div>
        
    );
  }
}