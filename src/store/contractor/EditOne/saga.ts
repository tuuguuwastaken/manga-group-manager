import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../firebase/helper"
import { contractorEditOneRequest, contractorEditOneError, contractorEditOneSuccess } from "./reducer"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof contractorEditOneRequest>) {
  console.log(action.payload.navigate)
  try {
    if (!firebaseBackend) {
      yield put(contractorEditOneError("Something went wrong. Please try again later."))
      return
    }

    let docId = action.payload.id

    if (!docId) {
      docId = yield call(firebaseBackend.addDocumentToCollection, {
        route: `${action.payload.config.path}/contractors`,
        data: action.payload.data,
      })
    } else {
      yield call(firebaseBackend.updateDataByPath, {
        route: `${action.payload.config.path}/contractors/${docId}`,
        type: "document",
        data: action.payload.data,
      })
    }

    action.payload.navigate(-1)
    yield put(contractorEditOneSuccess())
  } catch (error) {
    console.log(error)
    yield put(contractorEditOneError((error as string).toString()))
  }
}

function* contractorEditOneSaga() {
  yield all([takeLatest(contractorEditOneRequest.type, request)])
}

export default contractorEditOneSaga
