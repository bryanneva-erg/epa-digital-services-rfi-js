import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import LatLng from '../leaflet/LatLng';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
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
            staticfacilities: [{
                name: "Original Location (Colorado)",
                frs: 0,
                lat: "39.7",
                lng: "-105.1"
            },{
                name: "DUKE ENERGY - HINES ENERGY COMPLEX",
                frs: 110000753319,
                lat: "27.78869",
                lng: "-81.871226"
            },{
                name: "DUKE ENERGY FAYETTE II LLC/FAYETTE ENERGY CTR",
                frs: 110017805730,
                lat: "39.86022",
                lng: "-79.91903"
            },{
                name: "DUKE ENERGY PROGRESS INC - SMITH ENERGY COMPLEX",
                frs: 110004060417,
                lat: "34.8387",
                lng: "-79.7396"
            }],
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

    _handleClick(index) {
        
        var selected_facility = this.state.staticfacilities.filter(function(item, i) {
            return index === i;
        });

        this.setState({
            lat: selected_facility[0].lat,
            lng: selected_facility[0].lng
        });
    }

    _handleNewFacility(data) {
        EchoServerActionCreators.findFacilityByFrs(data);
    }

    render() {
                
        const static_facilities = this.state.staticfacilities.map(function(item, i) {
            return(
                    <li key={i}>
                        <a href="#" onClick={ this._handleClick.bind(this, i) }>{item.name} (FRS: {item.frs})</a>
                    </li>
                );
        }.bind(this));

        
        const dynamic_facilities = this.state.facilities.list.map(function(item, i) {
            return(
                    <li key={i}>
                        <a href="#" onClick={ this._handleClick.bind(this, i) }>{item.name} (FRS: {item.frs})</a>
                    </li>
                );
        }.bind(this));

        return (
            <div>
                <div className="facilityList">Static List:<ul>{static_facilities}</ul></div>

                <div className="facilityList">Dynamic List:<ul>{dynamic_facilities}</ul></div>
                
                <TextInput label="Facility Name" onSubmit={ this._handleNewFacility.bind(this) } />

                <div id="map"><LatLng lat={this.state.lat} lng={this.state.lng} /></div>
            </div>
        );
    }
}