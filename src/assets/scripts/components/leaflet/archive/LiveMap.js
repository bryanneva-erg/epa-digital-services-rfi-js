import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

export class LiveMap extends Component {
    
    componentDidMount() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            maxZoom: 20,
            layers: [
                L.tileLayer(
                    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        });

        // var map = this.map = L.map(ReactDOM.findDOMNode(this), {
        //     minZoom: 2,
        //     maxZoom: 20,
        //     layers: [
        //         L.tileLayer(
        //             'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
        //             {
        //                 attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        //                 maxZoom: 18,
        //                 id: 'bryanneva.oclj42hm',
        //                 accessToken: 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ'
        //             })
        //     ],
        //     attributionControl: false,
        // }).setView([41.096, -100.327],5);

        map.on('click', this.onMapClick);
        map.fitWorld();
    }

    componentWillUnmount() {
        console.log('Unmount')
        this.map.off('click', this.onMapClick);
        this.map = null;
    }

    onMapClick() {
        console.log('Click')
        // Do some wonderful map things...
    }

    render() {
        return (
            <div className='map'></div>
        );
    }
}