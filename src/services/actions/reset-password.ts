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

import { AppDispatch, AppThunk } from '../types';
import { TMessageResetPassword } from '../types/data';

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface ISendEmailRequestAction {
    readonly type: typeof SEND_EMAIL_REQUEST;
}
export interface ISendEmailSuccessAction {
    readonly type: typeof SEND_EMAIL_SUCCESS;
    payload: TMessageResetPassword
}
export interface ISendEmailFailedAction {
    readonly type: typeof SEND_EMAIL_FAILED;
}
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    payload: TMessageResetPassword
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface ISetEmailCodeAction {
    readonly type: typeof SET_EMAILCODE;
    payload: string
}
export interface IResetEmailCodeAction {
    readonly type: typeof RESET_EMAILCODE;
}

export type TResetPasswordActions = 
    | ISendEmailRequestAction
    | ISendEmailSuccessAction
    | ISendEmailFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | ISetEmailCodeAction
    | IResetEmailCodeAction
;

export const sendEmailRequest = (): ISendEmailRequestAction => ({
    type: SEND_EMAIL_REQUEST
})
export const sendEmailSuccess = (email: TMessageResetPassword): ISendEmailSuccessAction => ({
    type: SEND_EMAIL_SUCCESS,
    payload: email
})
export const sendEmailFailed = (): ISendEmailFailedAction => ({
    type: SEND_EMAIL_FAILED
})
export const resetPasswordRequest = (): IResetPasswordRequestAction => ({
    type: RESET_PASSWORD_REQUEST
})
export const resetPasswordSuccess = (password: TMessageResetPassword): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: password
})
export const resetPasswordFailed = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
})
export const setEmailCode = (code: string): ISetEmailCodeAction => ({
    type: SET_EMAILCODE,
    payload: code
})
export const resetEmailCode = (): IResetEmailCodeAction => ({
    type: RESET_EMAILCODE
})

export const sendEmailForResetPass: AppThunk = (email: string) => {
    return function(dispatch: AppDispatch) {
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

export const  resetPassword: AppThunk = (newPassword: string, emailCode: string) => {
    return function(dispatch: AppDispatch) {
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