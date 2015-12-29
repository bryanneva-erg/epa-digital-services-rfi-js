// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';

// Components
import { HeaderContainer } from './assets/scripts/components/containers/HeaderContainer';
import { DataMapContainer } from './assets/scripts/components/containers/DataMapContainer';
import { AmbientEmissionsContainer } from './assets/scripts/components/containers/AmbientEmissionsContainer';

// Components -- Material-UI
import { Tabs, Tab, LeftNav, MenuItem } from 'material-ui';

// Flux
import EchoServerActionCreators from './assets/scripts/actions/EchoServerActionCreators';
import FacilityStore from './assets/scripts/stores/FacilityStore';

EchoServerActionCreators.findFacilityByFrs(110017805730);
EchoServerActionCreators.getFacilityEmissions(110017805730);

EchoServerActionCreators.findFacilityByFrs(110004060417);
EchoServerActionCreators.findFacilityByFrs(110010681707);
EchoServerActionCreators.findFacilityByFrs(110000753319);

function getStateFromStores(){
    
    return {
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class App extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedfacility: FacilityStore.getSelectedFacility()
        };
    }

    componentDidMount(){
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }    

    render() {       
        return (
            <div id="app__container">
                
                <HeaderContainer />
                <DataMapContainer />
                <AmbientEmissionsContainer id="ambient-emissions__container" />
                
                <footer> 
									<p>
										<a href="http://www.erg.com" target="_blank"><img src={require("./assets/images/erg-logo.png")} alt="ERG Logo" /></a>
									</p>
									<ul className="social-icons">
										<li><a href="https://www.facebook.com/EasternResearchGroup" target="_blank">Facebook</a></li>
										<li><a href="https://twitter.com/ERGupdate" target="_blank">Twitter</a></li>
										<li><a href="https://github.com/Eastern-Research-Group" target="_blank">GitHub</a></li>
									</ul>
									<p>airMonitr is a working prototype, submitted by Eastern Research Group, Inc. in response to the U.S. Environmental Protection Agency's EDS Request for Information.</p>
									
                 
                </footer>
            </div>
            
        );
    }
}