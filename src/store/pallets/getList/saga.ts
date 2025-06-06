import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../firebase/helper"
import { palletWeightGetListError, palletWeightGetListRequest, palletWeightGetListSuccess } from "./reducer"
import { CustomDocumentType } from "../../../types/firebase"
import { PalletWeightType } from "../../../types/pallets"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof palletWeightGetListRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(palletWeightGetListError("Something went wrong. Please try again later."))
      return
    }

    if (!action.payload.config) {
      yield put(palletWeightGetListError("Something went wrong. Please try again later."))
      return
    }

    const res: CustomDocumentType<PalletWeightType>[] = yield call(firebaseBackend.getDataByPath, {
      type:"collection",
      route: `${action.payload.config.path}/pallet_record`
    })

    yield put(palletWeightGetListSuccess(res))
  } catch (e) {
    console.log(e)
  }
}

function* palletWeightGetListSaga(){
  yield all([takeLatest(palletWeightGetListRequest.type,request)])
}

export default palletWeightGetListSaga
