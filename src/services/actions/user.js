import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const SET_EMAIL = "SET_EMAIL";
export const RESET_EMAIL = "RESET_EMAIL";

export const SET_PASSWORD = "SET_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const SET_NAME = "SET_NAME";
export const RESET_NAME = "RESET_NAME"

export const USER_INFO = "USER_INFO";

const _apiUrl = 'https://norma.nomoreparties.space/api';

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

function updateUserInfoFetch(userObj) {
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
    return function(dispatch) {
        dispatch({ type: SET_USER_REQUEST});
        userInfoFetch().then(response => {
            if (response.success) {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: response.user
                })
                dispatch({
                    type: SET_NAME,
                    payload: response.user.name
                })
                dispatch({
                    type: SET_EMAIL,
                    payload: response.user.email
                })
            } else {
                dispatch({ type: SET_USER_FAILED })
                if (response.message === 'jwt expired') {
                    updateAccessToken().then(data => {
                        if (data.success) {
                            const accessToken = data.accessToken.split('Bearer ')[1];
                            const refreshToken = data.refreshToken;

                            setCookie('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken)

                            userInfoFetch().then(response => {
                                dispatch({
                                    type: SET_USER_SUCCESS,
                                    payload: response.user
                                })
                                dispatch({
                                    type: SET_NAME,
                                    payload: response.user.name
                                })
                                dispatch({
                                    type: SET_EMAIL,
                                    payload: response.user.email
                                })
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

export function updateUserInfo(userObj) {
    return function(dispatch) {
        dispatch({ type: SET_USER_REQUEST});
        updateUserInfoFetch(userObj).then(response => {
            if (response.success) {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: response.user
                })
                dispatch({
                    type: SET_NAME,
                    payload: response.user.name
                })
                dispatch({
                    type: SET_EMAIL,
                    payload: response.user.email
                })
            } else {
                dispatch({ type: SET_USER_FAILED })
                if (response.message === 'jwt expired') {
                    updateAccessToken().then(data => {
                        if (data.success) {
                            const accessToken = data.accessToken.split('Bearer ')[1];
                            const refreshToken = data.refreshToken;

                            setCookie('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken)

                            userInfoFetch().then(response => {
                                dispatch({
                                    type: SET_USER_SUCCESS,
                                    payload: response.user
                                })
                                dispatch({
                                    type: SET_NAME,
                                    payload: response.user.name
                                })
                                dispatch({
                                    type: SET_EMAIL,
                                    payload: response.user.email
                                })
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

export function userRegister(name, email, password) {
    return function(dispatch) {
        dispatch({
            type: SET_USER_REQUEST
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
                    type: SET_USER_FAILED
                })
            }
        }).then(response => {
            if (response.success) {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: response.user
                })
                dispatch({ type: RESET_EMAIL })
                dispatch({ type: RESET_PASSWORD })
                dispatch({ type: RESET_NAME })

                const accessToken = response.accessToken.split('Bearer ')[1];
                const refreshToken = response.refreshToken;

                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
            } else {
                dispatch({
                    type: SET_USER_FAILED
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogin(email, password) {
    return function(dispatch) {
        dispatch({
            type: SET_USER_REQUEST
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
                    type: SET_USER_FAILED
                })
            }
        }).then(response => {
            if (response.success) {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: response.user
                })
                dispatch({ type: RESET_EMAIL })
                dispatch({ type: RESET_PASSWORD })

                dispatch({
                    type: SET_NAME,
                    payload: response.user.name
                })
                dispatch({
                    type: SET_EMAIL,
                    payload: response.user.email
                })

                const accessToken = response.accessToken.split('Bearer ')[1];
                const refreshToken = response.refreshToken;

                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
            } else {
                dispatch({
                    type: SET_USER_FAILED
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export function userLogout(token) {
    return function(dispatch) {
        dispatch({
            type: SET_USER_REQUEST
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
                    type: SET_USER_FAILED
                })
            }
        }).then(response => {
            if (response.success) {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: null
                })
                localStorage.removeItem('refreshToken')
                deleteCookie('accessToken')
            } else {
                dispatch({
                    type: SET_USER_FAILED
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

