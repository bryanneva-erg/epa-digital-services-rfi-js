import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';


export class FacilityContainer extends Component {
    
    render() {
        return (
            <div>
                <div className="facilityList">
                    <ul>
                        <li>DUKE ENERGY - HINES ENERGY COMPLEX // FRS: 110000753319 // LatLng: [27.78869,-81.871226]</li>
                        <li>DUKE ENERGY FAYETTE II LLC/FAYETTE ENERGY CTR // FRS: 110017805730 // LatLng: [39.86022,-79.91903]</li>
                        <li>DUKE ENERGY PROGRESS INC - SMITH ENERGY COMPLEX // FRS: 110004060417 // LatLng: [34.8387,-79.7396]</li>
                    </ul>
                </div>
                <TextInput label="Facility Name" />
            </div>
        );
    }
}