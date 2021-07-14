import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    modal: modalReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer
})

