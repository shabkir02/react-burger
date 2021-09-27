import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { createSocketMiddlware } from './middleware/socketMiddleware';
import { wsAllOrdersActions, wsUserOrdersActions } from './reducers';
import { rootSaga } from './sagas'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    sagaMiddleware,
    createSocketMiddlware(null, wsAllOrdersActions),
    createSocketMiddlware('token', wsUserOrdersActions)
));

export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);