import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../firebase/helper"
import { palletWeightEditOneError, palletWeightEditOneRequest, palletWeightEditOneSuccess } from "./reducer"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof palletWeightEditOneRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(palletWeightEditOneError("Something went wrong. Please try again later."))
      return
    }

    if (!action.payload.config) {
      yield put(palletWeightEditOneError("Something went wrong. Please try again later."))
      return
    }

    let docId = action.payload.id

    if (!docId) {
      docId = yield call(firebaseBackend.addDocumentToCollection, {
        route: `${action.payload.config.path}/pallet_record`,
        data: action.payload.data,
      })
    } else {
      yield call(firebaseBackend.updateDataByPath, {
        route: `${action.payload.config.path}/pallet_record/${docId}`,
        type: "document",
        data: action.payload.data,
      })
    }

    action.payload.navigate(-1)

    yield put(palletWeightEditOneSuccess())
  } catch (e) {
    console.log(e)
  }
}

function* palletWeightEditOneSaga() {
  yield all([takeLatest(palletWeightEditOneRequest.type, request)])
}

export default palletWeightEditOneSaga
