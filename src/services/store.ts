import { createStore } from 'redux';
import { rootReducer, enhancer } from './reducers';

export const store = createStore(rootReducer, enhancer);