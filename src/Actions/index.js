import { v4 as generateId } from 'uuid'

export const addItem = () => ({
    type: 'ADD_ITEM',
    done: false,
    value: '',
    // group: this.state.currentGroup,
    id: generateId(),
});

export const updateItemValue = (value, id) => ({
    type: 'UPDATE_ITEM_VALUE',
    value: value,
    id,
});

export const checkItem = id => ({
    type: 'CHECK_ITEM',
    id,
});

export const deleteItem = id => ({
    type: 'DELETE_ITEM',
    id
});

export const createNewGroup = () => ({
    type: 'CREATE_NEW_GROUP',
    id: generateId(),
    name: 'New group',
});

export const renameGroup = (name, id) => ({
    type: 'RENAME_GROUP',
    name: name,
    id,
});

export const deleteGroup = id => ({
    type: 'DELETE_GROUP',
    id,
});

export const filterGroup = (arr, groupId) => ({
    type: 'FILTER_GROUP',
    arr,
    groupId,
});

export const switchGroup = id => ({
    type: 'SWITCH_GROUP',
    id,
});

export const switchStatus = status => ({
    type: 'SWITCH_STATUS',
    status,
});


export const statuses = {
    ALL: 'ALL',
    PLANNED: 'PLANNED',
    DONE: 'DONE',
}