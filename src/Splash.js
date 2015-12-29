// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';
import './assets/styles/components/Typeahead.scss';

// Components
import { Link } from 'react-router';

// Flux
import OptionStore from './assets/scripts/stores/OptionStore';
import OptionActionCreators from './assets/scripts/actions/OptionActionCreators';
import EchoServerActionCreators from './assets/scripts/actions/EchoServerActionCreators';



function getStateFromStores(){
    return {
        options: OptionStore.get().list
    };
}

export class Splash extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            inputValue: '',
            options: [],
            selectedFrs: false,
        };

    }

    componentDidMount(){
        OptionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        OptionStore.removeChangeListener(this._onChange);
    }

    _onChange(e){
        this.setState(getStateFromStores());
    }

    _hanldeHint(inputValue, options){
        if(new RegExp('^' + inputValue).text(options[0].first_name)) {
            return options[0].first_name;
        }

        return '';
    }

    _handleChange(e){
        const value = e.target.value
        this.setState({inputValue: value});
        this._getOptions(value);
    }

    _getOptions(inputValue) {
        return _.throttle(OptionActionCreators.getOptions(inputValue), 300);
    }

    _handleOptionChange(e, option){
        this.setState({inputValue:option});
    }

    _handleOptionClick(option, e){
        e.preventDefault();

        var selected_option = this.state.options.filter(function(item, i) {
            return option === i;
        });

        this.setState({
            inputValue:selected_option[0].AIRName,
            options: [],
            selectedFrs: parseInt(selected_option[0].RegistryID)
        });

        OptionActionCreators.clearOptions();
    }

    _onSubmit(e) {
        e.preventDefault();

        let url = this.state.selectedFrs;
                
        EchoServerActionCreators.findFacilityByFrs(this.state.selectedFrs);
        EchoServerActionCreators.getFacilityEmissions(this.state.selectedFrs);

        this.props.history.pushState(null, '/facility/' + url);
    }

    render() {
        const typeaheadOptions = this.state.options !== undefined ? this.state.options.slice(1,10).map(function(n, index){
            let name = n.AIRName;
            if(name.length > 30){
                name = name.substr(0,27) + "..."
            }
            return (
                <div className="typeahead__list-item" key={index}>
                    <a href="#" onClick={this._handleOptionClick.bind(this,index)}>{name}</a>
                </div>
            );
        }.bind(this)) : '';

        let typeaheadClasses = "typeahead__options";
        if(this.state.options.length === 0){
            typeaheadClasses += " typeahead__no-data";
        }
        return (
            <div id="home-splash">

				<div className="body__container">
					<h1>airMonitr</h1>
					<p className="usa-font-lead">airMonitr combines EPA Air Markets Program data with EPA Air Trends data to allow users to analyze trends in facility monitoring data side-by-side with ambient air monitoring data.</p>
					
					<section>
						<div>
                            
							<h3>What is your facility name?</h3>
							<div className="home-splash__inputarea">
								<label htmlFor="input-type-text">Text input label</label>
								<input id="input-type-text" 
                                       name="input-type-text" 
                                       type="text" 
                                       placeholder='Type "Duke"' 
                                       className="typeahead__input"
                                       onChange={this._handleChange.bind(this)}
                                       value={this.state.inputValue} />
                                <a href="#" onClick={this._onSubmit.bind(this)} className="facility-list__startbtn">
                                    <button type="submit" className="usa-button-primary-alt">Start</button>
                                </a>
                                <div className={typeaheadClasses}>
                                    {typeaheadOptions}
                                </div>
							</div>
						</div>
						<div>
							<h3>Select from facility list</h3>
							<Link to="/list"><button className="usa-button-primary-alt" type="button">Choose</button></Link>
						</div>
						<span>OR</span>
					</section>
				</div>
            </div>
        );
    }
}