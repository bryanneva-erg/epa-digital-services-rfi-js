// React
import React, { Component } from 'react';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../../styles/containers/HeaderContainer.scss';
import '../../../styles/components/Buttons.scss';

// Components
import { LeftNav, MenuItem } from 'material-ui';
import { Link } from 'react-router';

// Flux
import FacilityStore from '../../stores/FacilityStore';
import FacilityActionCreators from '../../actions/FacilityActionCreators';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';


function getStateFromStores(){
    
    return {
        facilities: FacilityStore.getList(),
        selectedfacility: FacilityStore.getSelectedFacility()
    };
}

export class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            facilities: FacilityStore.getList(),
            selectedFacility: FacilityStore.getSelectedFacility()
        };
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
    
    // _handleRemove(index) {
    //     FacilityActionCreators.removeFacility(index);
    // }

    // _handleNewFacility(data) {
    //     EchoServerActionCreators.findFacilityByFrs(data);
    // }


    _toggleLeftNav(e) {
        e.preventDefault();
        this.refs.leftNav.toggle();
    }

    _onLeftNavChange(e, key, payload) {
        this.props.history.pushState(null, payload.route);

        var selected_facility = this.state.facilities.list.filter(function(item, i) {
            return key === i;
        });

        FacilityActionCreators.selectFacility(selected_facility);
        EchoServerActionCreators.getFacilityEmissions(payload.route.split('facility/').pop());
    }

    render() {
        
        let nameText = '';
        const menuItems = this.state.facilities.list.map(function(n,indx) {
            nameText = n.name.split("DUKE ENERGY").pop().split("-").pop().trim();
            if(nameText.length > 21) {
                nameText = nameText.substr(0,21) + "...";
            }
            return { route: 'facility/' + n.frs, text: nameText }
        });

        return (
            <header>            
                <LeftNav ref="leftNav" 
                         docked={false} 
                         openRight={true} 
                         menuItems={ menuItems } 
                         onChange={ this._onLeftNavChange.bind(this) }/>

                <div id="header__container">
                    <div id="header__button-container">
                        <Link to="/"><button className="usa-button-outline-inverse" type="button">Home</button></Link>
                        <button onClick={ this._toggleLeftNav.bind(this) } className="usa-button-outline-inverse" type="button">Facility List</button>
                    </div>
                </div>

            </header>        
        );
    }
}

