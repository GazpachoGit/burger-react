import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose } from 'redux';
import * as actions from './actions/wsActions';
import { wsUrl } from '../utils/constants';
import socketMiddleware from './middlewares/socketMiddleware';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
    socketMiddleware(wsUrl + '/all', commonOrdersWsActions),
    socketMiddleware(wsUrl, userOrdersWsActions, true)
));

export const store = createStore(rootReducer, enhancer);