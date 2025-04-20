import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { workerGetOneError, workerGetOneRequest, workerGetOneSuccess } from "./reducer"
import { CustomDocumentType } from "../../../../types/firebase"
import { WorkerType } from "../../../../types/employee/worker"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof workerGetOneRequest>) {
  try {
    if(!firebaseBackend){
        yield put(workerGetOneError("Something went wrong. Please try again later."))
        return
    }

    const res:CustomDocumentType<WorkerType> = yield call(firebaseBackend.getDataByPath, {
        route: `${action.payload.config.path}/workers/${action.payload.id}`,
        type:"document"
    })
    console.log("USER DATA : ", res)

    yield put(workerGetOneSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(workerGetOneError((error as string).toString()))
  }
}

function* workerGetOneSaga(){
    yield all([takeLatest(workerGetOneRequest.type, request)])
}

export default workerGetOneSaga