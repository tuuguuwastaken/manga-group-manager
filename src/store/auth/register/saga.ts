import { FirebaseError } from "firebase/app"
import { put, call, takeEvery, all } from "redux-saga/effects"
import firebase from "firebase/compat/app"
import { getFirebaseBackend } from "../../../firebase/helper"
import { registerError, registerSuccess, registerUser } from "./reducer"

const fireBaseBackend = getFirebaseBackend()

function* registerUserAsync(action: ReturnType<typeof registerUser>) {
  try {
    if (!fireBaseBackend) {
      yield put(registerError("Something went wrong please try again later!"))
      return
    }

    const response: firebase.User = yield call(fireBaseBackend.registerUser, action.payload.username, action.payload.password, action.payload.type)
    if (!response) throw Error("Something went wrong please try again later or contact a developer")

    fireBaseBackend.setLoggedInUser(response)
    action.payload.navigate("/")
    yield put(registerSuccess(response))
  } catch (error) {
    console.log(error)
    const err = error as FirebaseError
    if (err.code === "auth/invalid-credential") {
      yield put(registerError("Username/password is incorrect."))
      return
    }
    yield put(registerError(error ? (error as string) : "Please contact a system admin"))
  }
}

function* registerSaga() {
  yield all([takeEvery(registerUser.type, registerUserAsync)])
}

export default registerSaga
