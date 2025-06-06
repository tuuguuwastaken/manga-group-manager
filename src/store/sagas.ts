
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
import palletWeightGetListSaga from "./pallets/getList/saga"
import palletWeightEditOneSaga from "./pallets/editOne/saga"
import palletWeightGetOneSaga from "./pallets/getOne/saga"
import contractorGetListSaga from "./contractor/GetList/saga"
import contractorEditOneSaga from "./contractor/EditOne/saga"
import contractorGetOneSaga from "./contractor/GetOne/saga"

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
    fork(supervisorGetListSaga),
    fork(palletWeightGetListSaga),
    fork(palletWeightEditOneSaga),
    fork(palletWeightGetOneSaga),
    fork(contractorGetListSaga),
    fork(contractorEditOneSaga),
    fork(contractorGetOneSaga),
  ])
}
