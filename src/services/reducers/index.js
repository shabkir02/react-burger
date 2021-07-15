import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    ingredients: ingredientsReducer
})

