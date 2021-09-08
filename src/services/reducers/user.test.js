import reducer, { initialState } from './user';
import * as types from '../constants/user'

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            userReguest: false,
            userFailed: false,
            user: null,
            name: '',
            email: '',
            password: '',
        })
    })

    it('should handle SET_USER_REQUEST', () => {
        expect(reducer(initialState, { type: types.SET_USER_REQUEST })).toEqual({
            ...initialState,
            userReguest: true
        })
    })

    it('should handle SET_USER_FAILED', () => {
        expect(reducer(initialState, { type: types.SET_USER_FAILED })).toEqual({
            ...initialState,
            userReguest: false,
            userFailed: true,
        })
    })

    it('should handle SET_USER_SUCCESS', () => {
        const action = {
            type: types.SET_USER_SUCCESS,
            payload: { user: true }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            userReguest: false,
            userFailed: false,
            user: action.payload
        })
    })

    it('should handle RESET_EMAIL', () => {
        expect(reducer(initialState, { type: types.RESET_EMAIL })).toEqual({
            ...initialState,
            email: ''
        })
    })

    it('should handle RESET_PASSWORD', () => {
        expect(reducer(initialState, { type: types.RESET_PASSWORD })).toEqual({
            ...initialState,
            password: ''
        })
    })

    it('should handle RESET_NAME', () => {
        expect(reducer(initialState, { type: types.RESET_NAME })).toEqual({
            ...initialState,
            name: ''
        })
    })

    it('should handle SET_EMAIL', () => {
        const action = {
            type: types.SET_EMAIL,
            payload: 'email'
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            email: action.payload
        })
    })

    it('should handle SET_NAME', () => {
        const action = {
            type: types.SET_NAME,
            payload: 'name'
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            name: 'name'
        })
    })

    it('should handle SET_PASSWORD', () => {
        const action = {
            type: types.SET_PASSWORD,
            payload: 'password'
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            password: action.payload
        })
    })
}) 