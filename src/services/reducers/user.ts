import {
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,
    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_NAME,
    RESET_NAME,
} from '../constants/user';

import { TUserActions } from '../actions/user';
import { TUser } from '../types/data';

type TUserState = {
    userReguest: boolean;
    userFailed: boolean;
    user: null | TUser

    name: string;
    email: string;
    password: string
}

export const initialState : TUserState = {
    userReguest: false,
    userFailed: false,
    user: null,

    name: '',
    email: '',
    password: '',
}

export default function userReducer(state = initialState, action: TUserActions): TUserState {
    switch(action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                userReguest: true
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                userReguest: false,
                userFailed: false,
                user: action.payload
            }
        case GET_USER_INFO_FAILED:
            return {
                ...state,
                userReguest: false,
                userFailed: true,
                user: null,
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
        default: 
            return state
    }
}