import React, { Component } from 'react';
import { TextInput } from '../input/TextInput';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';
import AmbientEmissionActionCreators from '../../actions/AmbientEmissionActionCreators';
import AmbientEmissionStore from '../../stores/AmbientEmissionStore';
import { LineGraph } from './LineGraph';
import { SAMPLE_DATA } from '../../../data/SAMPLE_DATA';
import _ from 'lodash';

function getStateFromStores(){
    
    return {
        ambientemissions: AmbientEmissionStore.getList()
    };
}

export class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            ambientemissions: AmbientEmissionStore.getList()
        };
    }

    componentDidMount(){
        AmbientEmissionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        AmbientEmissionStore.removeChangeListener(this._onChange);
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
            state: 'AK'
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

        return (
            <div>
                <a href="#" onClick={this._handleGetSo2Data.bind(this)}>Get SO2 Data</a>
                <ul>
                    {ambientemissions_list}
                </ul>
                <div id="line-graph-container"><LineGraph data={ SAMPLE_DATA } /></div>
            </div>
        );
    }
}