// React
import React, { Component } from 'react';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../../styles/containers/HeaderContainer.scss';

// Components
import { Router, Route, Link } from 'react-router';
import { RaisedButton } from 'material-ui';


export class HeaderContainer extends Component {
  render() {
    return (
        <header>
            <div id="header__container">
                <div id="header__button-container">
                    <span className="header__button">
                        <Link to="/"><RaisedButton label="Home" default={true} /></Link>
                    </span>

                    <span className="header__button">
                        <Link to="/list"><RaisedButton label="Facility List" default={true} /></Link>
                    </span>
                </div>
            </div>
        </header>        
    );
  }
}