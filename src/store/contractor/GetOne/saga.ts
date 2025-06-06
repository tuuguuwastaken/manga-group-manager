import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../firebase/helper"
import { contractorGetOneError, contractorGetOneRequest, contractorGetOneSuccess } from "./reducer"
import { CustomDocumentType } from "../../../types/firebase"
import { ContractorType } from "../../../types/contractor"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof contractorGetOneRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(contractorGetOneError("Something went wrong. Please try again later."))
      return
    }

    if (!action.payload.config) {
      yield put(contractorGetOneError("Something went wrong. Please try again later."))
      return
    }

    const res: CustomDocumentType<ContractorType> = yield call(firebaseBackend.getDataByPath, {
      type:"collection",
      route: `${action.payload.config}/contractor/${action.payload.id}`
    })

    yield put(contractorGetOneSuccess(res))
  } catch (e) {
    console.log(e)
  }
}

function* contractorGetOneSaga(){
  yield all([takeLatest(contractorGetOneRequest.type,request)])
}

export default contractorGetOneSaga
