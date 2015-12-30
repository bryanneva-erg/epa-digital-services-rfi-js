// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';

// Components
import { Router, Route, Link } from 'react-router';

// Flux
import FacilityStore from './assets/scripts/stores/FacilityStore';
import FacilityActionCreators from './assets/scripts/actions/FacilityActionCreators';
import EchoServerActionCreators from './assets/scripts/actions/EchoServerActionCreators';

function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList(),
        selectedFacility: FacilityStore.getSelectedFacility()
    };
}

export class FacilityList extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            facilities: FacilityStore.getList(),
            selectedFacility: FacilityStore.getSelectedFacility()
        };

        if(this.state.facilities.list.length === 0){
            EchoServerActionCreators.findFacilityByFrs(110000338821);
            EchoServerActionCreators.findFacilityByFrs(110000603142);
            
            
            EchoServerActionCreators.findFacilityByFrs(110017805730);
            EchoServerActionCreators.findFacilityByFrs(110004060417);
            EchoServerActionCreators.findFacilityByFrs(110010681707);
            EchoServerActionCreators.findFacilityByFrs(110000753319);
        }
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

    _onCheck(key, e) {
        let selected_facility = _.find(this.state.selectedFacility, function(chr) {
                return chr.frs === e.target.value;
            });

        if(selected_facility !== undefined) {
            FacilityActionCreators.unselectFacility(selected_facility);
            return;
        }

        selected_facility = this.state.facilities.list.filter(function(item, i) {
            return key === i;
        });        

        FacilityActionCreators.selectFacility(selected_facility[0]);
        EchoServerActionCreators.getFacilityEmissions(e.target.value);    
    }

    _onSubmit(e, key, payload) {
        e.preventDefault();

        if(_.size(this.state.selectedFacility) === 0){
            FacilityActionCreators.selectFacility(this.state.facilities.list[0]);
            EchoServerActionCreators.getFacilityEmissions(this.state.facilities.list[0].frs)
        }

        let url = '';
        _.forEach(this.state.selectedFacility,function(n,key) {
            if(url === ''){
                url = n.frs;
            } else {
                url += "+" + n.frs;
            }
        });

        this.props.history.pushState(null, '/facility/' + url);
    }

    render() {
        const menuItems = this.state.facilities.list.map(function(n,indx) {
            let nameText = n.name;
            let checked = false;
            
            let selected_facility = _.find(this.state.selectedFacility, function(chr) {
                return chr.frs === n.frs;
            });

            if(selected_facility !== undefined) {
                checked = 'checked';
            }
            
            // nameText = nameText.split("DUKE ENERGY").pop().split("-").pop().trim();
            
            // if(nameText.length > 21) {
            //     nameText = nameText.substr(0,21) + "...";
            // }

            return (
                    <li key={indx}>
                        <input id={n.frs} type="checkbox" name="facility-list" value={n.frs} onClick={this._onCheck.bind(this, indx)} defaultChecked={checked} />
                        <label htmlFor={n.frs}>{nameText}</label>
                    </li>
                )
        }.bind(this));

        return (
            <div id="facility-list">
                <header>
                    <div id="header__container">
                        <div id="header__button-container">
                            <Link to="/"><button className="usa-button-outline-inverse" type="button">Home</button></Link>
                        </div>
                    </div>
                </header>
                <div className="body__container">
                    <h1>Choose Facilities to Start</h1>
                    <div id="facility-list__container">                             
                        <fieldset className="usa-fieldset-inputs usa-sans">
                            <legend className="usa-sr-only">Historical figures 1</legend>
                            <ul className="usa-unstyled-list">
                                <li>
                                    <input id="all" type="checkbox" name="facility-list" value="all" />
                                    <label htmlFor="all">All</label>
                                </li>
                                { menuItems.slice(0,Math.ceil(menuItems.length / 2)) }
                            </ul>
                            <ul className="usa-unstyled-list">
                                { menuItems.slice(Math.ceil(menuItems.length / 2)) }
                            </ul>
                        </fieldset>
                        
                        <a href="#" onClick={this._onSubmit.bind(this)} className="facility-list__startbtn">
                            <button className="usa-button-primary-alt" type="button">Start</button>
                        </a>
                        
                                    
                    </div>
                </div>
            </div>
        );
    }
}