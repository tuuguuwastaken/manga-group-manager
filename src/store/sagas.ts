
import { all, fork } from "redux-saga/effects"
import authSaga from "./auth/login/saga"
import registerSaga from "./auth/register/saga"

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(registerSaga)
  ])
}
