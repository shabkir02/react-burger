import { call, takeEvery, put } from 'redux-saga/effects';
import { SagaIterator } from "@redux-saga/types";

import { GET_INGREDIENTS_REQUEST } from '../constants/ingredients';
import { getIngredientsFailed, getIngredientsSuccess } from '../actions/ingredients';
import { _apiUrl } from '../constants';
import { checkResponse } from '../../utils/apiHelper';

const getIngredientsFetch = () => {
    return fetch(`${_apiUrl}/ingredients`).then(checkResponse)
}

export function* getIngredients(): SagaIterator {
    try {
        const response = yield call(getIngredientsFetch);
        yield put(getIngredientsSuccess(response.data));
    } catch (e) {
        yield put(getIngredientsFailed());
    }
}

export default function* ingredientsSaga() {
    yield takeEvery(GET_INGREDIENTS_REQUEST, getIngredients)
}