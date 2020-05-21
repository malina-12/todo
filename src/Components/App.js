import React, { Component } from 'react';
import update from 'immutability-helper';
import { AddButton } from './AddButton.js';
import { TabNav } from './TabNav/TabNav.js';
import { GroupList } from './Groups/Group List.js';
import { TAB_NAV_OPTIONS } from "./TabNav/TabNavOptions.js";
import { TodoList } from './TodoList.js';
import { Pagination } from './Pagination.js'

export class App extends Component {
	
	counter = 0;
	counterGroup = 1;
	
	constructor(props) {
		super(props);
		const items = this.getItemsLocalStorage();
		const groups = [{
			id: this.counterGroup,
			name: `Group ${this.counterGroup}`}];
		
		this.counter = Math.max(...items.map(item => item.id));
		this.counter = this.counter === -Infinity ? 1 : this.counter + 1;

		this.counterGroup = Math.max(...groups.map(group => group.id));

		this.state = {
			items: items,
			groups: groups,
			currentGroup: 1,
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
		this.filterGroup = this.filterGroup.bind(this);
	};
	
	getItemsLocalStorage = () => localStorage.getItem('saved') !== null ? JSON.parse(localStorage.getItem('saved')) : [];

	addItem = () => {
		const newItem = {
			done: false,
			value: '',
			group: this.state.currentGroup,
			id: this.counter++,
		}
		this.setState(({ items }) => {
			const newItems = update(items, {$unshift: [newItem]});
			return {
				items: newItems,
				currentPage: 1,
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
	
	filterItems (arr) {
		switch(this.state.status) {
			case 'planned':
				return arr.filter(item => !item.done);
			
			case 'done':
				return arr.filter(item => item.done);

			default:
				return arr;
		}
	}

	changeStatus = (status) => {
		this.setState({
			status: status,
		});
	}

	getItemsOnPage = (arr) => {
		const start = (this.state.currentPage - 1) * this.state.limitItemsPerPage;
		const end = start + this.state.limitItemsPerPage;
		const currentPageItems = arr.slice(start, end);
		return currentPageItems;
	}

	switchToNextPage = (arr) => {
		const totalPages = Math.ceil(arr.length/this.state.limitItemsPerPage);
		this.setState(({ currentPage }) => {
			if(currentPage < totalPages) {
			return {
				currentPage: currentPage+1,
			}}
		});
	}

	switchToPrevPage = () => {
		this.setState(({ currentPage }) => {
			if(currentPage > 1) {
			return {
				currentPage: currentPage-1,
			}}
		});
	}

	createNewGroup = () => {
		const newGroup = {
			id: ++this.counterGroup,
			name: `Group ${this.counterGroup}`,
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
		const findedtGroup = updatedGroups.find(group => group.id === id);
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

	filterGroup = () => {
		const filteredGroup = this.state.items.filter(item => item.group === this.state.currentGroup);
		console.log('это фильтр групп', filteredGroup);
		return filteredGroup;
	}

	switchGroup = (id) => {
		this.setState({
			currentGroup: id,
		})
		console.log('target id ->', id)
	}	

	componentDidUpdate() {
		//console.log('groups ->', this.state.groups, 'items ->', this.state.items);
		localStorage.setItem('saved', JSON.stringify( this.state.items));
		console.log( 'in state ->', this.state.currentGroup)
	}
	
	render() { 
		let filteredItems = this.filterGroup();
		filteredItems = this.filterItems(filteredItems);
		filteredItems = this.getItemsOnPage(filteredItems);
		

		return (
			<div className="container">
				<div className="wrap">
						<GroupList
							items={filteredItems}
							groups={this.state.groups}
							currentGroup={this.state.currentGroup}
							createNewGroup={this.createNewGroup}
							onSwitchGroup={this.switchGroup}
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
							items={filteredItems}

						/>
					</div>
					<AddButton onAddItem={this.addItem} />
				</div>
			</div>
		)
	}
}
