import { resetPassword as resetPasswordAction, resetEmail } from './user';

import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED ,
    SET_EMAILCODE,
    RESET_EMAILCODE
} from '../constants/reset-password';

import { AppDispatch } from '../types';
import { TMessageResetPassword } from '../types/data';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface ISendEmailRequest {
    readonly type: typeof SEND_EMAIL_REQUEST;
}
export interface ISendEmailSuccess {
    readonly type: typeof SEND_EMAIL_SUCCESS;
    payload: TMessageResetPassword
}
export interface ISendEmailFailed {
    readonly type: typeof SEND_EMAIL_FAILED;
}
export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    payload: TMessageResetPassword
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface ISetEmailCode {
    readonly type: typeof SET_EMAILCODE;
    payload: string
}
export interface IResetEmailCode {
    readonly type: typeof RESET_EMAILCODE;
}

export type TResetPasswordActions = 
    | ISendEmailRequest
    | ISendEmailSuccess
    | ISendEmailFailed
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed
    | ISetEmailCode
    | IResetEmailCode
;

export const sendEmailRequest = (): ISendEmailRequest => ({
    type: SEND_EMAIL_REQUEST
})
export const sendEmailSuccess = (email: TMessageResetPassword): ISendEmailSuccess => ({
    type: SEND_EMAIL_SUCCESS,
    payload: email
})
export const sendEmailFailed = (): ISendEmailFailed => ({
    type: SEND_EMAIL_FAILED
})
export const resetPasswordRequest = (): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST
})
export const resetPasswordSuccess = (password: TMessageResetPassword): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: password
})
export const resetPasswordFailed = (): IResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED
})
export const setEmailCode = (code: string): ISetEmailCode => ({
    type: SET_EMAILCODE,
    payload: code
})
export const resetEmailCode = (): IResetEmailCode => ({
    type: RESET_EMAILCODE
})

export function sendEmailForResetPass(email: string) {
    return function(dispatch: any) {
        dispatch(sendEmailRequest());
        fetch(`${_apiUrl}/password-reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              "email": email
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch(sendEmailFailed())
            }
        }).then(response => {
            if (response.success) {
                dispatch(sendEmailSuccess(response))
                dispatch(resetEmail())
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function resetPassword(newPassword: string, emailCode: string) {
    return function(dispatch: any) {
        dispatch(resetPasswordRequest())
        fetch(`${_apiUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "password": newPassword,
                "token": emailCode
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch(resetPasswordFailed())
            }
        }).then(response => {
            if (response.success) {
                dispatch(resetPasswordSuccess(response))
                dispatch(resetEmailCode())
                dispatch(resetPasswordAction())
            }
        }).catch(err => {
            console.log(err);
        })
    }
}