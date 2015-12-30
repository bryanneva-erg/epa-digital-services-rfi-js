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
import FacilityActionCreators from './assets/scripts/actions/FacilityActionCreators';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList(),
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class App extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            facilities: FacilityStore.getList(),
            selectedfacility: FacilityStore.getSelectedFacility()
        };
        
        console.warn(this.state.facilities);
        if(this.state.facilities.list.length === 0){
            let frs = 110000338821;

            console.warn(frs);
            if(_.size(this.props.params.id) !== 0 && this.props.params.id !== false){
                
                // let frsArray = this.props.params.id.split("+");
                
                // if(frsArray.length > 1){
                //     _.forEach(frsArray, function(n,index) {
                //         EchoServerActionCreators.findFacilityByFrs(n);            
                //     });
                // }

                frs = this.props.params.id;
            }

            EchoServerActionCreators.findFacilityByFrs(frs);
            EchoServerActionCreators.getFacilityEmissions(frs);
        }

        console.warn('App.js',this.state.selectedfacility,this.state.facilities.list.length)
        if(this.state.selectedfacility.length === 0 && this.state.facilities.list.length > 0){
            FacilityActionCreators.selectFacility(this.state.facilities.list[0]);
        }
// console.warn(this.state.selectedFacility.length === 0)
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

        if(this.state.selectedfacility.length === 0) {
            console.warn('Filling out selected facility',this.state.facilities)
            // FacilityActionCreators.selectFacility(this.state.facilities.list[0]);
        }

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