import { all, spawn } from "redux-saga/effects";
import ingredientsSaga from "./ingredients";

export function* rootSaga() {
    const sagas = [ingredientsSaga];

    yield all(sagas.map(saga => spawn(saga)));
}