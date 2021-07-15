export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILED = "USER_LOGOUT_FAILED";

export const SET_EMAIL = "SET_EMAIL";
export const RESET_EMAIL = "RESET_EMAIL";

export const SET_PASSWORD = "SET_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const SET_NAME = "SET_NAME";
export const RESET_NAME = "RESET_NAME"

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export function userRegister(name, email, password) {
    return function(dispatch) {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
        fetch(`${_apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({
                    type: USER_REGISTER_FAILED
                })
            }
        }).then(response => {
            console.log(response);
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: response
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogin(email, password) {
    return function(dispatch) {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        fetch(`${_apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({
                    type: USER_LOGIN_FAILED
                })
            }
        }).then(response => {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogout(token) {
    return function(dispatch) {
        dispatch({
            type: USER_LOGOUT_REQUEST
        });
        fetch(`${_apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": token
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({
                    type: USER_LOGOUT_FAILED
                })
            }
        }).then(response => {
            dispatch({
                type: USER_LOGOUT_SUCCESS,
                payload: response
            })
        }).catch(err => {
            console.log(err);
        })
    }
}