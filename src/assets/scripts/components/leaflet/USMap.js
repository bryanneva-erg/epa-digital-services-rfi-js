import React, { Component } from 'react';
import { Map, TileLayer,Marker,Popup,LayerGroup,Circle } from 'react-leaflet';

export default class USMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lat: this.props.facilities.length > 0 ? this.props.facilities[0].lat : 39.50,
        lng: this.props.facilities.length > 0 ? this.props.facilities[0].lng : -98.35,
        zoom: this.props.facilities.length > 0 ? 10 : 4,
    };
  }

  render() {
    let position = {lat:this.state.lat, lng:this.state.lng};
    let bounds = new L.LatLngBounds(position);
    let facilities = [];
        
    if(this.props.facilities.length !== 0) {
        if(this.props.facilities.length > 1) {
            bounds = new L.LatLngBounds(this.props.facilities); 
        }    

        facilities = this.props.facilities.map(function(coords, i) {
            return(
                <Marker position={coords} 
                        fillColor="red" 
                        key={i} 
                        itemNumber={i} />
            );
        });
    }

        
    // const points = this.props.points.map(function(coords, i) {
    //     return(
    //         <Circle center={coords} 
    //                 radius={5000} 
    //                 fillColor="red" 
    //                 key={i} 
    //                 itemNumber={i} />
    //     );
    // });

    

    const accessToken = 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ';
    const id = 'bryanneva.oclj42hm';

    return (
        <Map center={ position } zoom={this.state.zoom} bounds={bounds}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
              id={id}
              accessToken={accessToken}
            />

            { facilities }
        </Map>
    );
  }
}

/*
<Marker position={this.props.center} fillColor="red">
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
        <LayerGroup>{points}</LayerGroup>
        */

/*
  <Map bounds={bounds}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                  id={id}
                  accessToken={accessToken}
                />        

                {facilities}
                
          </Map>
*/