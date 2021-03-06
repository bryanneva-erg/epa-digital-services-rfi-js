import React, { Component } from 'react';
import USMap from '../leaflet/USMap.js';
import { MONITORING_STATIONS } from '../../../data/MONITORING_STATIONS';

export default class FacilityMap extends Component {  

    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
        };
    }

    componentWillReceiveProps() {
        // console.log(this.props);
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
                <USMap lat={this.props.lat} 
                       lng={this.props.lng} 
                       center={[this.props.lat,this.props.lng]} 
                       facilities={this.props.facilities} 
                       points={this.props.monitoring_stations} />
            </div>
        );
    }
}