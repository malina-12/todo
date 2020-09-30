import { combineReducers } from 'redux';
import groupReducer from './groupReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers(groupReducer, itemReducer);

export default rootReducer;