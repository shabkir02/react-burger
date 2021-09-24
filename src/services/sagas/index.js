import { all, spawn } from "redux-saga/effects";
import ingredientsSaga from "./ingredients";
import resetPasswordSaga from "./reset-password";
import userSaga from "./user";

export function* rootSaga() {
    const sagas = [ingredientsSaga, userSaga, resetPasswordSaga];

    yield all(sagas.map(saga => spawn(saga)));
}