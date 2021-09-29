import {
    SET_MODAL_INNER_INGREDIENT_DETAILS,
    SET_MODAL_INNER_ORDER_DETAILS,
    SET_CURRENT_INGREDIENT,
    SET_MODAL_INNER_ORDER_INFO,
    SET_CURRENT_ORDER_INFO
} from '../../constants/modal';

import { TIngredient, TOrderInfo } from '../../types/data';

export interface ISetModalInnerIngredientsDetailsAction {
    readonly type: typeof SET_MODAL_INNER_INGREDIENT_DETAILS;
}
export interface ISetModalInnerOrderDetailsAction {
    readonly type: typeof SET_MODAL_INNER_ORDER_DETAILS;
}
export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    payload: TIngredient
}
export interface ISetModalInnerOrderInfoAction {
    readonly type: typeof SET_MODAL_INNER_ORDER_INFO;
    payload: string;
}
export interface ISetCurrentOrderInfoAction {
    readonly type: typeof SET_CURRENT_ORDER_INFO;
    payload: TOrderInfo
}

export type TModalActions = 
    | ISetModalInnerIngredientsDetailsAction
    | ISetModalInnerOrderDetailsAction
    | ISetCurrentIngredientAction
    | ISetModalInnerOrderInfoAction
    | ISetCurrentOrderInfoAction
;

export const setModalInnerIngredientsDetails = (): ISetModalInnerIngredientsDetailsAction => ({
    type: SET_MODAL_INNER_INGREDIENT_DETAILS
})
export const setModalInnerOrderDetails = (): ISetModalInnerOrderDetailsAction => ({
    type: SET_MODAL_INNER_ORDER_DETAILS
})
export const setModalInnerOrderInfo = (orderNumber: string): ISetModalInnerOrderInfoAction => ({
    type: SET_MODAL_INNER_ORDER_INFO,
    payload: orderNumber
})
export const setCurrentIngredient = (ingredient: TIngredient): ISetCurrentIngredientAction => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient
})
export const setCurrentOrderInfo = (order: TOrderInfo): ISetCurrentOrderInfoAction => ({
    type: SET_CURRENT_ORDER_INFO,
    payload: order
})


