import React, { Component } from 'react';
import FacilityMap from './FacilityMap';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import FacilityActionCreators from '../../actions/FacilityActionCreators';
import FacilityStore from '../../stores/FacilityStore';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList(),
        selectedFacility: FacilityStore.getSelectedFacility()
    };
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            lat: 39.7,
            lng: -105.1,
            facilities: FacilityStore.getList(),
            selectedFacility: FacilityStore.getSelectedFacility()
        };

        // console.log(this.state.selectedFacility);
    }

    componentDidMount(){
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    // _handleOnClick(index) {
        
    //     var selected_facility = this.state.facilities.list.filter(function(item, i) {
    //         return index === i;
    //     });

    //     this.setState({
    //         lat: selected_facility[0].lat,
    //         lng: selected_facility[0].lng
    //     });

    //     FacilityActionCreators.selectFacility(selected_facility);
    // }

    render() {        

        const facilities = []
        _.forEach(this.state.selectedFacility, function(n, index) {
            facilities.push({lat:n.lat,lng:n.lng});
        });

        return (
            <div className="usa-width-one-half" id="map">
                <FacilityMap lat={this.state.selectedFacility[0].lat} lng={this.state.selectedFacility[0].lng} facilities={ facilities }/>
            </div>
        );    
    }
}