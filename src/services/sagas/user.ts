import { call, select, takeEvery, put } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import * as userActions from '../actions/user/user';
import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";
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

        const accessToken = response.accessToken.split('Bearer ')[1];
        const refreshToken = response.refreshToken;

        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        yield put(userActions.getUserInfoSuccess(response.user))
        yield put(userActions.resetInputs())

        yield put(userActions.setName(response.user.name))
        yield put(userActions.setEmail(response.user.email))
    } catch(error) {
        yield put(userActions.userLoginFailed())
    }
}

export function* userLogout(): SagaIterator {
    try {
        const response = yield call(userLogoutFetch);
        
        localStorage.removeItem('refreshToken')
        deleteCookie('accessToken')
        yield put(userActions.getUserInfoSuccess(null));
    } catch(error) {
        yield put(userActions.userLogoutFailed())
    }
}

export function* getUserInfo(): SagaIterator {
    try {
        const response = yield call(getUserInfoFetch);

        yield put(userActions.getUserInfoSuccess(response.user))
        yield put(userActions.setName(response.user.name))
        yield put(userActions.setEmail(response.user.email))
    } catch(error: any) {
        if (error?.message === 'jwt expired') {
            const data = yield call(updateAccessTokenFetch);
            
            if (data?.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
                
                yield put(userActions.getUserInfoRequest())
            } else {
                yield put(userActions.getUserInfoFailed())
            }
            return
        }
        yield put(userActions.getUserInfoFailed())
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

        yield put(userActions.getUserInfoSuccess(response.user))
        yield put(userActions.setName(response.user.name))
        yield put(userActions.setEmail(response.user.email))
    } catch(error: any) {
        if (error?.message === 'jwt expired') {
            const data = yield call(updateAccessTokenFetch);
            
            if (data?.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
                
                yield put(userActions.updateUserInfoRequest())
            } else {
                yield put(userActions.updateUserInfoFailed())
            }
            return
        }
        yield put(userActions.updateUserInfoFailed())
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

        yield put(userActions.getUserInfoSuccess(response.user))
        yield put(userActions.resetInputs());

        const accessToken = response.accessToken.split('Bearer ')[1];
        const refreshToken = response.refreshToken;

        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken)
    } catch(error) {
        yield put(userActions.userRegisterFailed())
    }
}

export default function* userSaga() {
    yield takeEvery(USER_LOGIN_REQUEST, userLogin);
    yield takeEvery(USER_LOGOUT_REQUEST, userLogout);
    yield takeEvery(GET_USER_INFO_REQUEST, getUserInfo);
    yield takeEvery(UPDATE_USER_INFO_REQUEST, updateUserInfo);
    yield takeEvery(USER_REGISTER_REQUEST, userRegister);
}