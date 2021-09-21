import { combineReducers } from 'redux';
// import { applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from '@redux-saga/core';

import ingredientsReducer from './ingredients';
import modalReducer from './modal';
import orderReducer from './order';
import resetPasswordReducer from './reset-password';
import userReducer from './user';
// import { createSocketMiddlware } from '../middleware/socketMiddleware';
import wsReducer from './wsOrders';

// import {
//     wsAllOrdersConnectionSuccess, 
//     wsAllOrdersConnectionError,
//     wsAllOrdersConnectionClosed,
//     wsAllOrdersGetMessage,
//     wsAllOrdersConnectionStart,
//     wsUserOrdersConnectionSuccess, 
//     wsUserOrdersConnectionError,
//     wsUserOrdersConnectionClosed,
//     wsUserOrdersGetMessage,
//     wsUserOrdersConnectionStart
// } from '../actions/wsOrders';

import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED ,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_START
} from '../constants/wsOrders';

/// Все заказы
export const wsAllOrdersActions = {
    wsInit: WS_ALL_ORDERS_CONNECTION_START,
    onOpen: WS_ALL_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_ALL_ORDERS_CONNECTION_CLOSED,
    onError: WS_ALL_ORDERS_CONNECTION_ERROR,
    onMessage: WS_ALL_ORDERS_GET_MESSAGE
};

/// Заказы юзера
export const wsUserOrdersActions = {
    wsInit: WS_USER_ORDERS_CONNECTION_START,
    onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
    onError: WS_USER_ORDERS_CONNECTION_ERROR,
    onMessage: WS_USER_ORDERS_GET_MESSAGE
};

export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    wsOrders: wsReducer
})

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
  
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const sagaMiddleware = createSagaMiddleware();

// export const enhancer = composeEnhancers(applyMiddleware(
//     thunk,
//     sagaMiddleware,
//     createSocketMiddlware(null, wsAllOrdersActions),
//     createSocketMiddlware('token', wsUserOrdersActions)
// ));

