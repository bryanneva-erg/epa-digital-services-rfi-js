import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import LatLng from '../leaflet/LatLng';


export class FacilityContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.7,
            lng: -105.1
        };
    }

    _handleClick(e) {
        e.preventDefault();
        this.setState({
            lat: e.target.dataset.lat,
            lng: e.target.dataset.lng
        });
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div className="facilityList">
                    <ul>
                        <li><a href="#" data-lat="27.78869" data-lng="-81.871226" onClick={this._handleClick.bind(this)}>DUKE ENERGY - HINES ENERGY COMPLEX (FRS: 110000753319)</a></li>
                        <li><a href="#" data-lat="39.86022" data-lng="-79.91903" onClick={this._handleClick.bind(this)}>DUKE ENERGY FAYETTE II LLC/FAYETTE ENERGY CTR (FRS: 110017805730)</a></li>
                        <li><a href="#" data-lat="34.8387" data-lng="-79.7396" onClick={this._handleClick.bind(this)}>DUKE ENERGY PROGRESS INC - SMITH ENERGY COMPLEX (FRS: 110004060417)</a></li>
                    </ul>
                </div>
                
                <TextInput label="Facility Name" />

                <div id="map"><LatLng lat={this.state.lat} lng={this.state.lng} /></div>
            </div>
        );
    }
}