import { 
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    ORDER_RESET,
} from '../actions';

const initialState = {
    order: null,
    orderRequest: false,
    orderFiled: false,
}

export const orderReducer = (state = initialState, action) => {
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