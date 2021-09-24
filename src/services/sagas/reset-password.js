import { call, takeEvery, put, select } from 'redux-saga/effects';
import { checkResponse } from '../../utils/apiHelper';
import { resetEmailCode, resetPasswordFailed, resetPasswordSuccess, sendEmailFailed, sendEmailSuccess } from '../actions/reset-password';
import { resetEmail, resetPassword } from '../actions/user';

import { _apiUrl } from '../constants';
import { RESET_PASSWORD_REQUEST, SEND_EMAIL_REQUEST } from '../constants/reset-password';

const sendEmailFetch = (email) => {
    return fetch(`${_apiUrl}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          email
        })
    }).then(checkResponse)
}

const resetUserPasswordFetch = (newPassword, emailCode) => {
    return fetch(`${_apiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password: newPassword,
            token: emailCode
        })
    }).then(checkResponse)
}

export function* sendEmail() {
    try {
        const email = yield select(store => store.user.email)
        const response = yield call(sendEmailFetch, email);
        
        if (response.success) {
            yield put(sendEmailSuccess(response))
            yield put(resetEmail())
        }
    } catch(error) {
        yield put(sendEmailFailed())
    }
}

export function* resetUserPassword() {
    try {
        const { emailCode, password } = yield select(store => ({
            password: store.user.password,
            emailCode: store.resetPassword.emailCode
        }))

        const response = yield call(resetUserPasswordFetch, password, emailCode);
        console.log(response);
        if (response.success) {
            yield put(resetPasswordSuccess(response))
            yield put(resetEmailCode())
            yield put(resetPassword())
        }
    } catch(error) {
        yield put(resetPasswordFailed())
    }
}

export default function* resetPasswordSaga() {
    yield takeEvery(RESET_PASSWORD_REQUEST, resetUserPassword)
    yield takeEvery(SEND_EMAIL_REQUEST, sendEmail)
}