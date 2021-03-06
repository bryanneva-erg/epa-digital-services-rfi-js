// Core Libraries and Styles
import React, { Component } from 'react';
import _ from 'lodash';
import '../../../styles/containers/DataMapContainer.scss';
import '../../../styles/containers/MonitoringStations.scss';

// Components

// Flux
import MonitoringStationStore from '../../stores/MonitoringStationStore';
import MonitoringStationActionCreators from '../../actions/MonitoringStationActionCreators';
import AmbientEmissionStore from '../../stores/AmbientEmissionStore';
import MapActionCreators from '../../actions/MapActionCreators';

function getStateFromStores(){
    
    return {
        monitoringstations: MonitoringStationStore.get(),
        selectedemission: AmbientEmissionStore.getSelected()
    };
}

export class MonitoringStations extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            monitoringstations: MonitoringStationStore.get(),
            selectedemission: AmbientEmissionStore.getSelected()
        };
    }

    componentDidMount(){
        MonitoringStationStore.addChangeListener(this._onChange);
        AmbientEmissionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        MonitoringStationStore.removeChangeListener(this._onChange);
        AmbientEmissionStore.addChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    _getEmissionName(emission_acronym) {
        switch(emission_acronym){
            case 'SO2':
                return "Sulfur dioxide";
            case 'CO2':
                return "Carbon dioxide"
            case 'NOx':
                return "Nitrous oxide";
        }
    }

    _onClickStation(index, e){
        var selected_station = this.state.monitoringstations.list.filter(function(item, i) {
            return index === i;
        });

        // console.warn('Clicked on this station',selected_station[0].Latitude,selected_station[0].Longitude, selected_station)

        MapActionCreators.focusCoordinates(parseFloat(selected_station[0].Latitude),parseFloat(selected_station[0].Longitude));
        MonitoringStationActionCreators.focusMonitoringStation(selected_station[0]);
    }

    render() {
        
        let numFacilities = 0;
        const station_list = this.state.monitoringstations.list.map(function(item,index) {
            let classes = '';
            let firstClass = index === 0 ? 'monitoring-stations__list--top' : '';
            let focusedClass = '';
            let trend = 0;
            let prevData = 0;

            if (item.data.length < 1) return false;
            
            _.forEach(item.data, function(n) {

                if(n['Pollutant'] !== this._getEmissionName(this.state.selectedemission)) return false;
                
                prevData = parseFloat(n['Pollutant Concentration'])
                trend = prevData - trend;
            }.bind(this));
            

            numFacilities++
            if(numFacilities > 7) return false;

            let trend_direction = <div className="icon__nc"></div>;
            if(trend > 0){
                trend_direction = <div className="icon__up"></div>;
            } else if (trend < 0) {
                trend_direction = <div className="icon__down"></div>;
            }

            if(this.state.monitoringstations.focusedStation['County Name'] === item['County Name']
                && this.state.monitoringstations.focusedStation['State Code'] === item['State Code']
                && this.state.monitoringstations.focusedStation['County Code'] === item['County Code']
                && this.state.monitoringstations.focusedStation['Site Number'] === item['Site Number']){
                focusedClass = "monitoring-stations__list--focused";
            }

            if(firstClass !== '' || focusedClass !== ''){
                classes = firstClass + " " + focusedClass;    
            }
            // const county_name = item['County Name'].length > 6 ? item['County Name'].substr(0,6) : item['County Name'];
            const county_name = item['County Name'];
            const station_name = county_name + " - " + item['State Code'] + "-" + item['County Code'] + "-" + item['Site Number']

            return (
                <li key={index} className={classes} onClick={this._onClickStation.bind(this, index)}>
                    <span className="station-list__label">{station_name}</span>
                    <span className="station-list__trend">{ trend_direction }</span>
                </li>
            );
        }.bind(this));

        return (
            <div className={this.props.className}>
                <h3>Monitoring Stations</h3>
                <div className="monitoring-stations__list">
                    <ul>
                        {station_list}
                    </ul>
                </div>
                <span className="monitoring-stations__legend">Note: Symbols indicate changes in ambient air concentration.</span>
            </div>                
        );
    }
}