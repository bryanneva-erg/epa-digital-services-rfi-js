import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

export class Map extends Component {

    createMap(element) {
        var map = L.map(element);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }

    setupMap() {
        this.map.setView([this.props.lat, this.props.lon], this.props.zoom);        
    }

    componentDidMount() {

        if (this.props.createMap) {
            this.map = this.props.createMap(ReactDOM.findDOMNode(this));
        } else {
            this.map = this.createMap(ReactDom.findDOMNode(this));
        }

        this.setupMap();
    }

    render() {
        return (<div className="map"></div>);
    }

}