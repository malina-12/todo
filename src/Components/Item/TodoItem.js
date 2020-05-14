import React, { Component } from 'react';


export class TodoItem extends Component {
	constructor(props) {
		super(props);
	};

	/* componentDidMount(){
		this.textInput.focus();
	  } */


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
					value={ this.props.item.value }
					onChange={ this.props.onInputChange }
					onBlur={ () => this.props.onInputBlur(this.props.item.id) }
					//ref={ (input) => this.textInput = input }
				/>
				
				<span className="delete"
					onClick={ () => this.props.onDeleteItem(this.props.item.id) }
				>
				</span>
			</>
		)
	}
}
