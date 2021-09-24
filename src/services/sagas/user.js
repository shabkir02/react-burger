import { call, select, takeEvery, put } from "redux-saga/effects";
import { setCookie } from "../../utils/cookies";
import { resetEmail, resetPassword, setEmail, setName, setUserFailed, setUserSuccess } from "../actions/user";
import { SET_USER_REQUEST } from "../constants/reset-password";
import { _apiUrl } from "../constants";

export async function userLoginFetch(email, password) {
    return await fetch(`${_apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }).then(response => {
        return response.ok ? response.json() : response.json().then((error) => Promise.reject(error))
    })
}

export function* userLogin() {
    try {
        const { email, password } = yield select((store) => store.user);

        const response = yield call(userLoginFetch, email, password);

        if (response.success) {
            yield put(setUserSuccess(response.user))
            yield put(resetEmail())
            yield put(resetPassword())

            yield put(setName(response.user.name))
            yield put(setEmail(response.user.email))

            const accessToken = response.accessToken.split('Bearer ')[1];
            const refreshToken = response.refreshToken;

            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken)
        } else {
            yield put(setUserFailed())
        }
    } catch(e) {
        yield put(setUserFailed())
    }
}

export default function* userSaga() {
    yield takeEvery(SET_USER_REQUEST, userLogin)
}