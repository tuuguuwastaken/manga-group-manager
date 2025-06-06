import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../firebase/helper"
import { palletWeightGetOneError, palletWeightGetOneRequest, palletWeightGetOneSuccess } from "./reducer"
import { CustomDocumentType } from "../../../types/firebase"
import { PalletWeightType } from "../../../types/pallets"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof palletWeightGetOneRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(palletWeightGetOneError("Something went wrong. Please try again later."))
      return
    }

    if (!action.payload.config) {
      yield put(palletWeightGetOneError("Something went wrong. Please try again later."))
      return
    }

    const res: CustomDocumentType<PalletWeightType> = yield call(firebaseBackend.getDataByPath, {
      type:"collection",
      route: `${action.payload.config}/pallet_record/${action.payload.id}`
    })

    yield put(palletWeightGetOneSuccess(res))
  } catch (e) {
    console.log(e)
  }
}

function* palletWeightGetOneSaga(){
  yield all([takeLatest(palletWeightGetOneRequest.type,request)])
}

export default palletWeightGetOneSaga
