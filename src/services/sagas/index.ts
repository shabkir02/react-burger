import { all, spawn } from "redux-saga/effects";
import ingredientsSaga from "./ingredients";
import userSaga from "./user";

export function* rootSaga() {
    const sagas = [ingredientsSaga, userSaga];

    yield all(sagas.map(saga => spawn(saga)));
}