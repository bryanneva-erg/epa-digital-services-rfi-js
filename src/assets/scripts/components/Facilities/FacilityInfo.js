// Core Libraries and Styles
import React, { Component } from 'react';
import _ from 'lodash';
import '../../../styles/components/FacilityInfo.scss';

// Components
import { TextInput } from '../input/TextInput';
import { LineGraph } from '../Graph/LineGraph';

// Flux
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import FacilityStore from '../../stores/FacilityStore';
import FacilityEmissionStore from '../../stores/FacilityEmissionStore';
import MapActionCreators from '../../actions/MapActionCreators';

function getStateFromStores(){
    
    return {
        selectedfacility: FacilityStore.getSelectedFacility(),
        facilityemissions: FacilityEmissionStore.get(),
        focusedfacility: FacilityStore.getFocusedFacility()
    };
}

export class FacilityInfo extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedfacility: FacilityStore.getSelectedFacility(),
            facilityemissions: FacilityEmissionStore.get(),
            focusedfacility: FacilityStore.getFocusedFacility()
        };
    }

    componentDidMount(){
        FacilityStore.addChangeListener(this._onChange);
        FacilityEmissionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
        FacilityEmissionStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    _handleOnClick(index) {
        MapActionCreators.focusCoordinates(this.state.selectedfacility[0].lat,this.state.selectedfacility[0].lng);
    }

    _handleRemove(index) {

    }

    render() {
        const available_facility = this.state.selectedfacility[0] !== undefined;
        const facility_name = available_facility ? this.state.selectedfacility[0].name : '';
        const facility_location = available_facility ? this.state.selectedfacility[0].city + ", " + this.state.selectedfacility[0].state : ''; 
        const facility_id = available_facility ? this.state.selectedfacility[0].frs : '';
        let facility_unit = this.props.type === "CO2"? "MTCO2e" : "Pounds";
        // const isEditing = this.state.ambientemissions.editing ? '(Adding...)' : '';
        
        const parsed_data = [];
        let cumulative_so2 = 0;
        let raw_data;
        let preferred_source = false;

        const camd = _.find(this.state.facilityemissions[this.props.type][0], function(chr) {
            return chr.Program === 'CAMD';
        });

        const nei = _.find(this.state.facilityemissions[this.props.type][0], function(chr) {
            return chr.Program === 'NEI';
        });

        const ghg = _.find(this.state.facilityemissions[this.props.type][0], function(chr) {
            return chr.Program === 'GHG';
        });
        
        if(camd !== undefined) {
            preferred_source = 'CAMD';
        } else if (nei !== undefined) {
            preferred_source = 'NEI';
        } else if (ghg !== undefined) {
            preferred_source = 'GHG';
        } else {
            // console.error('No SO2 data for this location');
        }

        const source_data = _.find(this.state.facilityemissions[this.props.type][0], function(chr) {
            return chr.Program === preferred_source;
        });

        if(preferred_source !== false) {
            _.forEach(this.state.facilityemissions.years[0], function(n, index) {
                raw_data = source_data["Year" + (index + 1)];
                if(raw_data !== undefined && raw_data !== null){
                    cumulative_so2 = parseInt(raw_data.replace(/,/g,""));
                    parsed_data.push({year: n, cumulative_so2: cumulative_so2 });
                }
            });
        }
        
        return (
            <div className="facilityinfo__container">
                <div className="facilityinfo__desc-container">
                    <h2 className="facilityinfo__header" onClick={this._handleOnClick.bind(this)}>{ facility_name }</h2>
					<p>
						<span className="facilityinfo__desc"><label>Location:</label> { facility_location }</span><br />
						<span className="facilityinfo__desc"><label>ID:</label> { facility_id }</span>
					</p>
                </div>
                <div className="facilityinfo__graph">
                    <LineGraph data={ parsed_data } yUnit={facility_unit} />
                </div>

                <div className="facilityinfo__resources">
                    <h6 className="facilityinfo__resources-header usa-heading-alt">Resources</h6>
                    <ul>
                        <li><a href="https://echo.epa.gov/resources/echo-data/about-the-data" target="_blank">EPA Air Markets Program data</a></li>
                        <li><a href="http://aqsdr1.epa.gov/aqsweb/aqstmp/airdata/download_files.html" target="_blank">EPA Air Trends data</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}