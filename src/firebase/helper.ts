/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from "uuid"
import { FirebaseError } from "firebase/app"
import firebase from "firebase/compat/app"

// Add the Firebase products that you want to use
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { DocumentData } from "@firebase/firestore"
import { ImageType } from "../types/image"
import Resizer from "react-image-file-resizer"
import { CustomDocumentType, FirebaseAddDocumentType, FirebaseRequestType } from "../types/firebase"
import { AnyObject } from "antd/es/_util/type"

class FirebaseAuthBackend {
  constructor(firebaseConfig: AnyObject) {
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user))
      } else {
        localStorage.removeItem("authUser")
      }
    })

    const firestore = firebase.firestore()
    firestore.settings({ ignoreUndefinedProperties: true })
  }

  /**
   * Login user with given details
   */
  loginUser = async (email: string, password: string): Promise<firebase.User | null> => {
    if (!email.includes("@")) email += "@soclite.com"

    return new Promise<firebase.User | null>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (_) => {
            resolve(firebase.auth().currentUser)
          },
          (error: FirebaseError) => {
            reject(error)
          }
        )
    })
  }

  /**
   * Regsiter new user
   * @returns Firebase.user
   */

  registerUser = async (email: string, password: string, type: "GROUP" | "USER") => {
    if (!email.includes("@")) email += "@soclite.com"

    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = userCredential.user

    await firebase.firestore().collection("users").doc(user?.uid).set({
      updatedAt: firebase.firestore.Timestamp.now(),
      updatedBy: this.currentUser().uid,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: this.currentUser().uid,
      email,
      uuid: user?.uid,
      type,
    })

    return user
  }

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true)
        })
        .catch((error: FirebaseError) => {
          reject(error)
        })
    })
  }

  setLoggedInUser = (user: firebase.User | null) => {
    localStorage.setItem("authUser", JSON.stringify(user))
  }

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = (): firebase.User | null => {
    const authUser = localStorage.getItem("authUser")
    if (!authUser) return null
    return JSON.parse(authUser) as firebase.User
  }

  /**
   *
   * @param payload Request Payload
   * @returns Response Firebase Object
   */
  getDataByCollectionGroup = async (
    collectionId: string,
    filter?: (ref: firebase.firestore.Query<firebase.firestore.DocumentData>) => firebase.firestore.Query<firebase.firestore.DocumentData>
  ): Promise<CustomDocumentType<DocumentData>[]> => {
    const collectionRef = firebase.firestore().collectionGroup(collectionId)
    const snapshot = filter ? await filter(collectionRef).get() : await collectionRef.get()

    return snapshot.docs.map((e) => {
      return {
        id: e.id,
        data: e.data(),
        ref: e.ref,
      } as CustomDocumentType<DocumentData>
    })
  }

  /**
   *
   * @param payload Request Payload
   * @returns Response Firebase Object
   */
  getDataByPath = async (
    payload: FirebaseRequestType
  ): Promise<CustomDocumentType<DocumentData>[] | CustomDocumentType<DocumentData> | undefined> => {
    const path = payload.route

    // ? If type is a collection, it returns nested COLLECTION (Document List)
    if (payload.type === "collection") {
      const collectionRef = firebase.firestore().collection(path)
      const snapshot = payload.filter ? await payload.filter(collectionRef).get() : await collectionRef.orderBy("createdAt", "desc").get()

      return snapshot.docs.map((e) => {
        return {
          id: e.id,
          data: e.data(),
        } as CustomDocumentType<DocumentData>
      })
    }

    // ? If type is a document, it returns one DOCUMENT
    else {
      const docRef = firebase.firestore().doc(path)
      const snapshot = await docRef.get()

      const tmp = snapshot.data()
      if (tmp) {
        return {
          id: snapshot.id,
          data: tmp,
        } as CustomDocumentType<DocumentData>
      }

      return undefined
    }
  }

  setDataByPath = async (payload: FirebaseRequestType) => {
    if (payload.data) {
      const path = payload.route

      // ? If type is collection, it returns nested COLLECTION (Document List)
      if (payload.type === "collection") {
        // const collectionRef = firebase.firestore().collection(path);
        // const snapshot = await collectionRef.get();
        // return snapshot.docs.map((e) => e.data());
      }

      // ? If type is document, it returns one DOCUMENT
      else {
        const docRef = firebase.firestore().doc(path)
        const obj = { ...payload.data }
        obj.updatedAt = firebase.firestore.Timestamp.now()
        obj.updatedBy = this.currentUser().uid
        obj.createdAt = payload.data.createdAt ?? firebase.firestore.Timestamp.now()
        obj.createdBy = payload.data.createdBy ?? this.currentUser().uid
        delete obj.id
        await docRef.set(obj)
      }
    }
  }

  updateDataByPath = async (payload: FirebaseRequestType) => {
    if (payload.data) {
      const path = payload.route

      const docRef = firebase.firestore().doc(path)
      const obj = { ...payload.data }
      obj.updatedAt = firebase.firestore.Timestamp.now()
      obj.updatedBy = this.currentUser().uid
      delete obj.createdAt
      delete obj.createdBy
      delete obj.id
      await docRef.update(obj)
    }
  }

  /**
   * Remove specific document
   * @param path Removing document's path
   */
  removeDocument = async (path: string) => {
    await firebase.firestore().doc(path).delete()
  }

  /**
   * Remove specific document
   * @param path Removing document's path
   */
  safetyRemoveDocument = async (path: string) => {
    await firebase.firestore().doc(path).update({
      status: "DELETED",
    })
  }

  /**
   * Add document into specific collection
   * @param payload Request Payload
   */
  addDocumentToCollection = async (payload: FirebaseAddDocumentType): Promise<string> => {
    const path = payload.route

    payload.data.createdAt = firebase.firestore.Timestamp.now()
    payload.data.createdBy = this.currentUser().uid
    payload.data.updatedAt = null
    payload.data.updatedBy = null

    const res = await firebase.firestore().collection(path).add(payload.data)
    return res.id
  }

  countDocuments = async (payload: FirebaseRequestType): Promise<number | null> => {
    const path = payload.route

    const collectionRef = firebase.firestore().collection(path)
    const snapshot = payload.filter ? await payload.filter(collectionRef).get() : await collectionRef.get()

    return snapshot.size
  }

  countNestedDocuments = async (payload: FirebaseRequestType): Promise<number | null> => {
    const path = payload.route
    const innerCollection = payload.additionalRoute
    const collectionRef = firebase.firestore().collection(path)
    const snapshot = payload.filter ? await payload.filter(collectionRef).get() : await collectionRef.get()
    let totalCount = 0
    for (const doc of snapshot.docs) {
      const innerCollectionPath = `${path}/${doc.id}/${innerCollection}`
      const innerCollectionRef = firebase.firestore().collection(innerCollectionPath)
      const innerSnapshot = payload.innerFilter ? await payload.innerFilter(innerCollectionRef).get() : await innerCollectionRef.get()

      // const innerSnapshot = await innerCollectionRef.get()
      totalCount += innerSnapshot.size
    }

    return totalCount
  }

  currentUser = (): firebase.User => {
    const user = this.getAuthenticatedUser()
    if (!user) throw Error("Нэвтрэх шаардлагатай")

    return user
  }

  /**
   *
   * @param file Оруулах Файл
   * @returns Холбоосыг буцаана
   */
  fileUpload = async (file: File, prefix?: string | null): Promise<string> => {
    // {taskId}/{randomUUID}.{fileType}
    const fileUrl = (prefix ?? "") + uuidv4() + "." + file.name
    const fileRef = firebase.storage().ref().child(fileUrl)
    const result = await fileRef.put(file)
    console.log(result)
    if (result.state === firebase.storage.TaskState.SUCCESS) {
      return await result.ref.getDownloadURL()
    }

    throw Error("Түр хүлээгээд дахин оролдоно уу.")
  }

  /**
   *
   * @param blob Оруулах зургийн файл
   * @param fileType png, jpg гэх мэт төрлүүд байна
   * @param prefix Оруулах файлын фолдерийн нэр "prefix/" заавал slash-аар төгсөх шаардлагатай
   * @returns
   */
  imageUpload = async ({ blob, fileType, prefix, key }: ImageUploadProps): Promise<ImageType> => {
    const fileKey = (key ?? uuidv4()) + "." + fileType
    console.log(fileKey)
    const fileKey1 = (prefix ?? "") + fileKey
    const fileKey2 = (prefix ?? "") + "small/" + fileKey

    const { url: res1Url, ref: res1Ref } = await this.imageUploadWrapper(blob, fileKey1, 1920, fileType)
    const { url: res2Url, ref: res2Ref } = await this.imageUploadWrapper(blob, fileKey2, 200, fileType)

    return {
      imageUrl: res1Url,
      smallImageUrl: res2Url,
      imageRef: res1Ref,
      smallImageRef: res2Ref,
    } as ImageType
  }

  documentExistsByField = async (payload: FirebaseRequestType): Promise<boolean> => {
    const collectionRef = firebase.firestore().collection(payload.route)
    const querySnapshot = await collectionRef.where(payload.data?.fieldName, "==", payload.data.fieldValue).get()

    return !querySnapshot.empty
  }

  imageUploadWrapper = async (blob: Blob, fileName: string, maxSize: number, fileType: string): Promise<{ url?: string | null; ref: string }> => {
    const resizedBlob = await new Promise<Blob>((resolve, _) => {
      Resizer.imageFileResizer(
        blob,
        maxSize,
        maxSize,
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri as Blob)
        },
        "blob"
      )
    })
    const file = new File([resizedBlob], fileType, { type: resizedBlob.type })
    // Uploading image file
    const fileRef = firebase.storage().ref().child(fileName)
    const result = await fileRef.put(file)
    console.log(result)
    if (result.state === firebase.storage.TaskState.SUCCESS) {
      return { url: await fileRef.getDownloadURL(), ref: result.metadata.fullPath }
    }

    throw Error("Түр хүлээгээд дахин оролдоно уу.")
  }

  /**
   * Downloads a file from Firebase Storage given its path.
   * @param route The path to the file in Firebase Storage.
   * @returns A Promise that resolves to the download URL of the file.
   */
  downloadFile = async (route: string): Promise<string> => {
    const fileRef = firebase.storage().ref().child(route)
    try {
      const downloadURL = await fileRef.getDownloadURL()
      return downloadURL
    } catch (error) {
      throw new Error("Failed to get download URL: " + error)
    }
  }
}

let _fireBaseBackend: FirebaseAuthBackend | null = null

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config: AnyObject) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config)
  }
  return _fireBaseBackend
}

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend
}

export { initFirebaseBackend, getFirebaseBackend }

interface ImageUploadProps {
  blob: Blob
  fileType: string
  prefix?: string | null
  key?: string | null
}
