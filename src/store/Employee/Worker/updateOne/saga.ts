import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { workerUpdateOneError, workerUpdateOneRequest, workerUpdateOneSuccess } from "./reducer"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof workerUpdateOneRequest>) {
  try {
    if(!firebaseBackend){
        yield put(workerUpdateOneError("Something went wrong. Please try again later."))
        return
    }

    const docId = action.payload.id

    yield call(firebaseBackend.updateDataByPath, {
      route: `${action.payload.config.path}/workers/${docId}`,
      type: "document",
      data: action.payload.data,
    })

    yield put(workerUpdateOneSuccess())
  } catch (error) {
    console.log(error)
    yield put(workerUpdateOneError((error as string).toString()))
  }
}

function* workerUpdateOneSaga(){
    yield all([takeLatest(workerUpdateOneRequest.type, request)])
}

export default workerUpdateOneSaga