import { call, takeEvery, apply, put, take, select, fork } from 'redux-saga/effects';

import { GET_INGREDIENTS_REQUEST } from '../constants/ingredients';

export function* loadIngredients() {
    const request = yield call(
        fetch, 
        `https://norma.nomoreparties.space/api/ingredients`
    );

    const data = yield apply(request, request.json);

    console.log(data)
}

export default function* ingredientsSaga() {
    yield takeEvery(GET_INGREDIENTS_REQUEST, loadIngredients)
}