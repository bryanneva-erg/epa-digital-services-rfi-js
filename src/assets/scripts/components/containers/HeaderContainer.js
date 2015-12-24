// React
import React, { Component } from 'react';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../../styles/containers/HeaderContainer.scss';
import '../../../styles/components/Buttons.scss';

// Components
//import { RaisedButton } from 'material-ui';


export class HeaderContainer extends Component {
  render() {
    return (
        <header>
            <div id="header__container">
                <div id="header__button-container">
                    <button className="usa-button-outline-inverse" type="button">Home</button>
                    <button className="usa-button-outline-inverse" type="button">Facility List</button>
                </div>
            </div>
        </header>        
    );
  }
}