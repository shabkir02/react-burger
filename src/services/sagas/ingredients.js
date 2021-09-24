import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_INGREDIENTS_REQUEST } from '../constants/ingredients';
import { getIngredientsFailed, getIngredientsSuccess } from '../actions/ingredients';
import { _apiUrl } from '../constants';

const getIngredients = async () => {
    return await fetch(`${_apiUrl}/ingredients`).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log();
        }
    })
}

export function* loadIngredients() {
    try {
        const response = yield call(getIngredients);
        yield put(getIngredientsSuccess(response.data));
    } catch (e) {
        yield put(getIngredientsFailed());
    }
}

export default function* ingredientsSaga() {
    yield takeEvery(GET_INGREDIENTS_REQUEST, loadIngredients)
}