import { getCookie } from '../../utils/cookies';
import { resetConstructor } from '../actions/ingredients'

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../constants/order';

import { AppDispatch } from '../types';
import { TOrder } from '../types/data';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: TOrder
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IOrderReset {
  readonly type: typeof ORDER_RESET;
}

export type TOrderActions = 
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IOrderReset
;

export const getOrderRequest = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST
})
export const getOrderSuccess = (order: TOrder): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  payload: order
})
export const getOrderFailed = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})
export const orderReset = (): IOrderReset => ({
  type: ORDER_RESET
})

export function makeOrder(ingredientsIdArr: ReadonlyArray<string>) {
    return function(dispatch: any) {
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