// React
import React, { Component } from 'react';

import '../../../styles/containers/DataMapContainer.scss';

// Components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui';

import { FacilityInfo } from '../Facilities/FacilityInfo';
import { MapContainer } from '../Map/MapContainer';

export class DataMapContainer extends Component {
  render() {
    return (
        <div id="data-map__container">
            <div id="data-map__map">
                <MapContainer />
            </div>
            
            <div id="data-map__facility-info">
                <Tabs contentContainerStyle={{'backgroundColor':'#FFFFFF'}} tabItemContainerStyle={{'backgroundColor':'#112e51'}}>
                    <Tab label="SO₂">
                        <FacilityInfo />
                    </Tab>
                    <Tab label="CO₂">
                        <FacilityInfo />
                    </Tab>
                    <Tab label="NOₓ">
                        <FacilityInfo />
                    </Tab>                                      
                </Tabs>
            </div>
						<div id="data-map__monitoring-stations">
								<div className="data-map__spacer--top"></div>
								<div className="data-map__monitoring-stations--body">
										<h3>Monitoring Stations</h3>
										<div className="monitoring-stations__list">
												<ul>
														<li className="monitoring-stations__list--top">Station A</li>
														<li>Station B</li>
														<li>Station C</li>
												</ul>
										</div>
								</div>                
						</div>
        </div>        
    );
  }
}