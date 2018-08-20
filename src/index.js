import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bicycleReducer from './store/reducers/bicycle'
import authReducer from './store/reducers/auth'
console.log(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const rootReducer = combineReducers( {
  bicycle: bicycleReducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
