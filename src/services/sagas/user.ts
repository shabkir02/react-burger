import { call, select, takeEvery, put } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";
import { getUserInfoRequest, resetEmail, updateUserInfoRequest, getUserInfoFailed, resetPassword, setEmail, setName, getUserInfoSuccess, resetName, updateUserInfoFailed } from "../actions/user";
import { _apiUrl } from "../constants";
import { GET_USER_INFO_REQUEST, UPDATE_USER_INFO_REQUEST, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from "../constants/user";
import { checkResponse } from "../../utils/apiHelper";

export function userLoginFetch(email: string, password: string) {
    return fetch(`${_apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(checkResponse)
}

export function userLogoutFetch() {
    return fetch(`${_apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "token": localStorage.getItem('refreshToken')
        })
    }).then(checkResponse)
}

export function getUserInfoFetch() {
    return fetch(`${_apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             Authorization: 'Bearer ' + getCookie('accessToken')
        }
    }).then(checkResponse)
}

export function updateAccessTokenFetch() {
    return fetch(`${_apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }).then((response) => {
        return response.json();
    }).catch(error => {
        console.log(error);
    })
}

export function updateUserInfoFetch(email: string, name: string, password: string) {
    return fetch(`${_apiUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            email,
            name,
            password
        })
    }).then(checkResponse)
}

export function userRegisterFetch(name: string, email: string, password: string) {
    return fetch(`${_apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }).then(checkResponse)
}

export function* userLogin(): SagaIterator {
    try {
        const { email, password } = yield select((store) => ({
            email: store.user.email,
            password: store.user.password,
        }));

        const response = yield call(userLoginFetch, email, password);

        if (response.success) {
            yield put(getUserInfoSuccess(response.user))
            yield put(resetEmail())
            yield put(resetPassword())

            yield put(setName(response.user.name))
            yield put(setEmail(response.user.email))

            const accessToken = response.accessToken.split('Bearer ')[1];
            const refreshToken = response.refreshToken;

            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken)
        } else {
            yield put(getUserInfoFailed())
        }
    } catch(error) {
        yield put(getUserInfoFailed())
    }
}

export function* userLogout(): SagaIterator {
    try {
        const response = yield call(userLogoutFetch);

        if (response.success) {
            localStorage.removeItem('refreshToken')
            deleteCookie('accessToken')
            console.log(true);
            yield put(getUserInfoSuccess(null))
        } else {
            yield put(getUserInfoFailed())
        }
    } catch(error) {
        yield put(getUserInfoFailed())
    }
}

export function* getUserInfo(): SagaIterator {
    try {
        const response = yield call(getUserInfoFetch);

        if (response.success) {
            yield put(getUserInfoSuccess(response.user))
            yield put(setName(response.user.name))
            yield put(setEmail(response.user.email))
        }
    } catch(error: any) {
        if (error?.message === 'jwt expired') {
            const data = yield call(updateAccessTokenFetch);
            
            if (data.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
                
                yield put(getUserInfoRequest())
            } else {
                yield put(getUserInfoFailed())
            }
            return
        }
        yield put(getUserInfoFailed())
    }
}

export function* updateUserInfo(): SagaIterator {
    try {
        const { email, name, password } = yield select(store => ({
            email: store.user.email,
            name: store.user.name,
            password: store.user.password
        }))

        const response = yield call(updateUserInfoFetch, email, name, password)

        if (response.success) {
            yield put(getUserInfoSuccess(response.user))
            yield put(setName(response.user.name))
            yield put(setEmail(response.user.email))
        }
    } catch(error: any) {
        if (error?.message === 'jwt expired') {
            const data = yield call(updateAccessTokenFetch);
            
            if (data.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
                
                yield put(updateUserInfoRequest())
            }
            return
        }
        yield put(updateUserInfoFailed())
    }
}

export function* userRegister(): SagaIterator {
    try {
        const { email, name, password } = yield select(store => ({
            email: store.user.email,
            name: store.user.name,
            password: store.user.password
        }))

        const response = yield call(userRegisterFetch, email, name, password)

        if (response.success) {
            yield put(getUserInfoSuccess(response.user))
            yield put(resetEmail())
            yield put(resetPassword())
            yield put(resetName())

            const accessToken = response.accessToken.split('Bearer ')[1];
            const refreshToken = response.refreshToken;

            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken)
        }
    } catch(error) {
        yield put(getUserInfoFailed())
    }
}

export default function* userSaga() {
    yield takeEvery(USER_LOGIN_REQUEST, userLogin)
    yield takeEvery(USER_LOGOUT_REQUEST, userLogout)
    // yield takeEvery(UPDATE_USER_TOKEN_REQUEST, updateAccessToken)
    yield takeEvery(GET_USER_INFO_REQUEST, getUserInfo)
    yield takeEvery(UPDATE_USER_INFO_REQUEST, updateUserInfo)
    yield takeEvery(USER_REGISTER_REQUEST, userRegister)
}