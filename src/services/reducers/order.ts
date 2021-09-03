import { 
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    ORDER_RESET
} from '../constants/order';

import { TOrderActions } from '../actions/order';
import { TOrder } from '../types/data';

type TOrderState = {
    order: null | TOrder;
    orderRequest: boolean;
    orderFiled: boolean;
    // orderInfo: null | TOrder
}

export const initialState: TOrderState = {
    order: null,
    orderRequest: false,
    orderFiled: false,
    // orderInfo: null
}

export default function orderReducer(state = initialState, action: TOrderActions): TOrderState {
    switch(action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                order: action.payload
            }
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderFiled: true
            }
        case ORDER_RESET:
            return {
                ...state,
                order: null
            }
        default: {
            return state
        }
            
    }
}