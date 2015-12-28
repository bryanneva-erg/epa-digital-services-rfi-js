// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';

// Components
import { Router, Route, Link } from 'react-router';

// Flux
export class Splash extends Component {
    render() {
        return (
            <div id="home-splash">
								<div className="body__container">
									<h1>airMonitr</h1>
									<p className="usa-font-lead">airMonitr combines EPA Air Markets Program data with EPA Air Trends data to allow users to analyze trends in facility monitoring data side-by-side with ambient air monitoring data.</p>
									
									<section>
										<div>
											<h3>What is your facility name?</h3>
											<div class="home-splash__inputarea">
												<label for="input-type-text">Text input label</label>
												<input id="input-type-text" name="input-type-text" type="text" placeholder='Type "Duke"' />
												<Link to="/facility"><button type="submit" className="usa-button-primary-alt">Start</button></Link>
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