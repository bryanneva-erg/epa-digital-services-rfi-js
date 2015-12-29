// Core
import React, { Component } from 'react';
import '../../../styles/containers/DataMapContainer.scss';

// Components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui';
// import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui-with-sass';
import { FacilityInfo } from '../Facilities/FacilityInfo';
import { MapContainer } from '../Map/MapContainer';
import { MonitoringStations } from '../Facilities/MonitoringStations';


export class DataMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activetab: 1
        };        
    }
    _onActive(index, e){
        this.setState({activetab: index})
    }

    render() {
        
        const selected_so2 = this.state.activetab === 1;
        const selected_co2 = this.state.activetab === 2;
        const selected_nox = this.state.activetab === 3;

        let so2_active = 'tab';
        let co2_active = 'tab';
        let nox_active = 'tab';
        if(selected_so2) {
            so2_active = 'tab tab--active';
        }

        if(selected_co2) {
            co2_active = 'tab tab--active';
        }

        if(selected_nox) {
            nox_active = 'tab tab--active';
        }

        return (
            <div id="data-map__container">
                <div id="data-map__map">
                    <MapContainer />
                </div>

                <div id="data-map__facility-info">

                    <Tabs inkBarStyle={{'display': 'none'}} className="tabs__container" contentContainerStyle={{'backgroundColor':'#FFFFFF'}} tabItemContainerStyle={{'backgroundColor':'#112e51'}}>
                        <Tab label="SO₂" onActive={this._onActive.bind(this,1)} selected={ selected_so2 } data-id="1" className={so2_active}>
                            <FacilityInfo type="SO2" />

                        </Tab>
                        <Tab label="CO₂" onActive={this._onActive.bind(this,2)} selected={ selected_co2 } data-id="2" className={ co2_active }>
                            <FacilityInfo type="CO2" />
                        </Tab>
                        <Tab label="NOₓ" onActive={this._onActive.bind(this,3)} selected={ selected_nox } data-id="3" className={ nox_active }>
                            <FacilityInfo type="NOx" />
                        </Tab>                                      
                    </Tabs>
                </div>
                <div id="data-map__monitoring-stations">
                    <div className="data-map__spacer--top"></div>
                    <div className="data-map__monitoring-stations--body">
                        <MonitoringStations className="monitoring-stations__list" />
                    </div>                
                </div>
            </div>        
        );
    }
}