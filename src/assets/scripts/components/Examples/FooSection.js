import React, { Component } from 'react';
import FacilityStore from '../../stores/FacilityStore';

function getStateFromStores() {
    return {
        foo: FacilityStore.getList()
    };
}

export class FooSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foo: FacilityStore.getList()
        };

        console.log(this.state.foo);
    }    

    componentDidMount() {
        FacilityStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        FacilityStore.removeChangeListener(this.onChange);
    }

    _onChange() {
        this.setState(getStateFromStores());
    }

    render() {
        return(
            <div>Foo</div>
        );
    }
}