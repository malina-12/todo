import React, { Component } from 'react';
import deleteImg from '../../Images/delete.png'

export default class Group extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
		}
	}

	onInputBlur = (event) => {
		this.props.onRenameGroup(event.target.value, this.props.id);
		if (event.target.value) {
			this.setState({
				input: event.target.value.trim(),
			});
		} else {
			this.setState({
				input: this.props.name,
			});
		}
	}

	render() {

		return (
			<>
				<img alt="delete" src={deleteImg}
					className="group__delete"
					onClick={() => this.props.onDeleteGroup(this.props.id)}
				/>
				<input
					className="group__input"
					type="text"
					defaultValue={this.props.name}
					onBlur={this.onInputBlur}

				/>
			</>
		)
	}
}