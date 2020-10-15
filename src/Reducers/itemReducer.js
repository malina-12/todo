import { getItemsLocalStorage } from '../utils';

const items = getItemsLocalStorage();

const itemReducer = (state = items, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return [
        {
          done: false,
          value: '',
          group: 1,
          id: action.id,
        },
        ...state,
      ]
    case 'UPDATE_ITEM_VALUE':
      return state.map(item =>
        item.id === action.id
          ? {...item, value: action.value}
          : item
      )
    case 'CHECK_ITEM':
      return [...state.map(item =>
        item.id === action.id
          ? {...item, done: !item.done}
          : item
      )]
    case 'DELETE_ITEM':
      return [...state.filter(item => item.id !== action.id)]
    
    default:
      return state
   }
}

export default itemReducer
