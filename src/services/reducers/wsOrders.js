import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS, 
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_SUCCESS, 
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE
} from '../actions';

const initialState = {
    wsAllOrdersConnect: false,
    allOrders: null,

    wsUserOrdersConnect: false,
    userOrders: null
  };
  
  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_ALL_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsAllOrdersConnect: true
            };
    
        case WS_ALL_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                wsAllOrdersConnect: false
            };
    
        case WS_ALL_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                wsAllOrdersConnect: false
            };
    
        case WS_ALL_ORDERS_GET_MESSAGE:
            return {
                ...state,
                allOrders: action.payload
            };

        case WS_USER_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsUserOrdersConnect: true
            };
    
        case WS_USER_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                wsUserOrdersConnect: false
            };
    
        case WS_USER_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                wsUserOrdersConnect: false
            };
    
        case WS_USER_ORDERS_GET_MESSAGE:
            return {
                ...state,
                userOrders: action.payload
            };
        default:
            return state;
    }
  };
  