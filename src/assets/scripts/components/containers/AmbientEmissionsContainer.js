// Core
import React, { Component } from 'react';
import '../../../styles/containers/AmbientEmissionsContainer.scss';
import _ from 'lodash';


// Components
import { LineGraphBig } from '../Graph/LineGraphBig';

// Flux
import MonitoringStationStore from '../../stores/MonitoringStationStore';
import FacilityEmissionStore from '../../stores/FacilityEmissionStore';
import AmbientEmissionStore from '../../stores/AmbientEmissionStore';

function getStateFromStores(){    
    return {
        facilityemissions: FacilityEmissionStore.get(),
        monitoringstations: MonitoringStationStore.get(),
        selectedemission: AmbientEmissionStore.getSelected()
    };
}

export class AmbientEmissionsContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            facilityemissions: FacilityEmissionStore.get(),
            monitoringstations: MonitoringStationStore.get(),
            selectedemission: AmbientEmissionStore.getSelected()
        };
    }

    componentDidMount(){
        FacilityEmissionStore.addChangeListener(this._onChange);
        MonitoringStationStore.addChangeListener(this._onChange);
        AmbientEmissionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityEmissionStore.removeChangeListener(this._onChange);
        MonitoringStationStore.removeChangeListener(this._onChange);
        AmbientEmissionStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    _getEmissionName(emission_acronym, short) {
        switch(emission_acronym){
            case 'SO2':
                if(short === true){
                    return 'SO₂'
                }
                return "Sulfur dioxide";
            case 'CO2':
                if(short === true) {
                    return 'CO₂';
                }
                return "Carbon dioxide"
            case 'NOx':
                if(short === true) {
                    return 'NOₓ';
                }
                return "Nitrous oxide";
        }
    }

    render() {
        let monitoring_station_emissions_trend = [
            { year: 2005, cumulative_emission: 0, n: 0 },
            { year: 2006, cumulative_emission: 0, n: 0 },
            { year: 2007, cumulative_emission: 0, n: 0 },
            { year: 2008, cumulative_emission: 0, n: 0 },
            { year: 2009, cumulative_emission: 0, n: 0 },
            { year: 2010, cumulative_emission: 0, n: 0 },
            { year: 2011, cumulative_emission: 0, n: 0 },
            { year: 2012, cumulative_emission: 0, n: 0 },
            { year: 2013, cumulative_emission: 0, n: 0 },
            { year: 2014, cumulative_emission: 0, n: 0 },
            // { year: 2015, cumulative_emission: 0, n: 0 },
        ];

        let monitoringStationUnits = "Parts Per Billion";
        _.forEach(this.state.monitoringstations.list,function(item,index) {
            if (item.data.length > 0) {
                _.forEach(item.data, function(n) {
                    monitoringStationUnits = n["Units of Measure"];
                    if(n.Year === undefined || n.Year > 2014) return false;
                    if(n['Pollutant'] !== this._getEmissionName(this.state.selectedemission)) {
                        // console.warn(n['Pollutant'])
                        return false;
                    }
                    let position = false;
                    let existing_year = _.find(monitoring_station_emissions_trend,function(chr, index) {
                        if(chr.year == n.Year){
                            position = index;
                            return chr;
                        }
                    });

                    monitoring_station_emissions_trend[position].cumulative_emission += parseFloat(n['Pollutant Concentration']);
                    monitoring_station_emissions_trend[position].n++
                }.bind(this));
            }
        }.bind(this));

        let facility_emissions_trend = [
            { year: 2005, cumulative_emission: 0, n: 0 },
            { year: 2006, cumulative_emission: 0, n: 0 },
            { year: 2007, cumulative_emission: 0, n: 0 },
            { year: 2008, cumulative_emission: 0, n: 0 },
            { year: 2009, cumulative_emission: 0, n: 0 },
            { year: 2010, cumulative_emission: 0, n: 0 },
            { year: 2011, cumulative_emission: 0, n: 0 },
            { year: 2012, cumulative_emission: 0, n: 0 },
            { year: 2013, cumulative_emission: 0, n: 0 },
            { year: 2014, cumulative_emission: 0, n: 0 },
        ];

        // let facilityUnits = "Pounds";
        const facilityUnits = this.state.selectedemission === "CO2"? "MTCO2e" : "Pounds";
        const emission = this.state.selectedemission;
        let thing_to_parse = [];
        console.warn(this.state.facilityemissions);
        switch(emission){
            case "SO2":
                thing_to_parse = this.state.facilityemissions.SO2;
                break;
            case "CO2":
                thing_to_parse = this.state.facilityemissions.CO2;
                break;
            case "NOx":
                thing_to_parse = this.state.facilityemissions.NOx;
                break;
        }

        _.forEach(thing_to_parse, function(item,index) {
            _.forEach(item, function(inneritem,innerindex){
                // facilityUnits = inneritem.UnitsOfMeasure;
                console.warn('Currently looking at emission:',this.state.selectedemission,inneritem.Program);
                if(inneritem.Program !== 'CAMD' && this.state.selectedemission !== 'NOx') return false;
                if(inneritem.Program !== 'GHG' && this.state.selectedemission === 'NOx') return false;

                for (var i = 0; i <= 9; i++) {
                    let yearnum = i + 1;
                    if(inneritem["Year" + yearnum] !== undefined && inneritem["Year" + yearnum] !== null){
                        facility_emissions_trend[i].cumulative_emission += parseInt(inneritem["Year" + yearnum].replace(/,/g,''));
                        facility_emissions_trend[i].n++;
                    }
                };
            }.bind(this))
        }.bind(this));

        let parsed_data = [];
        _.forEach(facility_emissions_trend, function(item, index) {
            let calculated_emissions = item.cumulative_emission
            if(item.n > 1){
                Math.ceil(item.cumulative_emission/item.n)
            }
            parsed_data.push({
                year: item.year, 
                cumulative_emission: calculated_emissions
            });
            
        });

        // console.warn('Monitoring Station Emissions Trend:',monitoring_station_emissions_trend);
        let monitoring_data = [];
        _.forEach(monitoring_station_emissions_trend, function(item, index) {
            let calculated_emissions = item.cumulative_emission;
            if(item.n > 1){
                Math.ceil(item.cumulative_emission/item.n)
            }
            monitoring_data.push({
                year: item.year, 
                cumulative_emission: calculated_emissions
            });
        });

        return (
            <div id={this.props.id}>
                <div id="ambient-emissions__graph-container">
                    <div className="ambient-emissions__graph-bounding-box">
                        <LineGraphBig data={ parsed_data } 
                                      data2={ monitoring_data } 
                                      yUnit={facilityUnits} 
                                      y2Unit={monitoringStationUnits} />
                    </div>
                    <div className="ambient-emissions__axis-label--x">Year</div>
                    <div className="ambient-emissions__axis-label--y">{ facilityUnits }</div>
                </div>

                <div className="ambient-emissions__legend">
                    <div className="ambient-emissions__legend-row">
                        <div className="ambient-emissions__legend-line--blue"></div>
                        Facility {this._getEmissionName(this.state.selectedemission,true)} Emissions
                    </div>
                    <div className="ambient-emissions__legend-row">
                        <div className="ambient-emissions__legend-line--red"></div>
                        Local Ambient {this._getEmissionName(this.state.selectedemission,true)} (Average across local Monitoring Stations)
                    </div>
                </div>

            </div>
        );
    }
}