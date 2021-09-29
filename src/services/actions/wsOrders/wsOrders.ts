import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED ,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_START
} from '../../constants/wsOrders';

import { TWsOrders } from '../../types/data';

export interface IWsAllOrdersConnectionSuccessAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_SUCCESS;
}
export interface IWsAllOrdersConnectionErrorAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_ERROR;
}
export interface IWsAllOrdersConnectionClosedAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_CLOSED;
}
export interface IWsAllOrdersGetMessageAction {
    readonly type: typeof WS_ALL_ORDERS_GET_MESSAGE;
    payload: TWsOrders
}
export interface IWsAllOrdersConnectionStartAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_START;
}
export interface IWsUserOrdersConnectionSuccessAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}
export interface IWsUserOrdersConnectionErrorAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}
export interface IWsUserOrdersConnectionClosedAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}
export interface IWsUserOrdersGetMessageAction {
    readonly type: typeof WS_USER_ORDERS_GET_MESSAGE;
    payload: TWsOrders
}
export interface IWsUserOrdersConnectionStartAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

export type TWsOrdersActions = 
    | IWsAllOrdersConnectionSuccessAction
    | IWsAllOrdersConnectionErrorAction
    | IWsAllOrdersConnectionClosedAction
    | IWsAllOrdersGetMessageAction
    | IWsAllOrdersConnectionStartAction
    | IWsUserOrdersConnectionSuccessAction
    | IWsUserOrdersConnectionErrorAction
    | IWsUserOrdersConnectionClosedAction
    | IWsUserOrdersGetMessageAction
    | IWsUserOrdersConnectionStartAction
;

export const wsAllOrdersConnectionSuccess = (): IWsAllOrdersConnectionSuccessAction => ({
    type: WS_ALL_ORDERS_CONNECTION_SUCCESS
})
export const wsAllOrdersConnectionError = (): IWsAllOrdersConnectionErrorAction => ({
    type: WS_ALL_ORDERS_CONNECTION_ERROR
})
export const wsAllOrdersConnectionClosed = (): IWsAllOrdersConnectionClosedAction => ({
    type: WS_ALL_ORDERS_CONNECTION_CLOSED
})
export const wsAllOrdersGetMessage = (orders: TWsOrders): IWsAllOrdersGetMessageAction => ({
    type: WS_ALL_ORDERS_GET_MESSAGE,
    payload: orders
})
export const wsAllOrdersConnectionStart = (): IWsAllOrdersConnectionStartAction => ({
    type: WS_ALL_ORDERS_CONNECTION_START
})
export const wsUserOrdersConnectionSuccess = (): IWsUserOrdersConnectionSuccessAction => ({
    type: WS_USER_ORDERS_CONNECTION_SUCCESS
})
export const wsUserOrdersConnectionError = (): IWsUserOrdersConnectionErrorAction => ({
    type: WS_USER_ORDERS_CONNECTION_ERROR
})
export const wsUserOrdersConnectionClosed = (): IWsUserOrdersConnectionClosedAction => ({
    type: WS_USER_ORDERS_CONNECTION_CLOSED
})
export const wsUserOrdersGetMessage = (orders: TWsOrders): IWsUserOrdersGetMessageAction => ({
    type: WS_USER_ORDERS_GET_MESSAGE,
    payload: orders
})
export const wsUserOrdersConnectionStart = (): IWsUserOrdersConnectionStartAction => ({
    type: WS_USER_ORDERS_CONNECTION_START
})