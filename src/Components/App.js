import React, { Component } from 'react';
import update from 'immutability-helper';
import { AddButton } from './AddButton.js';
import { TabNav } from './TabNav/TabNav.js';
import { TodoList } from './TodoList.js';
import { TAB_NAV_OPTIONS } from "./TabNav/TabNavOptions.js";

export class App extends Component {
	
	counter = 0;
	
	constructor(props) {
		super(props);
		const items = [];
		//const items = getItemsLocalStorage();
		//getItemsLocalStorage = () => localStorage.getItem('saved') !== null ? JSON.parse(localStorage.getItem('saved')) : [];
		
		this.counter = Math.max(...items.map(item => item.id));
		this.counter = this.counter === -Infinity ? 1 : this.counter + 1;

		this.state = {
			items: items,
			status: 'all'
		};
		

		this.addItem = this.addItem.bind(this);
		this.updateItemValue = this.updateItemValue.bind(this);

	};
	
	addItem = () => {
		const newItem = {
			done: false,
			value: '',
			id: this.counter++,
		}
		this.setState(({ items }) => {
			const newItems = update(items, {$unshift: [newItem]});
			return {
				items: newItems,
			}
		})
	};

	updateItemValue = (value, id) => {
		const inputIndex = this.state.items.findIndex(item => item.id === id);
		if(value) {
			const updatedItems = update(this.state.items, {[inputIndex]: {value: {$set: value}}});
			this.setState({
				items: updatedItems,
			})
		} else  {
			const updatedItems = this.state.items.filter(item => item.id !== id);
			this.setState({
				items: updatedItems,
			})
		}
	}	

	deleteItem = (id) => {
		const updatedItems = this.state.items.filter(item => item.id !== id);
		this.setState({
			items: updatedItems,
		})
	}

	checkItem = (id) => {
		const checkedItemIndex = this.state.items.findIndex(item => item.id === id);
		const updatedItems = update(this.state.items, {[checkedItemIndex]: {done: {$set: !this.state.items[checkedItemIndex].done}}});
		this.setState({
			items: updatedItems,
		})
		//localStorage.setItem('saved', JSON.stringify( this.state.items ));
	}
	
	filterItems () {
		switch(this.state.status) {
			case 'planned':
				return this.state.items.filter(item => !item.done);
			
			case 'done':
				return this.state.items.filter(item => item.done);

			default:
				return this.state.items;
		}
	}

	changeStatus = (status) => {
		this.setState({
			status: status,
		})
	}

	componentDidUpdate() {
		console.log(this.state.items)
	}
	
	render() { 
		const filteredItems = this.filterItems();

		return (
			<div className="container">
				<div className="wrap">
					<div className="todo">
						<TabNav 
							onSwitchTab={this.changeStatus}
							options={TAB_NAV_OPTIONS}
						/>
						<TodoList 
							items={filteredItems}
							onCheckItem={this.checkItem}
							onDeleteItem={this.deleteItem}
							onUpdateItemValue={this.updateItemValue}
						/>
					</div>
					<AddButton onAddItem={this.addItem} />
				</div>
			</div>
		)
	}
}
