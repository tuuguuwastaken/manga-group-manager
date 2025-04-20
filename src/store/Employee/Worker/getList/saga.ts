import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { workerGetListError, workerGetListRequest, workerGetListSuccess } from "./reducer"
import { CustomDocumentType } from "../../../../types/firebase"
import { WorkerType } from "../../../../types/employee/worker"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof workerGetListRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(workerGetListError("Something went wrong. Please try again later."))
      return
    }
    if (!action.payload.config.path) {
      yield put(workerGetListError("Something went wrong. Please try again later."))
      return
    }
    console.log(action.payload.config.path)
    const res: CustomDocumentType<WorkerType>[] = yield call(firebaseBackend.getDataByPath, {
      route: `${action.payload.config.path}/workers`,
      type: "collection",
    })

    yield put(workerGetListSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(workerGetListError((error as string).toString()))
  }
}

function* workerGetListSaga() {
  yield all([takeLatest(workerGetListRequest.type, request)])
}

export default workerGetListSaga
