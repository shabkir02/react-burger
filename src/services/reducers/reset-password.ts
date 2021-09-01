import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    SET_EMAILCODE,
    RESET_EMAILCODE
} from '../constants/reset-password';

import { TResetPasswordActions } from '../actions/reset-password';

type TResetPasswordState = {
    sendEmailSuccess: null | any;
    sendEmailRequest: boolean;
    sendEmailFailed: boolean;

    resetPasswordRequest: boolean;
    resetPasswordSuccess: null | any;
    resetPasswordFailed: boolean;
    
    emailCode: string
}

const initialState: TResetPasswordState = {
    sendEmailSuccess: null,
    sendEmailRequest: false,
    sendEmailFailed: false,

    resetPasswordRequest: false,
    resetPasswordSuccess: null,
    resetPasswordFailed: false,
    
    emailCode: ''
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions ): TResetPasswordState => {
    switch(action.type) {
        case SEND_EMAIL_REQUEST:
            return {
                ...state,
                sendEmailRequest: true
            }
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                sendEmailSuccess: action.payload,
                sendEmailRequest: false,
                sendEmailFailed: false
            }
        case SEND_EMAIL_FAILED:
            return {
                ...state,
                sendEmailFailed: true,
                sendEmailRequest: false
            }
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordRequest: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: action.payload
            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            }
        case SET_EMAILCODE:
            return {
                ...state,
                emailCode: action.payload
            }
        case RESET_EMAILCODE:
            return {
                ...state,
                emailCode: ''
            }
        default:
            return state
    }
}