import reducer, { initialState } from './reset-password'
import * as types from '../../constants/reset-password'

describe('reset-password reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            sendEmailSuccess: null,
            sendEmailRequest: false,
            sendEmailFailed: false,

            resetPasswordRequest: false,
            resetPasswordSuccess: null,
            resetPasswordFailed: false,
            
            emailCode: ''
        })
    })
    
    it('should handle SEND_EMAIL_REQUEST', () => {
        expect(reducer(initialState, { type: types.SEND_EMAIL_REQUEST })).toEqual({
            ...initialState,
            sendEmailRequest: true
        })
    })

    it('should handle SEND_EMAIL_FAILED', () => {
        expect(reducer(initialState, { type: types.SEND_EMAIL_FAILED })).toEqual({
            ...initialState,
            sendEmailRequest: false,
            sendEmailFailed: true
        })
    })

    it('should handle SEND_EMAIL_SUCCESS', () => {
        const action = {
            type: types.SEND_EMAIL_SUCCESS,
            payload: { email: true }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            sendEmailSuccess: action.payload,
            sendEmailRequest: false,
            sendEmailFailed: false
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(reducer(initialState, { type: types.RESET_PASSWORD_REQUEST })).toEqual({
            ...initialState,
            resetPasswordRequest: true
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(reducer(initialState, { type: types.RESET_PASSWORD_FAILED })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: types.RESET_PASSWORD_SUCCESS,
            payload: { password: true }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordSuccess: action.payload,
            resetPasswordFailed: false,
        })
    })

    it('should handle SET_EMAILCODE', () => {
        const action = {
            type: types.SET_EMAILCODE,
            payload: 'email'
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            emailCode: action.payload
        })
    })

    it('should handle RESET_EMAILCODE', () => {
        const action = {
            type: types.RESET_EMAILCODE,
            payload: 'email'
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            emailCode: ''
        })
    })
}) 