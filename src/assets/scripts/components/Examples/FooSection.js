import React, { Component } from 'react';
import FacilityStore from '../../stores/FacilityStore';
import EchoServerActionCreators from '../../actions/EchoServerActionCreators';

function getStateFromStores(){
    return {
        foo: FacilityStore.getList()
    };
}

export class FooSection extends Component {
    constructor(props){
        super(props);
        this._onChange   = this._onChange.bind(this);
        this.state = {
            foo: FacilityStore.getList()
        };
    }    

    componentDidMount(){
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        FacilityStore.removeChangeListener(this._onChange);
    }

    _onChange(e) {
        this.setState(getStateFromStores());
    }

    _handleOnClick(){
        EchoServerActionCreators.newFoo();
        EchoServerActionCreators.saveFoo('Bar');
    }

    _handleDelete(e){
        e.preventDefault()
        EchoServerActionCreators.removeFoo(parseInt(e.target.dataset.index));
    }

    render(){
        const foo_list_items = this.state.foo.list.map(function(item, i) {
            return(
                    <li key={i}>
                        <a href="#" onClick={ this._handleDelete.bind(this) } data-index={i}>{item}</a>
                    </li>
                );
        }.bind(this));

        return(
            <div>
                <ul>
                    {foo_list_items}
                </ul>
                <input type="button" value="Foo" onClick={this._handleOnClick.bind(this)} />
            </div>
        );
    }
}