// Core Libraries and Styles
import React, { Component } from 'react';
import _ from 'lodash';
import '../../../styles/containers/DataMapContainer.scss';
import '../../../styles/containers/MonitoringStations.scss';

// Components

// Flux
import MonitoringStationStore from '../../stores/MonitoringStationStore';
import MonitoringStationActionCreators from '../../actions/MonitoringStationActionCreators';


function getStateFromStores(){
    
    return {
        monitoringstations: MonitoringStationStore.get()
    };
}

export class MonitoringStations extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            monitoringstations: MonitoringStationStore.get()
        };
    }

    componentDidMount(){
        MonitoringStationStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        MonitoringStationStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    render() {
        
        const station_list = this.state.monitoringstations.list.splice(0,7).map(function(item,index) {
            let firstClass = index === 0 ? 'monitoring-stations__list--top' : '';
            let trend = 0;
            let prevData = 0;
            if (item.data.length > 0) {
                _.forEach(item.data, function(n) {
                    prevData = parseFloat(n['Pollutant Concentration'])
                    trend = prevData - trend;
                });
            }
            
            let trend_direction = 'N/C';
            if(trend > 0){
                trend_direction = 'Up';
            } else if (trend < 0) {
                trend_direction = 'Down';
            }

            return (
                <li key={index} className={firstClass}>
                    {item['County Name']} &ndash; {item['State Code']}-{item['County Code']}-{item['Site Number']}
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
            </div>                
        );
    }
}