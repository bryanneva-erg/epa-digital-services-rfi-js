import React, { Component } from 'react';
// import LatLng from '../leaflet/LatLng';
import FacilityMap from './FacilityMap';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import FacilityActionCreators from '../../actions/FacilityActionCreators';
import FacilityStore from '../../stores/FacilityStore';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList()
    };
}

export class MapContainer extends Component {
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
        
        return (
            <div className="usa-width-one-half" id="map">
                <FacilityMap lat={this.state.lat} lng={this.state.lng} />
            </div>
        );
    }
}