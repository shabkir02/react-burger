import { combineReducers } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';
import { wsReducer } from './wsOrders';
import { socketMiddleware } from '../middleware/socketMiddleware';

import {
    wsAllOrdersConnectionSuccess, 
    wsAllOrdersConnectionError,
    wsAllOrdersConnectionClosed,
    wsAllOrdersGetMessage,
    wsAllOrdersConnectionStart,
    wsUserOrdersConnectionSuccess, 
    wsUserOrdersConnectionError,
    wsUserOrdersConnectionClosed,
    wsUserOrdersGetMessage,
    wsUserOrdersConnectionStart
} from '../actions/wsOrders';

/// Все заказы
const wsAllOrdersActions = {
    wsInit: wsAllOrdersConnectionStart,
    onOpen: wsAllOrdersConnectionSuccess,
    onClose: wsAllOrdersConnectionClosed,
    onError: wsAllOrdersConnectionError,
    onMessage: wsAllOrdersGetMessage
};

/// Заказы юзера
const wsUserOrdersActions = {
    wsInit: wsUserOrdersConnectionStart,
    onOpen: wsUserOrdersConnectionSuccess,
    onClose: wsUserOrdersConnectionClosed,
    onError: wsUserOrdersConnectionError,
    onMessage: wsUserOrdersGetMessage
};

export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    wsOrders: wsReducer
})

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(null, wsAllOrdersActions),
    socketMiddleware('token', wsUserOrdersActions)
));

