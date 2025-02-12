import { FirebaseError } from "firebase/app"
import { put, call, takeEvery, all } from "redux-saga/effects"
import firebase from "firebase/compat/app"
import { getFirebaseBackend } from "../../../firebase/helper"
import { registerError, registerSuccess, registerUser } from "./reducer"

const fireBaseBackend = getFirebaseBackend()

const generateReferralCode = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  
  return code;
}

function* registerUserAsync(action: ReturnType<typeof registerUser>) {
  try {
    console.log(action.payload)
    if (!fireBaseBackend) {
      yield put(registerError("Something went wrong please try again later!"))
      return
    }

    const response: firebase.User = yield call(fireBaseBackend.registerUser, action.payload.username, action.payload.password, action.payload.type)
    if (!response) throw Error("Something went wrong please try again later or contact a developer")

    if (action.payload.type === "GROUP") {
      yield call(fireBaseBackend.addDocumentToCollection, {
        route: "organizations",
        data: {
          name: action.payload.orgName,
          email: action.payload.orgEmail,
          owner: response.uid,
          code: generateReferralCode(8),
          users: []
        }
      })
    }

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
