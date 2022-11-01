import { all } from "redux-saga/effects";
import { watchClientSaga } from "./clientSaga";
import { watchBusinessUnitSaga } from "./businessUnitSaga";
import { watchTeamSaga } from "./teamSaga";

export function* watcherSaga() {
  yield all([watchClientSaga(), watchBusinessUnitSaga(), watchTeamSaga()]);
}
