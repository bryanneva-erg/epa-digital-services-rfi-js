import React, { Component } from 'react';
import FacilityMap from './FacilityMap';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import FacilityActionCreators from '../../actions/FacilityActionCreators';
import FacilityStore from '../../stores/FacilityStore';
import MonitoringStationStore from '../../stores/MonitoringStationStore';
import _ from 'lodash';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList(),
        selectedFacility: FacilityStore.getSelectedFacility(),
        monitoringStations: MonitoringStationStore.get()
    };
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            lat: 39.7,
            lng: -105.1,
            facilities: FacilityStore.getList(),
            selectedFacility: FacilityStore.getSelectedFacility(),
            monitoringStations: MonitoringStationStore.get()
        };

        if(_.size(this.state.selectedFacility) === 0 && _.size(this.state.facilities.list) > 0){
            FacilityActionCreators.selectFacility(this.state.facilities.list[0]);
        }
    }

    componentDidMount(){
        FacilityStore.addChangeListener(this._onChange);
        MonitoringStationStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
        MonitoringStationStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    // _handleOnClick(index) {
        
    //     var selected_facility = this.state.facilities.list.filter(function(item, i) {
    //         return index === i;
    //     });

    //     this.setState({
    //         lat: selected_facility[0].lat,
    //         lng: selected_facility[0].lng
    //     });

    //     FacilityActionCreators.selectFacility(selected_facility);
    // }

    render() {        

        const facilities = []
        _.forEach(this.state.selectedFacility, function(n, index) {
            facilities.push({lat:n.lat,lng:n.lng,data:n});
        });

        const lat = this.state.selectedFacility[0] !== undefined ? this.state.selectedFacility[0].lat : 39.50;
        const lng = this.state.selectedFacility[0] !== undefined ? this.state.selectedFacility[0].lng : -98.35;
        
        return (
            <div className="usa-width-one-half" id="map">
                <FacilityMap lat={ lat } 
                             lng={ lng } 
                             facilities={ facilities } 
                             monitoring_stations={ this.state.monitoringStations.list } />
            </div>
        );    
    }
}