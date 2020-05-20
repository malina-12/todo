import React, { Component } from 'react';
import update from 'immutability-helper';
import { AddButton } from './AddButton.js';
import { TabNav } from './TabNav/TabNav.js';
import { Groups } from './Groups.js';
import { TAB_NAV_OPTIONS } from "./TabNav/TabNavOptions.js";
import { TodoList } from './TodoList.js';
import { Pagination } from './Pagination.js'

export class App extends Component {
	
	counter = 0;
	counterGroup = 0;
	
	constructor(props) {
		super(props);
		const items = this.getItemsLocalStorage();
		
		this.counter = Math.max(...items.map(item => item.id));
		this.counter = this.counter === -Infinity ? 1 : this.counter + 1;

		this.state = {
			items: items,
			groups: [],
			status: 'all',
			currentPage: 1,
			limitItemsPerPage: 10,
		};
		

		this.addItem = this.addItem.bind(this);
		this.createNewGroup = this.createNewGroup.bind(this);
		this.renameGroup = this.renameGroup.bind(this);
		this.updateItemValue = this.updateItemValue.bind(this);
		this.getItemsLocalStorage = this.getItemsLocalStorage.bind(this);
		this.switchToNextPage = this.switchToNextPage.bind(this);
		this.switchToPrevPage = this.switchToPrevPage.bind(this);


	};
	
	getItemsLocalStorage = () => localStorage.getItem('saved') !== null ? JSON.parse(localStorage.getItem('saved')) : [];

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
		this.changeStatus('all');
	};

	updateItemValue = (value, id) => {
		const updatedItems = [...this.state.items];
		const updatedItem = this.state.items.find(item => item.id === id);
		if(value) {
			updatedItem.value = value.trim();
			this.setState({
				items: updatedItems,
			})
		} else {
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
		const updatedItems = [...this.state.items];
		const checkedItem = updatedItems.find(item => item.id === id);
		checkedItem.done = !checkedItem.done;
		this.setState({
			items: updatedItems,
		})
		console.log(checkedItem)
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
		});
		//console.log('tab', status)
	}

	getItemsOnPage = (arr) => {
		const start = (this.state.currentPage - 1) * this.state.limitItemsPerPage;
		const end = start + this.state.limitItemsPerPage;
		const currentPageItems = arr.slice(start, end);
		return currentPageItems;
	}

	switchToNextPage = () => {
		this.setState(({ currentPage }) => {
			return {
				currentPage: currentPage+1,
			}
		})	
	}

	switchToPrevPage = () => {
		this.setState(({ currentPage }) => {
			return {
				currentPage: currentPage-1,
			}
		})
	}

	createNewGroup = () => {
		const newGroup = {
			id: this.counterGroup++,
			name: '',
		};

		this.setState(({ groups }) => {
			const addedGroup = update(groups, {$push: [newGroup]});
			return {
				groups: addedGroup
			}
		});
		console.log('group created', this.state.groups)
	}

	renameGroup = (name, id) => {
		const updatedGroups = [...this.state.groups];
		const findedtGroup = this.state.groups.find(group => group.id === id);
		if(name) {
			findedtGroup.name = name;
			this.setState({
				groups: updatedGroups,
			})
		} else {
			findedtGroup.name = `Group ${this.counterGroup}`;
			this.setState({
				groups: updatedGroups,
			})
		}
	}

	deleteGroup = (id) => {
		const updatedGroup = this.state.groups.filter(group => group.id !== id);
		this.setState({
			groups: updatedGroup,
		})
		console.log(updatedGroup);
	}

	componentDidUpdate() {
		console.log('did update', this.state.groups);
		localStorage.setItem('saved', JSON.stringify( this.state.items ));
	}
	
	render() { 
		const filteredItems = this.getItemsOnPage(this.filterItems());
	// создать массив, видимый пользователю. в пагинацию передавать отфильтрованный массив
		return (
			<div className="container">
				<div className="wrap">
						<Groups
							groups={this.state.groups}
							createNewGroup={this.createNewGroup}
							onRenameGroup={this.renameGroup}
							onDeleteGroup={this.deleteGroup}
						/>
					<div className="todo">
						<TabNav 
							onSwitchTab={this.changeStatus}
							options={TAB_NAV_OPTIONS}
							activeTab={this.state.status}
						/>
						<TodoList 
							items={filteredItems}
							onCheckItem={this.checkItem}
							onDeleteItem={this.deleteItem}
							onUpdateItemValue={this.updateItemValue}
						/>
						<Pagination
							currentPage={this.state.currentPage}
							switchToNextPage={this.switchToNextPage}
							switchToPrevPage={this.switchToPrevPage}

						/>
					</div>
					<AddButton onAddItem={this.addItem} />
				</div>
			</div>
		)
	}
}
