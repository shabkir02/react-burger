import { getCookie } from '../../utils/cookies';
import { resetConstructor } from '../actions/ingredients'

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../constants/order';

import { AppDispatch, AppThunk } from '../types';
import { TOrder } from '../types/data';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: TOrder
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IIOrderResetAction {
  readonly type: typeof ORDER_RESET;
}

export type TOrderActions = 
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IIOrderResetAction
;

export const getOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST
})
export const getOrderSuccess = (order: TOrder): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: order
})
export const getOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
})
export const orderReset = (): IIOrderResetAction => ({
  type: ORDER_RESET
})

export const makeOrder: AppThunk = (ingredientsIdArr: ReadonlyArray<string>) => {
    return function(dispatch: AppDispatch) {
        dispatch(getOrderRequest())
        fetch(`${_apiUrl}/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({
              "ingredients": ingredientsIdArr
            })
        }).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            dispatch(getOrderFailed())
          }
        }).then(response => {
          dispatch(getOrderSuccess(response.order))
          dispatch(resetConstructor())
          }).catch(err => {
            console.log(err);
          })
    }
}