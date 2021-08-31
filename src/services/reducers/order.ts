import { 
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    ORDER_RESET
} from '../constants/order';

import { TOrderActions } from '../actions/order';

type TOrderState = {
    order: null | any;
    orderRequest: boolean;
    orderFiled: boolean;

    allOrders: null | any;
    allOrdersFailed: boolean;

    orderInfo: null | any
}

const initialState: TOrderState = {
    order: null,
    orderRequest: false,
    orderFiled: false,

    allOrders: null,
    allOrdersFailed: false,

    orderInfo: null
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
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