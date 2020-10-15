import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddButton from './AddButton.js';
import TabNav from './TabNav/TabNav.js';
import GroupList from './Groups/GroupList.js';
import TodoList from './TodoList.js';
import Pagination from './Pagination/Pagination.js';

import { TAB_NAV_OPTIONS } from './TabNav/TabNavOptions.js';
import { commonFilter } from '../utils'
import { getItemsLocalStorage, getGroupsLocalStorage } from '../utils';

import { addItem, checkItem, deleteItem, updateItemValue } from '../ActionCreators';

class App extends Component {
  counterGroup = 1;
  constructor() {
    super();

    this.state = {
      groups: [],
      showingItems: [],
      currentGroup: 1,
      status: 'all',
      currentPage: 1,
    };
  }

  getGroupsLocalStorage = () => localStorage.getItem('savedGroups') !== null
  ? JSON.parse(localStorage.getItem('savedGroups'))
  : [{ id: this.counterGroup, name: `Group ${this.counterGroup}` }];


  /* Groups */

  createNewGroup = () => {
    const { groups } = this.state;
    const newGroup = {
      id: ++this.counterGroup,
      name: `Group ${this.counterGroup}`,
    };
    const addedGroup = [...groups, newGroup];

    this.setState({
        groups: addedGroup,
        showingItems: [],
        currentPage: 1,
        status: 'all',
        currentGroup: this.counterGroup,
    });
  };

  renameGroup = (name, id) => {
    const updatedGroups = [...this.state.groups];
    const foundGroup = updatedGroups.find((group) => group.id === id);
    if (name) {
      foundGroup.name = name;
      this.setState({
        groups: updatedGroups,
      });
    } else {
      foundGroup.name = `Group ${this.counterGroup}`;
      this.setState({
        groups: updatedGroups,
      });
    }
  };

  deleteGroup = id => {
    const { items, groups } = this.state;
    const updatedGroups = [...groups];
    const updatedItems = [...items];
    const foundGroup = updatedGroups.filter((group) => group.id !== id);
    const foundItems = updatedItems.filter((item) => item.group !== id);
    if (foundGroup.length) {
      const firstId = foundGroup[0].id;
      const { filteredByPage } = commonFilter(
        foundItems,
        'all',
        firstId,
        1
      );
      this.setState({
        showingItems: filteredByPage,
        groups: foundGroup,
        items: foundItems,
        currentGroup: firstId,
      });
    } else {
      this.setState({
        groups: foundGroup,
        items: foundItems,
        showingItems: [],
      });
    }
  };

  switchGroup = id => {
    const { items } = this.state;
    const updatedItems = [...items];
    const { filteredByPage } = commonFilter(updatedItems, 'all', id, 1);
    this.setState({
      showingItems: filteredByPage,
      currentGroup: id,
      currentPage: 1,
      status: 'all',
    });
  };

  /* Filter status */

  switchStatus = status => {
    const { items, currentGroup } = this.state;
    const updatedItems = [...items];
    const { filteredByPage } = commonFilter(
      updatedItems,
      status,
      currentGroup,
      1
    );
    this.setState({
      status: status,
      showingItems: filteredByPage,
      currentPage: 1,
    });
  };

  /* Pages */

  switchToFirstPage = () => {
    const { items, status, currentGroup } = this.state;
    const { filteredByPage } = commonFilter(
      items,
      status,
      currentGroup,
      1
    );
    this.setState({
      currentPage: 1,
      showingItems: filteredByPage,
    });
  };

  switchToNextPage = () => {
    const { items, currentGroup, currentPage, status } = this.state;
    const { filteredByStatus, filteredByPage } = commonFilter(
      items,
      status,
      currentGroup,
      currentPage + 1
    );
    const totalPages = Math.ceil(filteredByStatus.length / 10);
    this.setState(({ currentPage }) => {
      if (currentPage < totalPages) {
        return {
          currentPage: currentPage + 1,
          showingItems: filteredByPage,
        };
      }
    });
  };

  switchToPrevPage = () => {
    const { items, currentGroup, currentPage, status } = this.state;
    const { filteredByPage } = commonFilter(
      items,
      status,
      currentGroup,
      currentPage - 1
    );
    if (currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
        showingItems: filteredByPage,
      });
    }
  };

  switchToLastPage = () => {
    const { items, currentGroup, status, currentPage } = this.state;
    const { filteredByStatus } = commonFilter(
      items,
      status,
      currentGroup,
      currentPage
    );
    const totalPages = Math.ceil(filteredByStatus.length / 10);
    const { filteredByPage } = commonFilter(
      items,
      status,
      currentGroup,
      totalPages
    );
    if (totalPages) {
      this.setState({
        currentPage: totalPages,
        showingItems: filteredByPage,
      });
    }
  };

  componentDidMount() {
    let items = getItemsLocalStorage();
    let groups = this.getGroupsLocalStorage();
    let { filteredByPage } = commonFilter(items, 'all', 1, 1);

    this.setState({
      items: items,
      groups: groups,
      showingItems: filteredByPage,
    });

    this.counterGroup = Math.max(...groups.map((group) => group.id));
    this.counterGroup =
      this.counterGroup === -Infinity ? 1 : this.counterGroup + 1;
  }

  componentDidUpdate() {
    localStorage.setItem('saved', JSON.stringify(this.state.items));
    localStorage.setItem('savedGroups', JSON.stringify(this.state.groups));
  }

  render() {
    const {
      showingItems,
      groups,
      currentGroup,
      status,
      currentPage,
		} = this.state;
		
    return (
      <div className='container'>
        <div className='wrap'>
          <GroupList
            groups={groups}
            currentGroup={currentGroup}
            createNewGroup={this.createNewGroup}
            switchGroup={this.switchGroup}
            renameGroup={this.renameGroup}
            deleteGroup={this.deleteGroup}
          />
          <div className='todo'>
            <TabNav
              switchStatus={this.switchStatus}
              options={TAB_NAV_OPTIONS}
              activeTab={status}
            />
            <TodoList
              items={this.props.items}
              onCheckItem={this.props.checkItem}
              onDeleteItem={this.props.deleteItem}
              onUpdateItemValue={this.props.updateItemValue}
              onAddItem={this.props.addItem}
            />
            <Pagination
              currentPage={currentPage}
              switchToFirstPage={this.switchToFirstPage}
              switchToNextPage={this.switchToNextPage}
              switchToPrevPage={this.switchToPrevPage}
              switchToLastPage={this.switchToLastPage}
            />
          <AddButton onAddItem={this.props.addItem} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    items: store
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: () => dispatch(addItem()),
    checkItem: id => dispatch(checkItem(id)),
    deleteItem: id => dispatch(deleteItem(id)),
    updateItemValue: (value, id) => dispatch(updateItemValue(value, id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);