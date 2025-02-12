/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from "firebase/compat/app"

export interface FirebaseRequestType {
  // ? Regex path => document/collection/document/collection/...
  route: string
  // Used for counting nested collection remove if unnecessary @NABA
  additionalRoute?: string | undefined
  type: "document" | "collection"
  data?: any
  filter?: (ref: firebase.firestore.Query<firebase.firestore.DocumentData>) => firebase.firestore.Query<firebase.firestore.DocumentData>
  innerFilter?: (ref: firebase.firestore.Query<firebase.firestore.DocumentData>) => firebase.firestore.Query<firebase.firestore.DocumentData>
}

export interface FirebaseAddDocumentType {
  // ? Regex path => document/collection/document/collection/...
  route: string
  data: any
}

/**
 * Firebase-ийн дата-г шууд typescript interface-руу шилжүүлэхэд
 * id-г document дээр давхардаж бичих зэрэг conflict-ууд үүсдэг тул
 * тусад нь generic type interface гаргах шаардлага үүсэв.
 */
export interface CustomDocumentType<T> {
  id: string
  data: T
  ref?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export interface CustomRequestType<T> {
  data: T
  message:string
  success: boolean
}
