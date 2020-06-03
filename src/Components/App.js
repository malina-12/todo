import React, { Component } from 'react';
import update from 'immutability-helper';
import AddButton from './AddButton.js';
import TabNav from './TabNav/TabNav.js';
import GroupList from './Groups/GroupList.js';
import { TAB_NAV_OPTIONS } from "./TabNav/TabNavOptions.js";
import  TodoList  from './TodoList.js';
import Pagination from './Pagination/Pagination.js'

export class App extends Component {
	
	counter = 0;
	counterGroup = 1;
	LIMIT = 10;
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			groups: [],
			filteredItems: [],
			currentItems: 0,
			showingItems:[],
			currentGroup: 1,
			status: 'all',
			currentPage: 1,
			limitItemsPerPage: 0,
		};
		
	};
	
	getItemsLocalStorage = () => localStorage.getItem('saved') !== null ? JSON.parse(localStorage.getItem('saved')) : [];
	getGroupsLocalStorage = () => localStorage.getItem('savedGroups') !== null ? JSON.parse(localStorage.getItem('savedGroups')) : [{id: this.counterGroup,	name: `Group ${this.counterGroup}`}];

	
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
		}, () => this.filterGroup(this.state.currentGroup))
		this.changeStatus('all');
	}

	updateItemValue = (value, id) => {
		const updatedItems = [...this.state.items];
		const updatedItem = updatedItems.find(item => item.id === id);
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

	deleteItem = id => {
		const {items} = this.state;
		const updatedItems = [...items];
		const findedItems = updatedItems.filter(item => item.id !== id);
		this.setState({
			items: findedItems,
		})
	}

	checkItem = id => {
		const updatedItems = [...this.state.items];
		const checkedItem = updatedItems.find(item => item.id === id);
		checkedItem.done = !checkedItem.done;
		this.setState({
			items: updatedItems,
		}, () => this.filter)
	}
	

	/* Groups */

	createNewGroup = () => {
		const newGroup = {
			id: ++this.counterGroup,
			name: `Group ${this.counterGroup}`,
		};

		this.setState(({ groups }) => {
			const addedGroup = update(groups, {$push: [newGroup]});
			return {
				groups: addedGroup,
			}
		});
		this.filterGroup(this.counterGroup);
	}

	renameGroup = (name, id) => {
		const updatedGroups = [...this.state.groups];
		const findedGroup = updatedGroups.find(group => group.id === id);
		if(name) {
			findedGroup.name = name;
			this.setState({
				groups: updatedGroups,
			})
		} else {
			findedGroup.name = `Group ${this.counterGroup}`;
			this.setState({
				groups: updatedGroups,
			})
		}
	}

	deleteGroup = id => {
		const {items, groups} = this.state;
		const updatedGroups = [...groups];
		const updatedItems = [...items];
		const findedGroup = updatedGroups.filter(group => group.id !== id);
		const findedItems = updatedItems.filter(item => item.group !== id);
		this.setState({
			groups: findedGroup,
			items: findedItems,
		})
	}

	filterGroup = id => {
		const {items} = this.state;
		const updatedItems = [...items];
		const filteredGroup = updatedItems.filter(item => item.group === id);
		this.setState({
			filteredItems: filteredGroup,
			currentGroup: id,
			currentPage: 1,
		}, () => this.changeStatus('all'))
	}

	/* Filter status */

		filterItems = (arr, status) => {
			switch(status) {
			case 'planned':
				return arr.filter(item => !item.done);

			case 'done':
				return arr.filter(item => item.done);

			default:
				return arr;
		}	
	}

	changeStatus = status => {
		const {filteredItems} = this.state;
		const updatedItems = [...filteredItems];
		let filteredByStatusItems = this.filterItems(updatedItems, status);
		this.setState({
			status: status,
			currentItems: filteredByStatusItems,
			currentPage: 1
		}, () => this.getItemsOnPage());
	}

	/* Pages */

	getItemsOnPage = () => {
		const {currentPage, limitItemsPerPage, currentItems} = this.state;
		const updatedItems = [...currentItems];
		const start = (currentPage - 1) * limitItemsPerPage;
		const end = start + limitItemsPerPage;
		const currentPageItems = updatedItems.slice(start, end);
		this.setState({
			showingItems: currentPageItems
		})
	}

	switchToFirstPage = () => {
		this.setState({
			currentPage: 1,
		}, () => this.getItemsOnPage())
	}

	switchToNextPage = () => {
		const {currentItems, limitItemsPerPage} = this.state;
		const totalPages = Math.ceil(currentItems.length/limitItemsPerPage);
		this.setState(({ currentPage }) => {
			if(currentPage < totalPages) {
			return {
				currentPage: currentPage+1,
			}}
		}, () => this.getItemsOnPage());
	}

	switchToPrevPage = () => {
		this.setState(({ currentPage }) => {
			if(currentPage > 1) {
			return {
				currentPage: currentPage-1,
			}}
		}, () => this.getItemsOnPage());
	}

	switchToLastPage = () => {
		const {currentItems, limitItemsPerPage} = this.state;
		const totalPages = Math.ceil(currentItems.length/limitItemsPerPage);
		this.setState(({ currentPage }) => {
			if(totalPages) {
				return {
				currentPage: totalPages,
		}}}, () => this.getItemsOnPage())
	}

	getDerivedStateFromState() {
		this.getItemsOnPage();
	}

	componentDidMount() {
		const {items, groups} = this.state;
		let currentItems =  items.filter(item => item.group === 1);
			this.setState({
			items: this.getItemsLocalStorage(),
			groups: this.getGroupsLocalStorage(),
			currentItems: currentItems,
			limitItemsPerPage: this.LIMIT,
		}, () => this.filterGroup(1))

		this.counter = Math.max(...items.map(item => item.id));
		this.counter = this.counter === -Infinity ? 1 : this.counter + 1;
	
		this.counterGroup = Math.max(...groups.map(group => group.id));
		this.counterGroup = this.counterGroup === -Infinity ? 1 : this.counterGroup + 1;
	}

	componentDidUpdate() {
		localStorage.setItem('saved', JSON.stringify(this.state.items));
		localStorage.setItem('savedGroups', JSON.stringify(this.state.groups));

	}
	
	render() {

		return (
			<div className="container">
				<div className="wrap">
						<GroupList
							groups={this.state.groups}
							currentGroup={this.state.currentGroup}
							createNewGroup={this.createNewGroup}
							onFilterGroup={this.filterGroup}
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
							items={this.state.showingItems}
							onCheckItem={this.checkItem}
							onDeleteItem={this.deleteItem}
							onUpdateItemValue={this.updateItemValue}
						/>
						<Pagination
							currentPage={this.state.currentPage}
							switchToFirstPage={this.switchToFirstPage}
							switchToNextPage={this.switchToNextPage}
							switchToPrevPage={this.switchToPrevPage}
							switchToLastPage={this.switchToLastPage}
						/>
					</div>
					<AddButton onAddItem={this.addItem} />
				</div>
			</div>
		)
	}
}
