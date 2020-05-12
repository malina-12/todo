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
		this.deleteItem = this.deleteItem.bind(this);
		this.checkItem = this.checkItem.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.inputBlur = this.inputBlur.bind(this);
		this.filterItems = this.filterItems.bind(this);

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
				items: newItems}
		})
	};

	inputChange = (event) => {
		const inputValue = event.target.value;
		return inputValue;
	}

	inputBlur = (event) => {
		const itemId = event.target.previousSibling.querySelector('input').getAttribute('id');
		const itemIndex = this.state.items.findIndex(item => item.id === Number(itemId));
		const inputValue = event.target.value.trim();
		this.setState(({ items }) => {
			const prevItem = items[itemIndex];
			const updatedItem = {...prevItem, value: inputValue};
				if (inputValue.length) {
				const addedItems = [...items.slice(0, itemIndex), updatedItem, ...items.slice(itemIndex + 1)];
				return {
					items: addedItems,
				}
			} else {
				const removedItems = [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
				return {
					items: removedItems,
				}
			}
		});
	}

	deleteItem = (event) => {
		const checkboxId = event.target.previousSibling.previousSibling.querySelector('input').getAttribute('id');
		const checkboxIndex = this.state.items.findIndex(item => item.id === Number(checkboxId));
		this.setState(({ items }) => {
			const updatedItems = [...items.slice(0, checkboxIndex), ...items.slice(checkboxIndex + 1)];
			return {
				items: updatedItems,
			}
		})
	}
	
	checkItem = (event) => {
		const checkboxId = event.target.getAttribute('id');
		const checkedItemIndex = this.state.items.findIndex(item => item.id === Number(checkboxId));
		this.setState(({ items }) => {
			const prevItem = items[checkedItemIndex];
			const updatedItem = {...prevItem, done: !prevItem.done};
			const updatedItems = [...items.slice(0, checkedItemIndex), updatedItem, ...items.slice(checkedItemIndex + 1)];
			return {
				items: updatedItems,
			}
		})
		//localStorage.setItem('saved', JSON.stringify( this.state.items ));
	}
	
	filterItems = () => {
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
							onInputBlur={this.inputBlur}
							onInputChange={this.inputChange}
						/>
					</div>
					<AddButton onAddItem={this.addItem} />
				</div>
			</div>
		)
	}
}
