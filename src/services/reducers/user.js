import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT_REQUEST, 
    USER_LOGOUT_SUCCESS, 
    USER_LOGOUT_FAILED,
    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_NAME,
    RESET_NAME,
    SET_USER,
    REMOVE_USER
} from '../actions';

const initialState = {
    userRegisterRequest: false,
    userRegisterSuccess: null,
    userRegisterFailed: false,

    userLoginRequest: false,
    userLoginSuccess: null,
    userLoginFailed: false,

    userLogoutRequest: false,
    userLogoutSuccess: null,
    userLogoutFailed: false,

    name: '',
    email: '',
    password: '',
    user: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                userRegisterRequest: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userRegisterFailed: false,
                userRegisterSuccess: action.payload,
                userRegisterRequest: false
            }
        case USER_REGISTER_FAILED:
            return {
                userRegisterRequest: false,
                userRegisterFailed: true
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                userLoginRequest: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLoginFailed: false,
                userLoginSuccess: action.payload,
                userLoginRequest: false
            }
        case USER_LOGIN_FAILED:
            return {
                userLoginRequest: false,
                userLoginFailed: true
            }
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                userLogoutRequest: true
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                userLogoutFailed: false,
                userLogoutSuccess: action.payload,
                userLogoutRequest: false
            }
        case USER_LOGOUT_FAILED:
            return {
                userLogoutRequest: false,
                userLogoutFailed: true
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case RESET_EMAIL:
            return {
                ...state,
                email: ''
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case RESET_PASSWORD:
            return {
                ...state,
                password: ''
            }
        case SET_NAME: 
            return {
                ...state,
                name: action.payload
            }
        case RESET_NAME:
            return {
                ...state,
                name: ''
            }
        case SET_USER:
            return {
                ...state,
                user: true
            }
        case REMOVE_USER:
            return {
                ...state,
                user: false
            }
        default: 
            return state
    }
}