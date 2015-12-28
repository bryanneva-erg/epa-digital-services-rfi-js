// React
import React, { Component } from 'react';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../../styles/containers/HeaderContainer.scss';
import '../../../styles/components/Buttons.scss';

// Components
import { Router, Route, Link } from 'react-router';

export class HeaderContainer extends Component {
  render() {
    return (
        <header>
            <div id="header__container">
                <div id="header__button-container">
                    <Link to="/"><button className="usa-button-outline-inverse" type="button">Home</button></Link>
                    <Link to="/list"><button className="usa-button-outline-inverse" type="button">Facility List</button></Link>
                </div>
            </div>
        </header>        
        );
    }
}

