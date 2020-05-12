import React, { Component } from 'react'

export class Checkbox extends Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<label className="main__checkbox">
				<input 
					type="checkbox" 
					onChange={this.props.onCheckItem} 
					checked={this.props.checked} 
					id={this.props.id}/>
				<span className="checkmark"></span>
			</label>
		)
	}
}
