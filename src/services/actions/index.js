import { 
    addIngredientToConstructor,
    deleteIngredientFromConstructor,
    addBunToConstructor,
    moveIngredientInConstructor,
    resetConstructor,
    getIngredients,
    TIngredientsActions
} from './ingredients';

import {
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    makeOrder,
    TOrderActions
} from './order';

import {
    setModalInnerIngredientsDetails,
    setModalInnerOrderDetails,
    setModalInnerOrderInfo,
    // setModalOpen,
    // setModalClose,
    setCurrentIngredient,
    setCurrentOrderInfo,
    TModalActions
} from './modal';

import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILED ,
    sendEmailForResetPass,
    SET_EMAILCODE,
    RESET_EMAILCODE,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    resetPassword
} from './reset-password';

import {
    SET_PASSWORD,
    RESET_PASSWORD,
    SET_EMAIL,
    RESET_EMAIL,
    SET_NAME,
    RESET_NAME,
    userRegister,
    userLogin,
    userLogout,
    SET_USER_REQUEST,
    SET_USER_FAILED,
    SET_USER_SUCCESS,
    getUserInfo,
    updateUserInfo,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILED 
} from './user';

import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS, 
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_START,

    WS_USER_ORDERS_CONNECTION_SUCCESS, 
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_START
} from './wsOrders'

export {
    addIngredientToConstructor,
    deleteIngredientFromConstructor,
    addBunToConstructor,
    moveIngredientInConstructor,
    resetConstructor,
    getIngredients,
    TIngredientsActions,

    setModalInnerIngredientsDetails,
    setModalInnerOrderDetails,
    setModalInnerOrderInfo,
    // setModalOpen,
    // setModalClose,
    setCurrentIngredient,
    setCurrentOrderInfo,
    TModalActions,

    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    makeOrder,
    TOrderActions,

    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILED ,
    SET_EMAIL,
    RESET_EMAIL,
    SET_PASSWORD,
    RESET_PASSWORD, 
    SET_EMAILCODE,
    RESET_EMAILCODE,
    sendEmailForResetPass,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    resetPassword,
    SET_NAME,
    RESET_NAME,
    userRegister,
    userLogin,
    userLogout,
    SET_USER_REQUEST,
    SET_USER_FAILED,
    SET_USER_SUCCESS,
    getUserInfo,
    updateUserInfo,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILED,
    WS_ALL_ORDERS_CONNECTION_SUCCESS, 
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS, 
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_START
}

