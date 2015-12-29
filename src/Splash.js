// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';
import './assets/styles/components/Typeahead.scss';

// Components
import { Link } from 'react-router';
// import Typeahead from  'react-typeahead';
// import { OptionTemplate } from './assets/vendor/react-typeahead-component/OptionTemplate';
var Typeahead = require('./assets/vendor/react-typeahead/typeahead.js');

// Flux
import OptionStore from './assets/scripts/stores/OptionStore';
import OptionActionCreators from './assets/scripts/actions/OptionActionCreators';

function getStateFromStores(){
    return {
        options: OptionStore.get().list
    };
}

export class Splash extends Component {
    constructor(props) {
        console.warn('Constructor')
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            inputValue: '',
            options: []
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
        console.warn('Splash Component -- Getting Options');
        return _.throttle(OptionActionCreators.getOptions(inputValue), 300);
    }

    _handleOptionChange(e, option){
        console.warn("Handling option change");
        this.setState({inputValue:option});
    }

    _handleOptionClick(e, option){
        console.warn("Handling option click");
        this.setState({inputValue:option});
    }

    render() {

        const typeaheadOptions = ['John','Paul','George','Ringo'].map(function(n, index){
            return (
                <li>{n}</li>
            );
        });

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
								<input id="input-type-text" name="input-type-text" type="text" placeholder='Type "Duke"' className="typeahead__input" />
								<Link to="/facility"><button type="submit" className="usa-button-primary-alt">Start</button></Link>                                
                                <div className="typeahead__options">
                                    <ul>{typeaheadOptions}</ul>
                                </div>
							</div>
						</div>
						<div>
							<h3>Do you have facility list?</h3>
							<Link to="/list"><button className="usa-button-primary-alt" type="button">Upload</button></Link>
						</div>
						<span>OR</span>
					</section>
				</div>
            </div>
        );
    }
}