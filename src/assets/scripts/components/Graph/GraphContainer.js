import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import AmbientEmissionActionCreators from '../../actions/AmbientEmissionActionCreators';
import AmbientEmissionStore from '../../stores/AmbientEmissionStore';
import FacilityStore from '../../stores/FacilityStore';
import { LineGraph } from './LineGraph';
import { SAMPLE_DATA } from '../../../data/SAMPLE_DATA';
import { AMBIENT_SO2_CACHE } from '../../../data/AMBIENT_SO2_CACHE';
import _ from 'lodash';

function getStateFromStores(){
    
    return {
        ambientemissions: AmbientEmissionStore.getList(),
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class GraphContainer extends Component {
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
            <div className="usa-width-one-fourth">
                <h4 className="usa-heading-alt">{ this.state.selectedfacility[0].name }</h4>
                <a href="#" onClick={this._handleGetSo2Data.bind(this)}>Get SO2 Data</a>&nbsp;<span>{isEditing}</span>
                <ul>
                    {ambientemissions_list}
                </ul>
                <div id="line-graph-container"><LineGraph data={ parsed_data } /></div>
            </div>
        );
    }
}