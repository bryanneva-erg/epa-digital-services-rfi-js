// Core
import React, { Component } from 'react';
import '../../../styles/containers/AmbientEmissionsContainer.scss';
import _ from 'lodash';


// Components
import { LineGraphBig } from '../Graph/LineGraphBig';

// Flux
import MonitoringStationStore from '../../stores/MonitoringStationStore';
import FacilityEmissionStore from '../../stores/FacilityEmissionStore';

function getStateFromStores(){    
    return {
        facilityemissions: FacilityEmissionStore.get(),
        monitoringstations: MonitoringStationStore.get()
    };
}

export class AmbientEmissionsContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            facilityemissions: FacilityEmissionStore.get(),
            monitoringstations: MonitoringStationStore.get()
        };
    }

    componentDidMount(){
        FacilityEmissionStore.addChangeListener(this._onChange);
        MonitoringStationStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityEmissionStore.removeChangeListener(this._onChange);
        MonitoringStationStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    render() {
        let monitoring_station_emissions_trend = [
            { year: 2005, cumulative_so2: 0, n: 0 },
            { year: 2006, cumulative_so2: 0, n: 0 },
            { year: 2007, cumulative_so2: 0, n: 0 },
            { year: 2008, cumulative_so2: 0, n: 0 },
            { year: 2009, cumulative_so2: 0, n: 0 },
            { year: 2010, cumulative_so2: 0, n: 0 },
            { year: 2011, cumulative_so2: 0, n: 0 },
            { year: 2012, cumulative_so2: 0, n: 0 },
            { year: 2013, cumulative_so2: 0, n: 0 },
            { year: 2014, cumulative_so2: 0, n: 0 },
            { year: 2015, cumulative_so2: 0, n: 0 },
        ];
        _.forEach(this.state.monitoringstations.list,function(item,index) {
            if (item.data.length > 0) {
                _.forEach(item.data, function(n) {
                    if(n.Year === undefined) return false;
                    
                    let position = false;
                    let existing_year = _.find(monitoring_station_emissions_trend,function(chr, index) {
                        if(chr.year == n.Year){
                            position = index;
                            return chr;
                        }
                    });

                    monitoring_station_emissions_trend[position].cumulative_so2 += parseFloat(n['Pollutant Concentration']);
                    monitoring_station_emissions_trend[position].n++
                });
            }
        });

        let facility_emissions_trend = [
            { year: 2005, cumulative_so2: 0, n: 0 },
            { year: 2006, cumulative_so2: 0, n: 0 },
            { year: 2007, cumulative_so2: 0, n: 0 },
            { year: 2008, cumulative_so2: 0, n: 0 },
            { year: 2009, cumulative_so2: 0, n: 0 },
            { year: 2010, cumulative_so2: 0, n: 0 },
            { year: 2011, cumulative_so2: 0, n: 0 },
            { year: 2012, cumulative_so2: 0, n: 0 },
            { year: 2013, cumulative_so2: 0, n: 0 },
            { year: 2014, cumulative_so2: 0, n: 0 },
        ];

        let yUnit = "Parts Per Billion";

        _.forEach(this.state.facilityemissions.SO2, function(item,index) {
            yUnit = item.UnitsOfMeasure;
            _.forEach(item, function(inneritem,innerindex){
                for (var i = 0; i <= 9; i++) {
                    let yearnum = i + 1;
                    if(inneritem["Year" + yearnum] !== undefined && inneritem["Year" + yearnum] !== null){
                        facility_emissions_trend[i].cumulative_so2 += parseInt(inneritem["Year" + yearnum].replace(/,/g,''));
                        facility_emissions_trend[i].n++;
                    }
                };
            })
        });

        // _.forEach(this.state.facilityemissions.CO2, function(item,index) {
        //     item.UnitsOfMeasure;
        //     _.forEach(item, function(inneritem,innerindex){
        //         for (var i = 0; i <= 9; i++) {
        //             let yearnum = i + 1;
        //             if(inneritem["Year" + yearnum] !== undefined && inneritem["Year" + yearnum] !== null){
        //                 facility_emissions_trend[i].cumulative_so2 += parseInt(inneritem["Year" + yearnum].replace(/,/g,''));
        //                 facility_emissions_trend[i].n++;
        //             }
        //         };
        //     })
        // });
    
        // _.forEach(this.state.facilityemissions.NOx[0], function(item,index) {
        //     item.UnitsOfMeasure;
        //     for (var i = 0; i <= 9; i++) {
        //         let yearnum = i + 1;
        //         if(item["Year" + yearnum] !== undefined && item["Year" + yearnum] !== null){
        //             console.warn(parseInt(item["Year" + yearnum].replace(/,/g,'')));
        //             facility_emissions_trend[i].cumulative_so2 = parseInt(item["Year" + yearnum].replace(/,/g,''));
        //             facility_emissions_trend[i].n++;
        //         }
        //     };
        // });

        let parsed_data = [];
        _.forEach(facility_emissions_trend, function(item, index) {
            parsed_data.push({
                year: item.year, 
                cumulative_so2: Math.ceil(item.cumulative_so2/item.n)})
        });

        let monitoring_data = [];
        _.forEach(monitoring_station_emissions_trend, function(item, index) {
            monitoring_data.push({
                year: item.year, 
                cumulative_so2: Math.ceil(item.cumulative_so2/item.n)})
        });

        return (
            <div id={this.props.id}>
                <div id="ambient-emissions__graph-container">
                    <div className="ambient-emissions__graph-bounding-box">
                        <LineGraphBig data={ parsed_data } data2={ monitoring_data }/>
                    </div>
                    <div className="ambient-emissions__axis-label--x">Year</div>
                    <div className="ambient-emissions__axis-label--y">{ yUnit }</div>
                </div>

                <div className="ambient-emissions__legend">
                    <div className="ambient-emissions__legend-row">
                        <div className="ambient-emissions__legend-line--blue"></div>
                        Local Ambient
                    </div>
                    <div className="ambient-emissions__legend-row">
                        <div className="ambient-emissions__legend-line--red"></div>
                        Facility Emissions
                    </div>
                </div>

            </div>
        );
    }
}