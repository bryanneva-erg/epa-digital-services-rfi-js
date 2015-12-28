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
                <div className="data-map__spacer--top"></div>
                <MapContainer />
            </div>
            
            <div id="data-map__facility-info">
                <Tabs contentContainerStyle={{'backgroundColor':'#FFFFFF',height:'400px'}} tabItemContainerStyle={{'backgroundColor':'#046b99'}}>
                    <Tab label="SO2">
                        <FacilityInfo type="SO2" />
                    </Tab>
                    <Tab label="CO2">
                        <FacilityInfo type="CO2" />
                    </Tab>
                    <Tab label="NOx">
                        <FacilityInfo type="NOx" />
                    </Tab>
                </Tabs>
            </div>

            <div id="data-map__monitoring-stations">
                <div className="data-map__spacer--top"></div>
                <div className="data-map__monitoring-stations--body">
                    <h2>Monitoring Stations</h2>
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