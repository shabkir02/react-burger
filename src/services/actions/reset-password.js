import { RESET_PASSWORD, RESET_EMAIL } from './index';

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const SET_EMAILCODE = "SET_EMAILCODE";
export const RESET_EMAILCODE = "RESET_EMAILCODE";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export function sendEmailForResetPass(email) {
    return function(dispatch) {
        dispatch({
            type: SEND_EMAIL_REQUEST
        });
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
                dispatch({
                    type: SEND_EMAIL_FAILED
                })
            }
        }).then(response => {
            if (response.success) {
                dispatch({
                    type: SEND_EMAIL_SUCCESS,
                    payload: response
                })
                dispatch({
                    type: RESET_EMAIL
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function resetPassword(newPassword, emailCode) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
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
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            }
        }).then(response => {
            if (response.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    payload: response
                })
                dispatch({ type: RESET_EMAILCODE })
                dispatch({ type: RESET_PASSWORD })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}