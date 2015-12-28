// Libraries
import React, { Component } from 'react';
import _ from 'lodash';
import './assets/styles/base.scss';

// Components
import { Router, Route, Link } from 'react-router';

// Flux
export class FacilityList extends Component {
    render() {
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
											<li>
												<input id="facility1" type="checkbox" name="facility-list" value="facility1" />
												<label htmlFor="facility1">Facility Name 1</label>
											</li>
											<li>
												<input id="facility2" type="checkbox" name="facility-list" value="facility2" />
												<label htmlFor="facility2">Facility Name 2</label>
											</li>
											<li>
												<input id="facility3" type="checkbox" name="facility-list" value="facility3" />
												<label htmlFor="facility3">Facility Name 3</label>
											</li>
											<li>
												<input id="facility4" type="checkbox" name="facility-list" value="facility4" />
												<label htmlFor="facility4">Facility Name 4</label>
											</li>
											<li>
												<input id="facility5" type="checkbox" name="facility-list" value="facility5" />
												<label htmlFor="facility5">Facility Name 5</label>
											</li>
											<li>
												<input id="facility6" type="checkbox" name="facility-list" value="facility6" />
												<label htmlFor="facility6">Facility Name 6</label>
											</li>
											<li>
												<input id="facility7" type="checkbox" name="facility-list" value="facility7" />
												<label htmlFor="facility7">Facility Name 7</label>
											</li>
											<li>
												<input id="facility8" type="checkbox" name="facility-list" value="facility8" />
												<label htmlFor="facility8">Facility Name 8</label>
											</li>
											<li>
												<input id="facility9" type="checkbox" name="facility-list" value="facility9" />
												<label htmlFor="facility9">Facility Name 9</label>
											</li>
									</ul>
									<ul className="usa-unstyled-list">
											<li>
												<input id="facility10" type="checkbox" name="facility-list" value="facility10" />
												<label htmlFor="facility10">Facility Name 10</label>
											</li>
											<li>
												<input id="facility11" type="checkbox" name="facility-list" value="facility11" />
												<label htmlFor="facility11">Facility Name 11</label>
											</li>
											<li>
												<input id="facility12" type="checkbox" name="facility-list" value="facility12" />
												<label htmlFor="facility12">Facility Name 12</label>
											</li>
											<li>
												<input id="facility13" type="checkbox" name="facility-list" value="facility13" />
												<label htmlFor="facility13">Facility Name 13</label>
											</li>
											<li>
												<input id="facility14" type="checkbox" name="facility-list" value="facility14" />
												<label htmlFor="facility14">Facility Name 14</label>
											</li>
											<li>
												<input id="facility15" type="checkbox" name="facility-list" value="facility15" />
												<label htmlFor="facility15">Facility Name 15</label>
											</li>
									</ul>
									</fieldset>
									
									<Link to="/facility" className="facility-list__startbtn"><button className="usa-button-primary-alt" type="button">Start</button></Link>
									
								</div>
							</div>
            </div>
        );
    }
}