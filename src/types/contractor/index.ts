import { Timestamp } from "firebase/firestore"
// import firebase from "firebase/compat/app"

export interface ContractorType {
  createdAt?: Timestamp | null
  createdBy?: string | null
  updatedAt?: Timestamp | null
  updatedBy?: string | null
  name: string,
  email?: string,
  number?: number,
}
