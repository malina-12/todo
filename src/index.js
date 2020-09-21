import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import itemReducer from './Reducers';
import App from './Components/App.js';
import './style.css';

const rootElement =  document.getElementById('root');
const store = createStore(itemReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  rootElement
 )
 