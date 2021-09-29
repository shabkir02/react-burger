import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch  } from 'redux';
import { rootReducer } from '../reducers';

import { TIngredientsActions } from '../actions/ingredients/ingredients';
import { TOrderActions } from '../actions/order/order';
import { TModalActions } from '../actions/modal/modal';
import { TResetPasswordActions } from '../actions/reset-password/reset-password';
import { TWsOrdersActions } from '../actions/wsOrders/wsOrders';
import { TUserActions } from '../actions/user/user';

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>

// Типизация всех экшенов 
export type TApplicationActions = 
  | TIngredientsActions
  | TOrderActions
  | TModalActions
  | TResetPasswordActions
  | TWsOrdersActions
  | TUserActions
; 

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 