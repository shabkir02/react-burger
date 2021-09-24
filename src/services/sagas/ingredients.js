import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_INGREDIENTS_REQUEST } from '../constants/ingredients';
import { getIngredientsFailed, getIngredientsSuccess } from '../actions/ingredients';
import { _apiUrl } from '../constants';
import { checkResponse } from '../../utils/apiHelper';

const getIngredients = () => {
    return fetch(`${_apiUrl}/ingredients`).then(checkResponse)
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