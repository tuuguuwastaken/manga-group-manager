import { takeEvery, put, all, call } from "redux-saga/effects"
import { apiError, loginSuccess, loginUser, logoutUser, logoutUserSuccess } from "./reducer"
import firebase from "firebase/compat/app"
import { FirebaseError } from "firebase/app"
import { getFirebaseBackend } from "../../../firebase/helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUserAsync(action: ReturnType<typeof loginUser>) {
  try {
    if (!fireBaseBackend) {
      yield put(apiError("Something went wrong please try again later!"))
      return
    }
    const response: firebase.User | null = yield call(fireBaseBackend.loginUser, action.payload.username, action.payload.password)
    if (!response) throw Error("Username/password is incorrect.")


    localStorage.setItem("current_org","asda")

    fireBaseBackend.setLoggedInUser(response)
    action.payload.navigate("/")

    yield put(loginSuccess(response))
  } catch (error) {
    console.log(error)
    const err = error as FirebaseError
    if (err.code === "auth/invalid-credential") {
      yield put(apiError("Username/password is incorrect."))
      return
    }
    yield put(apiError(error ? error as string : "Please contact a system admin"))
  }
}

function* logoutUserAsync(action: ReturnType<typeof logoutUser>) {
  try {
    if (!fireBaseBackend) {
      yield put(apiError("Something went wrong please try again later"))
      return
    }
    yield call(fireBaseBackend.logout)
    localStorage.removeItem("authUser")
    yield put(logoutUserSuccess())
    action.payload("/login", { replace: true })
  } catch (error) {
    console.log(error)
    yield put(apiError((error as object).toString()))
  }
}

function* authSaga() {
  yield all([takeEvery(loginUser.type, loginUserAsync), takeEvery(logoutUser.type, logoutUserAsync)])
}

export default authSaga
