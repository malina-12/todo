import React, { Component } from 'react';

export class DeleteButton extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <span className="delete"
            onClick={this.props.onDeleteItem}></span>

        )
    }
}
