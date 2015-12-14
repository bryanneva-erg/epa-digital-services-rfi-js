// import React from 'react';
// import { render } from 'react-dom';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// const position = [41.096, -100.327];
// const map = (
//   <Map center={position} zoom={5}>
//     <TileLayer
//       url         = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
//       attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
//       maxZoom     = '18'
//       id          = 'bryanneva.oclj42hm'
//       accessToken = 'pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNpaHo4anBwaTA0NGJ0Z20xNWFzc2p0a2wifQ.YrgNYNaTMTiK7NkHD8z0yQ'
//     />
//     <Marker position={position}>
//       <Popup>
//         <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
//       </Popup>
//     </Marker>
//   </Map>
// );

// render(map, document.getElementById('map'));

import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [51.505, -0.09];
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
);

render(map, document.getElementById('map'));