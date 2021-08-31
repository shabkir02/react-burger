import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch } from 'redux';

import { store } from '../reducers';
import { TIngredientsActions, TOrderActions, TModalActions } from '../actions';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов 
type TApplicationActions = 
  & TIngredientsActions
  & TOrderActions
  & TModalActions
; 

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 