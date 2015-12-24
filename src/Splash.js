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
            <div>
                <h1>Splash Screen</h1>
                <p>Description</p>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/facility">Facility</Link></li>
                    <li><Link to="/list">List</Link></li>
                </ul>
            </div>
        );
    }
}