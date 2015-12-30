// Core
import React, { Component } from 'react';
import '../../../styles/containers/DataMapContainer.scss';

// Components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Tabs, Tab, List, ListDivider, ListItem } from 'material-ui';
import { FacilityInfo } from '../Facilities/FacilityInfo';
import { MapContainer } from '../Map/MapContainer';
import { MonitoringStations } from '../Facilities/MonitoringStations';

// Flux
import AmbientEmissionActionCreators from '../../actions/AmbientEmissionActionCreators';

export class DataMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activetab: 'SO2'
        };        
    }
    _onActive(index, e){
        this.setState({activetab: index});
        AmbientEmissionActionCreators.selectAmbientEmission(index);
    }

    render() {
        const selected_so2 = this.state.activetab === 'SO2';
        const selected_co2 = this.state.activetab === 'CO2';
        const selected_nox = this.state.activetab === 'NOx';
        

        let so2_active = 'tab',
            co2_active = 'tab',
            nox_active = 'tab';

        switch(this.state.activetab){
            case 'SO2':
                so2_active += ' tab--active';
                break;
            case 'CO2':
                co2_active += ' tab--active';
                break;
            case 'NOx':
                nox_active += ' tab--active';
                break;
        }

        return (
            <div id="data-map__container">
                <div id="data-map__map">
                    <MapContainer />
                </div>

                <div id="data-map__facility-info">

                    <Tabs inkBarStyle={{'display': 'none'}} className="tabs__container" contentContainerStyle={{'backgroundColor':'#FFFFFF'}} tabItemContainerStyle={{'backgroundColor':'#112e51'}}>
                        <Tab label="SO₂" onActive={this._onActive.bind(this,'SO2')} selected={ selected_so2 } className={so2_active}>
                            <FacilityInfo type="SO2" />
                        </Tab>
                        <Tab label="CO₂" onActive={this._onActive.bind(this,'CO2')} selected={ selected_co2 } className={ co2_active }>
                            <FacilityInfo type="CO2" />
                        </Tab>
                        <Tab label="NOₓ" onActive={this._onActive.bind(this,'NOx')} selected={ selected_nox } className={ nox_active }>
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