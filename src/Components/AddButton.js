import React, { Component } from 'react';


export class AddButton extends Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div className="container__add">
                <a 
                    className="container__add-btn" 
                    onClick={this.props.onAddItem} >
                        <svg width="50" height="50">
						<circle cx="25" cy="25" r="25" fill="#f6a57d"></circle>
						<line strokeWidth="2" x1="15" x2="35" y1="25" y2="25" stroke="#fff"></line>
						<line strokeWidth="2" x1="25" x2="25" y1="15" y2="35" stroke="#fff"></line>
					</svg>
                </a>
            </div>
        )
    }

}
