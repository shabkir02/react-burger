import { getCookie } from '../../utils/cookies';
import { resetConstructor } from '../actions';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../constants/order';

import { AppDispatch } from '../types';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: any
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IOrderResett {
  readonly type: typeof ORDER_RESET;
}

export type TOrderActions = 
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IOrderResett
;

export const getOrderRequest = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST
})
export const getOrderSuccess = (order: any): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  payload: order
})
export const getOrderFailed = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})
export const resetOrder = (): IOrderResett => ({
  type: ORDER_RESET
})

export function makeOrder(ingredientsIdArr: any) {
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
          dispatch(getOrderSuccess(response))
          dispatch(resetConstructor())
          }).catch(err => {
            console.log(err);
          })
    }
}