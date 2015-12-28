import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import AmbientEmissionActionCreators from '../../actions/AmbientEmissionActionCreators';
import AmbientEmissionStore from '../../stores/AmbientEmissionStore';
import FacilityStore from '../../stores/FacilityStore';
import { LineGraph } from '../Graph/LineGraph';
import { SAMPLE_DATA } from '../../../data/SAMPLE_DATA';
import { AMBIENT_SO2_CACHE } from '../../../data/AMBIENT_SO2_CACHE';
import _ from 'lodash';
import '../../../styles/components/FacilityInfo.scss';

function getStateFromStores(){
    
    return {
        ambientemissions: AmbientEmissionStore.getList(),
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class FacilityInfo extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            ambientemissions: AmbientEmissionStore.getList(),
            selectedfacility: FacilityStore.getSelectedFacility()
        };
    }

    componentDidMount(){
        AmbientEmissionStore.addChangeListener(this._onChange);
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        AmbientEmissionStore.removeChangeListener(this._onChange);
        FacilityStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    _handleOnClick(index) {
        
    }

    _handleRemove(index) {

    }

    _handleGetSo2Data(){
        
        const params = {
            state: this.state.selectedfacility[0].state
        }

        EchoServerActionCreators.getSO2EmissionsRecursive(2005,2014,params);

    }

    render() {
        const ambientemissions_list = this.state.ambientemissions.list.map(function(item, i) {
            return (
                    <li key={i}>{item.state} {item.year}: {item.emissions} {item.unit} of {item.pollutant}</li>
                );
        }.bind(this));

        const isEditing = this.state.ambientemissions.editing ? '(Adding...)' : '';

        const parsed_data = [];
        _.forEach(AMBIENT_SO2_CACHE[this.state.selectedfacility[0].state],function(n,index) {
            parsed_data.push({
                year: index,
                cumulative_so2: n.emissions
            });
        });

        return (
            <div className="facilityinfo__container">
                <div className="facilityinfo__desc-container">
                    <h1 className="facilityinfo__header">{ this.state.selectedfacility[0].name }</h1>
                    <p className="facilityinfo__desc"><label>Location:</label> {this.state.selectedfacility[0].city}, {this.state.selectedfacility[0].state}</p>
                    <p className="facilityinfo__desc"><label>ID:</label> {this.state.selectedfacility[0].frs}</p>
                </div>
                
                <div className="facilityinfo__graph">
                    <LineGraph data={ parsed_data } />
                </div>

                <div className="facilityinfo__resources">
                    <h6 className="facilityinfo__resources-header usa-heading-alt">Resources</h6>
                    <ul>
                        <li><a href="#">Item 1</a></li>
                        <li><a href="#">Item 2</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}