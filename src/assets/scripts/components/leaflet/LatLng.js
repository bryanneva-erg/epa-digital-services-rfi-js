import React, { Component } from 'react';
import USMap from './USMap.js';
import { MONITORING_STATIONS } from '../../../data/MONITORING_STATIONS';

export default class LatLng extends Component {  

    constructor(props) {
        super(props);
        this.state = {
            lat: 39.7,
            lng: -105.1
        };
    }

    _handleLatChange(e) {
        this.setState({lat: e.target.value});
    }

    _handleLngChange(e) {
        this.setState({lng: e.target.value});
    }

    _handleSubmit(e) {
        e.preventDefault();
        
        if (!lat || !lng) {
            return;
        }

        this.setState({lat: 41.096, lng:-100.327});
    }

    render() {
        
        return (
            <div>
                <form className="latLngForm" onSubmit={this._handleSubmit.bind(this)}>
                    Lat: <input type="text" name="lat" value={this.state.lat} onChange={this._handleLatChange.bind(this)} placeholder="Lat" /> &ndash; 
                    Lng: <input type="text" name="lng" value={this.state.lng} onChange={this._handleLngChange.bind(this)} placeholder="Lng" />&nbsp;
                    <input type="submit" value="Post" />
                </form>
                <USMap lat={this.state.lat} lng={this.state.lng} center={[this.state.lat,this.state.lng]} points={MONITORING_STATIONS} />
            </div>
        );
    }
}