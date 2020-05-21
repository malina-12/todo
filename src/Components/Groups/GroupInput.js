import React, { Component } from 'react';
import deleteimg from '../../Images/delete.png'

export class GroupInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
		}
	}

	onInputBlur = (event) => {
		this.props.onRenameGroup(event.target.value, this.props.id);
		if(event.target.value) {
		this.setState({
			input: event.target.value.trim(),
		});
	} else {
		this.setState({
			input: this.props.name,
		});
	}
	}

	componentDidMount() {
		if (!this.props.name) {
			this.focusInput.focus();
		}
	}

	
	render() {

		return (
			<>
				<img src={deleteimg} 
					className="group__delete"
					onClick={ () => this.props.onDeleteGroup(this.props.id) }
				/>
				<input
					className="group__input"
					type="text"
					defaultValue={ this.props.name }
					ref={(input) => this.focusInput = input}
					onBlur={ this.onInputBlur }

				/>
			</>
		)
	}
}