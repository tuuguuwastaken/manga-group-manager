import { all, call, put, takeLatest } from "redux-saga/effects"
import { organizationOneRequest, organizationOneRequestError, organizationOneRequestSuccess } from "./reducer"
import { getFirebaseBackend } from "../../../firebase/helper"
import { CustomDocumentType } from "../../../types/firebase"
import { OrganizationType } from "../../../types/organization"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof organizationOneRequest>) {
  console.log("SAGA CALLED",action)
  try {
    if (!firebaseBackend) {
      yield put(organizationOneRequestError("Please try again later"))
      return
    }

    console.log("BEFORE STARTING REQ")

    const res: CustomDocumentType<OrganizationType> = yield call(firebaseBackend.getDataByPath, {
      route: `organizations/${action.payload.id}`,
      type: "document",
    })

    console.log("IT HAS BEEN CALLED HERE", res)

    yield put(organizationOneRequestSuccess(res))
  } catch (error) {
    console.log("EERRRORR", error)
    yield put(organizationOneRequestError((error as string).toString()))
  }
}

function* organizationOneSaga() {
  yield all([takeLatest(organizationOneRequest.type, request)])
}

export default organizationOneSaga
