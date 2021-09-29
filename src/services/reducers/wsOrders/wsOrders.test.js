import reducer, { initialState } from './wsOrders';
import * as types from '../../constants/wsOrders';

describe('wsOrder reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            wsAllOrdersConnect: false,
            allOrders: null,
            wsUserOrdersConnect: false,
            userOrders: null
        })
    })

    it('should handle WS_ALL_ORDERS_CONNECTION_SUCCESS', () => {
        expect(reducer(initialState, { type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsAllOrdersConnect: true
        })
    })

    it('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        expect(reducer(initialState, { type: types.WS_USER_ORDERS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsUserOrdersConnect: true
        })
    })

    it('should handle WS_ALL_ORDERS_GET_MESSAGE', () => {
        const action = {
            type: types.WS_ALL_ORDERS_GET_MESSAGE,
            payload: [0, 1, 2]
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            allOrders: action.payload
        })
    })

    it('should handle WS_USER_ORDERS_GET_MESSAGE', () => {
        const action = {
            type: types.WS_USER_ORDERS_GET_MESSAGE,
            payload: [0, 1, 2]
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            userOrders: action.payload
        })
    })
});