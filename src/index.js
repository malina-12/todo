import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './Reducers';
import App from './Components/App.js';
import './style.css';
import itemReducer from './Reducers/itemReducer';

const rootElement =  document.getElementById('root');
const store = createStore(itemReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  rootElement
 )
 