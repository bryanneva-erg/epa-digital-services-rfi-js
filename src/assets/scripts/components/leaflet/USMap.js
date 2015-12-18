import React, { Component } from 'react';
import { Map, TileLayer,Marker,Popup,LayerGroup,Circle } from 'react-leaflet';

export default class USMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
    };
  }

  render() {
    const position = [this.props.lat, this.props.lng];
    
    const monitoring_stations = this.props.monitoring_stations.map(function(item, i) {
        return(
            <Circle center={item} radius="5000" color="red" key={i} itemNumber={i} />
        );
    });

    const accessToken = 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ';
    const id = 'bryanneva.oclj42hm';
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          id={id}
          accessToken={accessToken}
        />
        

        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
        <LayerGroup>
            {monitoring_stations}
        </LayerGroup>
        
      </Map>
    );
  }
}