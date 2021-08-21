import { combineReducers } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';
import { wsReducer } from './wsOrders';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { getCookie } from '../../utils/cookies';

import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS, 
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS, 
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_START
} from '../actions';

/// Get all orders
const wsAllOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsAllOrdersActions = {
    wsInit: WS_ALL_ORDERS_CONNECTION_START,
    onOpen: WS_ALL_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_ALL_ORDERS_CONNECTION_CLOSED,
    onError: WS_ALL_ORDERS_CONNECTION_ERROR,
    onMessage: WS_ALL_ORDERS_GET_MESSAGE
};

/// Get only user orders
const wsUserOrdersUrl = `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`;
const wsUserOrdersActions = {
    wsInit: WS_USER_ORDERS_CONNECTION_START,
    onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
    onError: WS_USER_ORDERS_CONNECTION_ERROR,
    onMessage: WS_USER_ORDERS_GET_MESSAGE
};

const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    wsOrders: wsReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 


const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(wsAllOrdersUrl, wsAllOrdersActions),
    socketMiddleware(wsUserOrdersUrl, wsUserOrdersActions)
));

export const store = createStore(rootReducer, enhancer);

