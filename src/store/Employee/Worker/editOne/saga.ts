import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { workerEditOneError, workerEditOneRequest, workerEditOneSuccess } from "./reducer"
import { ImageType } from "../../../../types/image"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof workerEditOneRequest>) {
  console.log(action.payload.navigate)
  try {
    if (!firebaseBackend) {
      yield put(workerEditOneError("Something went wrong. Please try again later."))
      return
    }

    let docId = action.payload.id
    const image = action.payload.image

    if (!docId) {
      docId = yield call(firebaseBackend.addDocumentToCollection, {
        route: `${action.payload.config.path}/workers`,
        data: action.payload.data,
      })
    } else {
      yield call(firebaseBackend.updateDataByPath, {
        route: `${action.payload.config.path}/workers/${docId}`,
        type: "document",
        data: action.payload.data,
      })
    }

    if (image) {
      try {
        const res: ImageType = yield call(firebaseBackend.imageUpload, {
          blob: image.blob,
          fileType: image.fileType,
          prefix: "userlist/",
          key: action.payload.id,
        })
        yield call(firebaseBackend.updateDataByPath, {
          route: `${action.payload.config.path}/workers/${docId}`,
          type: "document",
          data: { profilePicture: res },
        })
      } catch (ex) {
        console.log(ex)
      }
    }

    action.payload.navigate(-1)
    yield put(workerEditOneSuccess())
  } catch (error) {
    console.log(error)
    yield put(workerEditOneError((error as string).toString()))
  }
}

function* workerEditOneSaga() {
  yield all([takeLatest(workerEditOneRequest.type, request)])
}

export default workerEditOneSaga
