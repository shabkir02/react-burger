import { 
    SET_MODAL_INNER_INGREDIENT_DETAILS,
    SET_MODAL_INNER_ORDER_DETAILS,
    SET_MODAL_INNER_ORDER_INFO,
    SET_CURRENT_INGREDIENT,
    SET_CURRENT_ORDER_INFO
} from '../constants/modal';

import { TIngredientConstructor, TIngredient, TModalInner, TOrderInfo } from '../types/data'
import { TModalActions } from '../actions/modal';

type TModalState = {
    ingredientsConstructor: null | Array<TIngredientConstructor>,
    currentIngredient: null | TIngredient,
    currentOrderInfo: null | TOrderInfo,
    modalInner: null | TModalInner
}

export const initialState: TModalState = {
    ingredientsConstructor: null,
    currentIngredient: null,
    currentOrderInfo: null,
    modalInner: null
}

export default function modalReducer(state = initialState, action: TModalActions): TModalState {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload
            }
        case SET_CURRENT_ORDER_INFO:
            return {
                ...state,
                currentOrderInfo: action.payload
            }
        case SET_MODAL_INNER_INGREDIENT_DETAILS:
            return {
                ...state,
                modalInner: {
                    title: 'Детали ингредиента',
                    type: "ingredientDetails"
                }
            }
        case SET_MODAL_INNER_ORDER_DETAILS:
            return {
                ...state,
                modalInner: {
                    title: null,
                    type: 'orderDetails'
                }
            }
        case SET_MODAL_INNER_ORDER_INFO:
            return {
                ...state,
                modalInner: {
                    title: action.payload,
                    type: 'orderInfo'
                }
            }
        default: {
            return state
        }
            
    }
}