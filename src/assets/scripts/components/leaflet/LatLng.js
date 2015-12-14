import React, { Component } from 'react';
import USMap from './USMap.js';

export default class LatLng extends Component {  

    constructor(props) {
        super(props);
        this.state = {
            lat: 41.096,
            lng: -95.327
        };
    }

    _handleLatChange(e) {
        this.setState({lat: e.target.value});
        console.log(this.state)
    }

    _handleLngChange(e) {
        this.setState({lng: e.target.value});
        console.log(this.state)
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
                <USMap lat={this.state.lat} lng={this.state.lng} />
            </div>
        );
    }
}