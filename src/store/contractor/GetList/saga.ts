import { all, call, put, takeLatest } from "redux-saga/effects"
import { CustomDocumentType } from "../../../types/firebase"
import { contractorGetListRequest, contractorGetListError, contractorGetListSuccess } from "./reducer"
import { ContractorType } from "../../../types/contractor"
import { getFirebaseBackend } from "../../../firebase/helper"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof contractorGetListRequest>) {
  try {
    if (!firebaseBackend) {
      yield put(contractorGetListError("Something went wrong. Please try again later."))
      return
    }
    if (!action.payload.config.path) {
      yield put(contractorGetListError("Something went wrong. Please try again later."))
      return
    }
    const res: CustomDocumentType<ContractorType>[] = yield call(firebaseBackend.getDataByPath, {
      route: `${action.payload.config.path}/contractor`,
      type: "collection",
    })

    yield put(contractorGetListSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(contractorGetListError((error as string).toString()))
  }
}

function* contractorGetListSaga() {
  yield all([takeLatest(contractorGetListRequest.type, request)])
}

export default contractorGetListSaga
