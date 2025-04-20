import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { supervisorGetListError, supervisorGetListRequest, supervisorGetListSuccess } from "./reducer"
import { CustomDocumentType } from "../../../../types/firebase"
import { SupervisorType } from "../../../../types/employee/supervidor"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof supervisorGetListRequest>) {
  try {
    if(!firebaseBackend){
        yield put(supervisorGetListError("Something went wrong. Please try again later."))
        return
    }

    const res:CustomDocumentType<SupervisorType>[] = yield call(firebaseBackend.getDataByPath, {
        route: `${action.payload.config.path}/supervisors`,
        type:"collection"
    })

    yield put(supervisorGetListSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(supervisorGetListError((error as string).toString()))
  }
}

function* supervisorGetListSaga(){
    yield all([takeLatest(supervisorGetListRequest.type, request)])
}

export default supervisorGetListSaga