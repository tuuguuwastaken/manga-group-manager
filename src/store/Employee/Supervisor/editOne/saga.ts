import { all, call, put, takeLatest } from "redux-saga/effects"
import { getFirebaseBackend } from "../../../../firebase/helper"
import { supervisorEditOneError, supervisorEditOneRequest, supervisorEditOneSuccess } from "./reducer"
import { ImageType } from "../../../../types/image"

const firebaseBackend = getFirebaseBackend()

function* request(action: ReturnType<typeof supervisorEditOneRequest>) {
  try {
    if(!firebaseBackend){
        yield put(supervisorEditOneError("Something went wrong. Please try again later."))
        return
    }

    let docId = action.payload.id
    const image = action.payload.image

    if(!docId) {
      docId = yield call(firebaseBackend.addDocumentToCollection, {
        route:`${action.payload.config.path}/supervisors`,
        data:action.payload.data
      })
    } else {
      yield call(firebaseBackend.updateDataByPath,{
        route:`${action.payload.config.path}/supervisors/${docId}`,
        type:"document",
        data: action.payload.data
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
          route:`${action.payload.config.path}/supervisors/${docId}`,
          type:"document",
          data: {profilePicture: res}
        })
      } catch (ex) {
        console.log(ex)
      }
    }
    action.payload.navigate(-1)
    yield put(supervisorEditOneSuccess())
  } catch (error) {
    console.log(error)
    yield put(supervisorEditOneError((error as string).toString()))
  }
}

function* supervisorEditOneSaga(){
    yield all([takeLatest(supervisorEditOneRequest.type, request)])
}

export default supervisorEditOneSaga