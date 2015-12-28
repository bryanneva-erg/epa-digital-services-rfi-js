// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';

// Components
import { HeaderContainer } from './assets/scripts/components/containers/HeaderContainer';
import { DataMapContainer } from './assets/scripts/components/containers/DataMapContainer';
import { LineGraph } from './assets/scripts/components/Graph/LineGraph';
import { AMBIENT_SO2_CACHE } from './assets/data/AMBIENT_SO2_CACHE';

// Components -- Material-UI
import { Tabs, Tab, LeftNav, MenuItem } from 'material-ui';

// Flux
import FacilityActionCreators from './assets/scripts/actions/FacilityActionCreators';
import EchoServerActionCreators from './assets/scripts/actions/EchoServerActionCreators';
import FacilityStore from './assets/scripts/stores/FacilityStore';
import AmbientEmissionStore from './assets/scripts/stores/AmbientEmissionStore';

const origin = {
    name: "Colorado",
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

EchoServerActionCreators.findFacilityByFrs(110000753319);
EchoServerActionCreators.findFacilityByFrs(110017805730);
EchoServerActionCreators.findFacilityByFrs(110004060417);
EchoServerActionCreators.findFacilityByFrs(110010681707);

// EchoServerActionCreators.getFacilityEmissions(110000753319);




function getStateFromStores(){
    
    return {
        ambientemissions: AmbientEmissionStore.getList(),
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class App extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            ambientemissions: AmbientEmissionStore.getList(),
            selectedfacility: FacilityStore.getSelectedFacility()
        };
    }

    componentDidMount(){
        AmbientEmissionStore.addChangeListener(this._onChange);
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        AmbientEmissionStore.removeChangeListener(this._onChange);
        FacilityStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }    

    render() {       
        const parsed_data = [];
            _.forEach(AMBIENT_SO2_CACHE[this.state.selectedfacility[0].state],function(n,index) {
                parsed_data.push({
                    year: index,
                    cumulative_so2: n.emissions
                });
            });

        return (
            <div id="app__container">
                
                <HeaderContainer history={ this.props.history }/>
                <DataMapContainer />
                
                <div id="ambient-emissions__container">
                
                    <div id="ambient-emissions__graph-container">
                        <h2>Ambient x Facility Emissions Graph</h2>
                        <div className="ambient-emissions__graph-bounding-box">
                            <LineGraph data={ parsed_data } />
                        </div>
                    </div>
                </div>

                <footer>
                    <p>&nbsp;</p>
                </footer>
                
            </div>
            
        );
    }
}