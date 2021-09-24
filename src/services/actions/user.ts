import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

import {
    USER_LOGIN_REQUEST,
    USER_LOGOUT_REQUEST,
    UPDATE_USER_TOKEN_REQUEST,
    UPDATE_USER_INFO_REQUEST,
    USER_REGISTER_REQUEST,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,

    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_NAME,
    RESET_NAME,
    USER_INFO,
} from '../constants/user';

import { AppDispatch, AppThunk } from "../types";
import { TUser } from "../types/data";

const _apiUrl = 'https://norma.nomoreparties.space/api';

export interface IUserLoginRequest {
    readonly type: typeof USER_LOGIN_REQUEST
}
export interface IUserLogoutRequest {
    readonly type: typeof USER_LOGOUT_REQUEST
}
export interface IUpdateUserTokenReguest {
    readonly type: typeof UPDATE_USER_TOKEN_REQUEST
}
export interface IUserRegisterRequest {
    readonly type: typeof USER_REGISTER_REQUEST
}
export interface IUpdateUserInfoRequest {
    readonly type: typeof UPDATE_USER_INFO_REQUEST
}
export interface IGetUserInfoRequest {
    readonly type: typeof GET_USER_INFO_REQUEST
}
export interface IGetUserInfoSuccessAction {
    readonly type: typeof GET_USER_INFO_SUCCESS;
    payload: null | TUser
}
export interface IGetUserInfoFailedAction {
    readonly type: typeof GET_USER_INFO_FAILED;
}
export interface ISetEmailAction {
    readonly type: typeof SET_EMAIL;
    payload: string
}
export interface IResetEmailAction {
    readonly type: typeof RESET_EMAIL;
}
export interface ISetPasswordAction {
    readonly type: typeof SET_PASSWORD;
    payload: string
}
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}
export interface ISetNameAction {
    readonly type: typeof SET_NAME;
    payload: string
}
export interface IResetNameAction {
    readonly type: typeof RESET_NAME;
}
export interface IUserInfoAction {
    readonly type: typeof USER_INFO;
}

export type TUserActions = 
    | IGetUserInfoSuccessAction
    | IGetUserInfoFailedAction
    | ISetEmailAction
    | IResetEmailAction
    | ISetPasswordAction
    | IResetPasswordAction
    | ISetNameAction
    | IResetNameAction
    | IUserInfoAction

    | IUserLoginRequest
    | IUserLogoutRequest
    | IUpdateUserTokenReguest
    | IGetUserInfoRequest
    | IUpdateUserInfoRequest
    | IUserRegisterRequest
;

export const userLoginRequest = (): IUserLoginRequest => ({
    type: USER_LOGIN_REQUEST
})
export const userLogoutRequest = (): IUserLogoutRequest => ({
    type: USER_LOGOUT_REQUEST
})
export const updateUserTokenRequest = (): IUpdateUserTokenReguest => ({
    type: UPDATE_USER_TOKEN_REQUEST
})
export const updateUserInfoRequest = (): IUpdateUserInfoRequest => ({
    type: UPDATE_USER_INFO_REQUEST
})
export const userRegisterRequest = (): IUserRegisterRequest => ({
    type: USER_REGISTER_REQUEST
})
export const getUserInfoRequest = (): IGetUserInfoRequest => ({
    type: GET_USER_INFO_REQUEST
})
export const getUserInfoSuccess = (user: null | TUser): IGetUserInfoSuccessAction => ({
    type: GET_USER_INFO_SUCCESS,
    payload: user
})
export const getUserInfoFailed = (): IGetUserInfoFailedAction => ({
    type: GET_USER_INFO_FAILED
})
export const setEmail = (email: string): ISetEmailAction => ({
    type: SET_EMAIL,
    payload: email
})
export const resetEmail = (): IResetEmailAction => ({
    type: RESET_EMAIL
})
export const setPassword = (password: string): ISetPasswordAction => ({
    type: SET_PASSWORD,
    payload: password
})
export const resetPassword = (): IResetPasswordAction => ({
    type: RESET_PASSWORD
})
export const setName = (name: string): ISetNameAction => ({
    type: SET_NAME,
    payload: name
})
export const resetName = (): IResetNameAction => ({
    type: RESET_NAME
})
export const userInfo = (): IUserInfoAction => ({
    type: USER_INFO
})

// function updateAccessToken() {
//     return fetch(`${_apiUrl}/auth/token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             token: localStorage.getItem('refreshToken')
//         })
//     }).then(response => {
//         return response.json();
//     })
// }

// function userInfoFetch() {
//     return fetch(`${_apiUrl}/auth/user`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//              Authorization: 'Bearer ' + getCookie('accessToken')
//         }
//     }).then(response => {
//         return response.json()
//     })
// }

// function updateUserInfoFetch(userObj: TUser & { password: string }) {
//     return fetch(`${_apiUrl}/auth/user`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             Authorization: 'Bearer ' + getCookie('accessToken')
//         },
//         body: JSON.stringify(userObj)
//     }).then(response => {
//         return response.json()
//     })
// }

// export const getUserInfo: AppThunk = () => {
//     return function(dispatch: AppDispatch) {
//         dispatch(setUserRequest());
//         userInfoFetch().then(response => {
//             if (response.success) {
//                 dispatch(getUserInfoSuccess(response.user))
//                 dispatch(setName(response.user.name))
//                 dispatch(setEmail(response.user.email))
//             } else {
//                 dispatch(getUserInfoFailed())
//                 if (response.message === 'jwt expired') {
//                     updateAccessToken().then(data => {
//                         if (data.success) {
//                             const accessToken = data.accessToken.split('Bearer ')[1];
//                             const refreshToken = data.refreshToken;

//                             setCookie('accessToken', accessToken);
//                             localStorage.setItem('refreshToken', refreshToken)

//                             userInfoFetch().then(response => {
//                                 dispatch(getUserInfoSuccess(response.user))
//                                 dispatch(setName(response.user.name))
//                                 dispatch(setEmail(response.user.email))
//                             }).catch(err => {
//                                 console.log(err);
//                             })
//                         }
//                     })
//                 }
//             }
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }

// export const updateUserInfo: AppThunk = (userObj: TUser & { password: string }) => {
//     return function(dispatch: AppDispatch) {
//         dispatch(getUserInfoRequest());
//         updateUserInfoFetch(userObj).then(response => {
//             if (response.success) {
//                 dispatch(getUserInfoSuccess(response.user))
//                 dispatch(setName(response.user.name))
//                 dispatch(setEmail(response.user.email))
//             } else {
//                 dispatch(getUserInfoFailed())
//                 if (response.message === 'jwt expired') {
//                     updateAccessToken().then(data => {
//                         if (data.success) {
//                             const accessToken = data.accessToken.split('Bearer ')[1];
//                             const refreshToken = data.refreshToken;

//                             setCookie('accessToken', accessToken);
//                             localStorage.setItem('refreshToken', refreshToken)

//                             updateUserInfoFetch(userObj).then(response => {
//                                 dispatch(getUserInfoSuccess(response.user))
//                                 dispatch(setName(response.user.name))
//                                 dispatch(setEmail(response.user.email))
//                             }).catch(err => {
//                                 console.log(err);
//                             })
//                         }
//                     })
//                 }
//             }
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }

// export const userRegister: AppThunk = (name: string, email: string, password: string) => {
//     return function(dispatch: AppDispatch) {
//         dispatch(getUserInfoRequest());
//         fetch(`${_apiUrl}/auth/register`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//                 "name": name,
//                 "email": email,
//                 "password": password
//             })
//         }).then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).then(response => {
//             if (response.success) {
//                 dispatch(getUserInfoSuccess(response.user))
//                 dispatch(resetEmail())
//                 dispatch(resetPassword())
//                 dispatch(resetName())

//                 const accessToken = response.accessToken.split('Bearer ')[1];
//                 const refreshToken = response.refreshToken;

//                 setCookie('accessToken', accessToken);
//                 localStorage.setItem('refreshToken', refreshToken)
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }

// export const userLogin: AppThunk = (email: string, password: string) => {
//     return function(dispatch: any) {
//         dispatch(setUserRequest());
//         fetch(`${_apiUrl}/auth/login`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//                 "email": email,
//                 "password": password
//             })
//         }).then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).then(response => {
//             if (response.success) {
//                 dispatch(getUserInfoSuccess(response.user))
//                 dispatch(resetEmail())
//                 dispatch(resetPassword())

//                 dispatch(setName(response.user.name))
//                 dispatch(setEmail(response.user.email))

//                 const accessToken = response.accessToken.split('Bearer ')[1];
//                 const refreshToken = response.refreshToken;

//                 setCookie('accessToken', accessToken);
//                 localStorage.setItem('refreshToken', refreshToken)
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }

// export const userLogout: AppThunk = (token: string) => {
//     return function(dispatch: AppThunk) {
//         dispatch(setUserRequest());
//         fetch(`${_apiUrl}/auth/logout`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify({
//                 "token": token
//             })
//         }).then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).then(response => {
//             if (response.success) {
//                 dispatch(getUserInfoSuccess(null))
//                 localStorage.removeItem('refreshToken')
//                 deleteCookie('accessToken')
//             } else {
//                 dispatch(getUserInfoFailed())
//             }
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }

