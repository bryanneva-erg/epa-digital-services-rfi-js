import React, { Component } from 'react';

export class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        };
    }

    _handleTextInput(e) {
        e.preventDefault();
        this.setState({val: e.target.value});
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.val);
        this.setState({val: ''});
    }

    render() {
        return (
            <form className="TextInput" onSubmit={ this._handleSubmit.bind(this) }>                
                {this.props.label}&nbsp;
                <input type="text" 
                       name="" 
                       value={this.state.val} 
                       placeholder="" 
                       onChange={ this._handleTextInput.bind(this) } />
            </form>
        );
    }
}