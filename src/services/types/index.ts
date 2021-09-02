import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch  } from 'redux';

import { store } from '../store';

import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TModalActions } from '../actions/modal';
import { TResetPasswordActions } from '../actions/reset-password';
import { TWsOrdersActions } from '../actions/wsOrders';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов 
type TApplicationActions = 
  & TIngredientsActions
  & TOrderActions
  & TModalActions
  & TResetPasswordActions
  & TWsOrdersActions
; 

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 

// export interface Middleware<
//   DispatchExt = {}, S = any, D extends Dispatch = Dispatch
// >

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}