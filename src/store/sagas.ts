
import { all, fork } from "redux-saga/effects"
import authSaga from "./auth/login/saga"
import registerSaga from "./auth/register/saga"
import profileSaga from "./profile/saga"
import organizationOneSaga from "./organization/GetOne/saga"
import workerEditOneSaga from "./Employee/Worker/editOne/saga"
import workerGetListSaga from "./Employee/Worker/getList/saga"
import workerGetOneSaga from "./Employee/Worker/getOne/saga"
import workerUpdateOneSaga from "./Employee/Worker/updateOne/saga"
import supervisorEditOneSaga from "./Employee/Supervisor/editOne/saga"
import supervisorGetOneSaga from "./Employee/Supervisor/getOne/saga"
import supervisorGetListSaga from "./Employee/Supervisor/getList/saga"

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(registerSaga),
    fork(profileSaga),
    fork(organizationOneSaga),
    fork(workerEditOneSaga),
    fork(workerGetListSaga),
    fork(workerGetOneSaga),
    fork(workerUpdateOneSaga),
    fork(supervisorEditOneSaga),
    fork(supervisorGetOneSaga),
    fork(supervisorGetListSaga)
  ])
}
