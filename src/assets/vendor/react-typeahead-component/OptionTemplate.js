import React, { Component } from 'react';
// import '../../styles/components/options.scss';

export class OptionTemplate extends Component {

    render() {
        let bgColor = null;

        // If this option is currently selected, render it with a green background.
        if (this.props.isSelected) {
            bgColor = {
                color: 'green'
            };
        }

        return (
            <div className="options__container yt-option yt-selected-option">
                {this.renderOption()}
            </div>
        );
    }

    renderOption() {
        let optionData = this.props.data;
        let inputValue = this.props.inputValue;

        if(optionData.indexOf(inputValue) === 0) {
            return (
                <span>
                    {inputValue}
                    <strong>
                        {optionData.slice(inputValue.length)}
                    </strong>
                </span>
            );
        }
    }
}