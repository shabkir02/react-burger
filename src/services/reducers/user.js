import {
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_NAME,
    RESET_NAME,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILED 
} from '../actions';

const initialState = {
    userReguest: false,
    userFailed: false,
    user: null,

    name: '',
    email: '',
    password: '',

    userOrders: null,
    userOrdersFailed: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_ORDERS_SUCCESS: 
            return {
                ...state,
                userOrders: action.payload,
                userOrdersFailed: false
            }
        case GET_USER_ORDERS_FAILED: 
            return {
                ...state,
                userOrders: action.payload,
                userOrdersFailed: true
            }
        case SET_USER_REQUEST:
            return {
                ...state,
                userReguest: true
            }
        case SET_USER_SUCCESS:
            return {
                ...state,
                userReguest: false,
                userFailed: false,
                user: action.payload
            }
        case SET_USER_FAILED:
            return {
                ...state,
                userReguest: false,
                userFailed: true,
                user: null,
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case RESET_EMAIL:
            return {
                ...state,
                email: ''
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case RESET_PASSWORD:
            return {
                ...state,
                password: ''
            }
        case SET_NAME: 
            return {
                ...state,
                name: action.payload
            }
        case RESET_NAME:
            return {
                ...state,
                name: ''
            }
        default: 
            return state
    }
}