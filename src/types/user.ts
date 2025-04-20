import { Timestamp } from "firebase/firestore"
import { NavigateFunction } from "react-router-dom"
import { ImageType } from "./image"
import firebase from "firebase/compat/app"

export interface UserType {
  createdAt?: Timestamp | null
  createdBy?: string | null
  updatedAt?: Timestamp | null
  updatedBy?: string | null
  profileImage?: ImageType | null
  lastname?: string | null
  firstname?: string | null
  phone: string
  email?: string | null
  status?: "ACTIVE" | "INACTIVE" | "DELETED" | null
  dateOfBirth?: string | null
  gender?: "MALE" | "FEMALE" | null
  organizationId: string
}

export interface LoginType {
  username: string
  password: string
  navigate: NavigateFunction
}

export interface RegisterDTO {
  user: firebase.User
  id:string
}