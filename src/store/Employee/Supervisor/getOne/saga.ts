import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { supervisorGetOneError, supervisorGetOneRequest, supervisorGetOneSuccess } from "./reducer"
import { CustomDocumentType } from "../../../../types/firebase"
import { SupervisorType } from "../../../../types/employee/supervidor"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof supervisorGetOneRequest>) {
  try {
    if(!firebaseBackend){
        yield put(supervisorGetOneError("Something went wrong. Please try again later."))
        return
    }

    const res:CustomDocumentType<SupervisorType> = yield call(firebaseBackend.getDataByPath, {
        route: `${action.payload.config.path}/supervisors/${action.payload.id}`,
        type:"document"
    })

    yield put(supervisorGetOneSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(supervisorGetOneError((error as string).toString()))
  }
}

function* supervisorGetOneSaga(){
    yield all([takeLatest(supervisorGetOneRequest.type, request)])
}

export default supervisorGetOneSaga