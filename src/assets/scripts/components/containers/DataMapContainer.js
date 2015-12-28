// React
import React, { Component } from 'react';

import '../../../styles/containers/DataMapContainer.scss';

// Components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui';
// import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui-with-sass';

import { FacilityInfo } from '../Facilities/FacilityInfo';
import { MapContainer } from '../Map/MapContainer';

export class DataMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activetab: 1
        };        
    }
    _onActive(index, e){
        console.log(e);
        this.setState({activetab: index})
    }

    render() {
        
        const selected_so2 = this.state.activetab === 1;
        const selected_co2 = this.state.activetab === 2;
        const selected_nox = this.state.activetab === 3;

        let so2_active = '';
        let co2_active = '';
        let nox_active = '';
        if(selected_so2) {
            so2_active = 'tab--active';
        }

        if(selected_co2) {
            co2_active = 'tab--active';
        }

        if(selected_nox) {
            nox_active = 'tab--active';
        }

        console.log(so2_active)

        return (
            <div id="data-map__container">
                <div id="data-map__map">
                    <MapContainer />
                </div>

                <div id="data-map__facility-info">
                    <Tabs className="tabs__container" contentContainerStyle={{'backgroundColor':'#FFFFFF'}} tabItemContainerStyle={{'backgroundColor':'#112e51'}}>
                        <Tab label="SO₂" onActive={this._onActive.bind(this,1)} selected={ selected_so2 } data-id="1" className={ so2_active }>
                            <FacilityInfo />
                        </Tab>
                        <Tab label="CO₂" onActive={this._onActive.bind(this,2)} selected={ selected_co2 } data-id="2" className={ co2_active }>
                            <FacilityInfo />
                        </Tab>
                        <Tab label="NOₓ" onActive={this._onActive.bind(this,3)} selected={ selected_nox } data-id="3" className={ nox_active }>
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