import React, { Component } from 'react';

export class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 'Foo'
        };
    }

    render() {
        return (
            <div>{this.props.label} <input type="text" name="" value={this.state.val} placeholder="" /></div>
        );
    }
}