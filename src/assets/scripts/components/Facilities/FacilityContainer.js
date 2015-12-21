import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import LatLng from '../leaflet/LatLng';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import FacilityActionCreators from '../../actions/FacilityActionCreators';
import FacilityStore from '../../stores/FacilityStore';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList()
    };
}

export class FacilityContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            lat: 39.7,
            lng: -105.1,
            facilities: FacilityStore.getList()
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

    // _handleResetMap() {
    //     this.setState({
    //         lat: this.state.origin.lat,
    //         lng: this.state.origin.lng
    //     });
    // }

    _handleOnClick(index) {
        
        var selected_facility = this.state.facilities.list.filter(function(item, i) {
            return index === i;
        });

        this.setState({
            lat: selected_facility[0].lat,
            lng: selected_facility[0].lng
        });

        FacilityActionCreators.selectFacility(selected_facility);
    }

    _handleRemove(index) {
        FacilityActionCreators.removeFacility(index);
    }

    _handleNewFacility(data) {
        EchoServerActionCreators.findFacilityByFrs(data);
    }

    render() {
        
        const facility_list = this.state.facilities.list.map(function(item, i) {
            return(
                    <li key={i}>
                        <a href="#" onClick={ this._handleOnClick.bind(this, i) }>{item.name} (FRS: {item.frs})</a>&nbsp;
                        <a href='#' onClick={ this._handleRemove.bind(this, i) }>(X)</a>
                    </li>
                );
        }.bind(this));

        const isEditing = this.state.facilities.editing ? '(Adding...)' : '';

        return (
            <div>
                <div className="facilityList">
                    Facility List (Try: 110000753319, 110017805730, 110004060417, 110010681707):
                    &nbsp;<span>{isEditing}</span>
                    <ul>{facility_list}</ul>
                </div>
                
                <TextInput label="Facility Name" onSubmit={ this._handleNewFacility.bind(this) } />

                <div id="map"><LatLng lat={this.state.lat} lng={this.state.lng} /></div>
            </div>
        );
    }
}