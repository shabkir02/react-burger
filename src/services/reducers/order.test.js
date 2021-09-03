import reducer, { initialState } from './order';
import * as types from '../constants/order'

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            order: null,
            orderRequest: false,
            orderFiled: false,
        })
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(reducer(initialState, { type: types.GET_ORDER_REQUEST })).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(reducer(initialState, { type: types.GET_ORDER_FAILED })).toEqual({
            ...initialState,
            orderRequest: false,
            orderFiled: true
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        const action = {
            type: types.GET_ORDER_SUCCESS,
            payload: [0, 1, 2]
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            orderRequest: false,
            orderFiled: false,
            order: action.payload
        })
    })
}) 