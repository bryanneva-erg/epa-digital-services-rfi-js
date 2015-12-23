// React
import React, { Component } from 'react';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../../styles/containers/HeaderContainer.scss';

// Components
import { RaisedButton } from 'material-ui';


export class HeaderContainer extends Component {
  render() {
    return (
        <header>
            <div id="header__container">
                <div id="header__button-container">
                    <span className="header__button">
                        <RaisedButton label="Home" default={true} />
                    </span>

                    <span className="header__button">
                        <RaisedButton label="Facility List" default={true} />
                    </span>
                </div>
            </div>
        </header>        
    );
  }
}