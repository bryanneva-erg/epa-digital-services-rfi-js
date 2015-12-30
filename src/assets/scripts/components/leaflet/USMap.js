import React, { Component } from 'react';
import { Map, TileLayer,Marker,Popup,LayerGroup,CircleMarker } from 'react-leaflet';
import MonitoringStationActionCreators from '../../actions/MonitoringStationActionCreators';
import FacilityActionCreators from '../../actions/FacilityActionCreators';

export default class USMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.facilities.length > 0 ? this.props.facilities[0].lat : 39.50,
            lng: this.props.facilities.length > 0 ? this.props.facilities[0].lng : -98.35,
            zoom: this.props.facilities.length > 0 ? 10 : 4,
        };
    }

    _handleMoveEnd(e) {
        // MonitoringStationActionCreators.getWithinBounds(e.target.getBounds());
    }

    _onClickFacility(index, e) {
        const selected_facility = this.props.facility[index];
        FacilityActionCreators.focusFacility(selected_facility);
    }

    _onClickStation(index,e) {
        const selected_station = this.props.points[index]
        MonitoringStationActionCreators.focusMonitoringStation(selected_station);
    }

    render() {

        const accessToken = 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ';
        const id = 'bryanneva.oclj42hm';
        let position = {lat:this.props.lat, lng:this.props.lng};
        let bounds = new L.LatLngBounds(position);
        let facilities = [];
        let points = [];

        if(this.props.facilities.length !== 0) {

            if(this.props.facilities.length > 1) {
                bounds = new L.LatLngBounds(this.props.facilities); 
            }    

            facilities = this.props.facilities.map(function(coords, i) {
                let facility_position = {lat:coords.lat, lng:coords.lng}
                return(
                    <Marker position={ facility_position } 
                            fillColor="red" 
                            key={i} 
                            itemNumber={i} 
                            onClick={this._onClickFacility.bind(this, i)}>
                        <Popup>
                            <span>
                                {coords.data.name}<br />
                                {coords.data.city}, {coords.data.state} {coords.data.zip}<br />
                                {coords.data.frs}<br />
                                [{coords.data.lat}, {coords.data.lng}]
                            </span>
                        </Popup>
                    </Marker>
                );
            }.bind(this));
        }

        if(this.props.points.length > 0){
            points = this.props.points.map(function(coords, i) {
                return (
                    <CircleMarker center={[coords.Latitude,coords.Longitude]}
                                  key={i} 
                                  itemNumber={i}
                                  onClick={this._onClickStation.bind(this,i)}>
                        <Popup>
                            <span>
                                Station: {coords['County Name']} &ndash; {coords['State Code']}-{coords['County Code']}-{coords['Site Number']}<br />
                                Address: {coords.Address}<br />
                                Location: {coords['CBSA Name']}<br />
                                County: {coords['County Name']}<br />
                                Site Number: {coords['Site Number']}<br />
                                [{coords.Latitude}, {coords.Longitude}]
                            </span>
                        </Popup>
                    </CircleMarker>
                );
            }.bind(this));
        }

        const tileLayer = <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                           url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                                           id={id}
                                           accessToken={accessToken} />

        let mapComponent = <Map center={ position } zoom={ this.state.zoom } onLeafletMoveend={this._handleMoveEnd.bind(this)}>
                                { tileLayer }
                                { facilities }
                                { points }
                            </Map>;

        if(this.props.facilities.length > 1) {
            mapComponent = <Map bounds={bounds} zoom={ this.state.zoom } onLeafletMoveend={this._handleMoveEnd.bind(this)}>
                                { tileLayer }
                                { facilities }
                                { points }
                            </Map>;
        }

        return (mapComponent);
    }
}