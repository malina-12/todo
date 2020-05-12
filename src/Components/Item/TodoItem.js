import React, { Component } from 'react';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { DeleteButton } from './DeleteButton';


export class TodoItem extends Component {
	constructor(props) {
		super(props);
	};


	render() {
		return (
			<>
				<Checkbox 
					onCheckItem={this.props.onCheckItem}
					checked={this.props.done}
					id={this.props.id}
				/>
				<Input 
					onInputChange={this.props.onInputChange}
					onInputBlur={this.props.onInputBlur}
					value={this.props.value}
				/>
				<DeleteButton
					onDeleteItem={this.props.onDeleteItem}
				/>
			</>
		)
	}
}
