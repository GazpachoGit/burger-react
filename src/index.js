import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import socketMiddleware from './services/middlewares/socketMiddleware';
import * as actions from './services/actions/wsActions';
import {wsUrl} from './utils/constants'; 

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//websocket
const wsActions = {
  wsOpened: actions.WS_CONNECTION_SUCCESS,
  wsClose: actions.WS_CONNECTION_CLOSE,
  wsClosed: actions.WS_CONNECTION_CLOSED,
  wsError: actions.WS_CONNECTION_ERROR,
  
}
const commonOrdersWsActions = {
  ...wsActions,
  wsInit: actions.WS_COMMON_ORDERS_CONNECTION_START,
  wsMessage: actions.WS_GET_COMMON_ORDERS
}
const userOrdersWsActions = {
  ...wsActions,
  wsInit: actions.WS_USER_ORDERS_CONNECTION_START,
  wsMessage: actions.WS_GET_USER_ORDERS
}

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(wsUrl+'/all', commonOrdersWsActions),
  socketMiddleware(wsUrl, userOrdersWsActions, true)
  ));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();