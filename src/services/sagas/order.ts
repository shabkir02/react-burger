import { select, takeEvery, call, put } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { checkResponse } from "../../utils/apiHelper";
import { GET_ORDER_REQUEST } from "../constants/order";
import { TIngredient } from "../types/data";
import { getCookie, setCookie } from "../../utils/cookies";
import { _apiUrl } from "../constants";
import { getOrderFailed, getOrderRequest, getOrderSuccess } from "../actions/order/order";
import { resetConstructor } from "../actions/ingredients/ingredients";
import { updateAccessTokenFetch } from "./user";

export function makeOrderFetch(ingredientsIdArr: Array<string>) {
    return fetch(`${_apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
          "ingredients": ingredientsIdArr
        })
    }).then(checkResponse)
}

export function* makeOrder(): SagaIterator {
    try {
        const { constructorIngredients, constructorBun } = yield select(store => ({
            constructorIngredients: store.ingredients.constructorIngredients,
            constructorBun: store.ingredients.constructorBun,
        }));
        const finalIngredients = constructorIngredients.map((ingredient: TIngredient): string => ingredient._id)
        const finalIngredientsArg = [...finalIngredients, constructorBun._id, constructorBun._id];

        const response = yield call(makeOrderFetch, finalIngredientsArg);

        yield put(getOrderSuccess(response.order));
        yield put(resetConstructor());

    } catch(error: any) {
        if (error?.message === 'jwt expired') {
            const data = yield call(updateAccessTokenFetch);
            if (data?.success) {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken)
                
                yield put(getOrderRequest())
            } else {
                yield put(getOrderFailed())
            }
            return
        }
        yield put(getOrderFailed())
    }
}

export default function* orderSaga() {
    yield takeEvery(GET_ORDER_REQUEST, makeOrder)
}