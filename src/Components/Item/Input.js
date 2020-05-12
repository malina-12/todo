import React, { Component } from 'react';

export class Input extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.textInput.focus();
    }

    render() {
        return (
                <input className="main__input"
                    ref={(input) => { this.textInput = input }}
                    onChange={this.props.onInputChange} 
                    onBlur={this.props.onInputBlur}
                    value={this.props.value}
                />

        )
    }
}
