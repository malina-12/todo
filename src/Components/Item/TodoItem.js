import React, { Component } from 'react';


export class TodoItem extends Component {
	constructor(props) {
		super(props);
	}

	onInputBlur = (event) => {
		this.props.onUpdateItemValue(event.target.value, this.props.item.id);
		this.setState({
			input: event.target.value,
		})
	}

	componentDidMount(){
		this.textInput.focus();
	}


	render() {
		return (
			<>
				<label className="main__checkbox">
					<input 
						type="checkbox" 
						onChange={ () => this.props.onCheckItem(this.props.item.id) } 
						checked={ this.props.item.done } 
						/>
					<span className="checkmark"></span>
				</label>

				<input className="main__input"
					type="text"
					defaultValue={ this.props.item.value }
					onBlur={ this.onInputBlur }
					ref={ (input) => this.textInput = input }
				/>
				
				<span className="delete"
					onClick={ () => this.props.onDeleteItem(this.props.item.id) }
				>
				</span>
			</>
		)
	}
}
