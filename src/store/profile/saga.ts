import { all, call, put, takeLatest } from "redux-saga/effects"
import { profileRequest, profileRequestError, profileRequestSuccess } from "./reducer"
import { UserType } from "../../types/user"
import { CustomDocumentType } from "../../types/firebase"
import { getFirebaseBackend } from "../../firebase/helper"

const firebaseBackend = getFirebaseBackend()

function* request() {
  try {
    if (!firebaseBackend) {
      yield put(profileRequestError("Please try again later"))
      return
    }

    const userId = firebaseBackend.currentUser().uid

    const res: CustomDocumentType<UserType> = yield call(firebaseBackend.getDataByPath, {
      route: `users/${userId}`, 
      type: "document",
    })

    yield put(profileRequestSuccess(res))
  } catch (error) {
    console.log(error)
    yield put(profileRequestError((error as string).toString()))
  }
}

function* profileSaga() {
  yield all([takeLatest(profileRequest.type, request)])
}

export default profileSaga
