import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

import {
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_NAME,
    RESET_NAME,
    USER_INFO
} from '../constants/user';

import { AppDispatch } from "../types";
import { TUserInfo } from "../types/data";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface ISetUserRequest {
    readonly type: typeof SET_USER_REQUEST;
}
export interface ISetUserSuccess {
    readonly type: typeof SET_USER_SUCCESS;
    payload: null | TUserInfo
}
export interface ISetUserFailed {
    readonly type: typeof SET_USER_FAILED;
}
export interface ISetEmail {
    readonly type: typeof SET_EMAIL;
    payload: string
}
export interface IResetEmail {
    readonly type: typeof RESET_EMAIL;
}
export interface ISetPassword {
    readonly type: typeof SET_PASSWORD;
    payload: string
}
export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}
export interface ISetName {
    readonly type: typeof SET_NAME;
    payload: string
}
export interface IResetName {
    readonly type: typeof RESET_NAME;
}
export interface IUserInfo {
    readonly type: typeof USER_INFO;
}

export type TUserActions = 
    | ISetUserRequest
    | ISetUserSuccess
    | ISetUserFailed
    | ISetEmail
    | IResetEmail
    | ISetPassword
    | IResetPassword
    | ISetName
    | IResetName
    | IUserInfo
;

export const setUserRequest = (): ISetUserRequest => ({
    type: SET_USER_REQUEST
})
export const setUserSuccess = (user: null |TUserInfo): ISetUserSuccess => ({
    type: SET_USER_SUCCESS,
    payload: user
})
export const setUserFailed = (): ISetUserFailed => ({
    type: SET_USER_FAILED
})
export const setEmail = (email: string): ISetEmail => ({
    type: SET_EMAIL,
    payload: email
})
export const resetEmail = (): IResetEmail => ({
    type: RESET_EMAIL
})
export const setPassword = (password: string): ISetPassword => ({
    type: SET_PASSWORD,
    payload: password
})
export const resetPassword = (): IResetPassword => ({
    type: RESET_PASSWORD
})
export const setName = (name: string): ISetName => ({
    type: SET_NAME,
    payload: name
})
export const resetName = (): IResetName => ({
    type: RESET_NAME
})
export const userInfo = (): IUserInfo => ({
    type: USER_INFO
})

function updateAccessToken() {
    return fetch(`${_apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }).then(response => {
        return response.json();
    })
}

function userInfoFetch() {
    return fetch(`${_apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             Authorization: 'Bearer ' + getCookie('accessToken')
        }
    }).then(response => {
        return response.json()
    })
}

function updateUserInfoFetch(userObj: any) {
    return fetch(`${_apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(userObj)
    }).then(response => {
        return response.json()
    })
}

export function getUserInfo() {
    return function(dispatch: any) {
        dispatch(setUserRequest());
        userInfoFetch().then(response => {
            if (response.success) {
                dispatch(setUserSuccess(response.user))
                dispatch(setName(response.user.name))
                dispatch(setEmail(response.user.email))
            } else {
                dispatch(setUserFailed())
                if (response.message === 'jwt expired') {
                    updateAccessToken().then(data => {
                        if (data.success) {
                            const accessToken = data.accessToken.split('Bearer ')[1];
                            const refreshToken = data.refreshToken;

                            setCookie('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken)

                            userInfoFetch().then(response => {
                                dispatch(setUserSuccess(response.user))
                                dispatch(setName(response.user.name))
                                dispatch(setEmail(response.user.email))
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function updateUserInfo(userObj: any) {
    return function(dispatch: any) {
        dispatch(setUserRequest());
        updateUserInfoFetch(userObj).then(response => {
            if (response.success) {
                dispatch(setUserSuccess(response.user))
                dispatch(setName(response.user.name))
                dispatch(setEmail(response.user.email))
            } else {
                dispatch({ type: SET_USER_FAILED })
                if (response.message === 'jwt expired') {
                    updateAccessToken().then(data => {
                        if (data.success) {
                            const accessToken = data.accessToken.split('Bearer ')[1];
                            const refreshToken = data.refreshToken;

                            setCookie('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken)

                            updateUserInfoFetch(userObj).then(response => {
                                dispatch(setUserSuccess(response.user))
                                dispatch(setName(response.user.name))
                                dispatch(setEmail(response.user.email))
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userRegister(name: string, email: string, password: string) {
    return function(dispatch: any) {
        dispatch(setUserRequest());
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
                dispatch(setUserFailed())
            }
        }).then(response => {
            if (response.success) {
                dispatch(setUserSuccess(response.user))
                dispatch(resetEmail())
                dispatch(resetPassword())
                dispatch(resetName())

                const accessToken = response.accessToken.split('Bearer ')[1];
                const refreshToken = response.refreshToken;

                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
            } else {
                dispatch(setUserFailed())
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogin(email: string, password: string) {
    return function(dispatch: any) {
        dispatch(setUserRequest());
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
                dispatch(setUserFailed())
            }
        }).then(response => {
            if (response.success) {
                dispatch(setUserSuccess(response.user))
                dispatch(resetEmail())
                dispatch(resetPassword())

                dispatch(setName(response.user.name))
                dispatch(setEmail(response.user.email))

                const accessToken = response.accessToken.split('Bearer ')[1];
                const refreshToken = response.refreshToken;

                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
            } else {
                dispatch(setUserFailed())
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogout(token: string) {
    return function(dispatch: any) {
        dispatch(setUserRequest());
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
                dispatch(setUserFailed())
            }
        }).then(response => {
            if (response.success) {
                dispatch(setUserSuccess(null))
                localStorage.removeItem('refreshToken')
                deleteCookie('accessToken')
            } else {
                dispatch(setUserFailed())
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

