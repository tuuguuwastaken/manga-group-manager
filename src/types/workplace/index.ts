import { Timestamp } from "@firebase/firestore"

export interface WorkplaceType {
  createAt?: Timestamp | null
  createdBy?: string | null
  updatedAt?: Timestamp | null
  updatedBY?: string | null
  name: string
  email: string
  phoneNumber?: string | null
  desc?: string | null
  farms?: string[]
}

export interface WorkplaceWorkerType {
    workplaceId:string,
    workerId: string,
}

export interface FarmType {
  createAt?: Timestamp | null
  createdBy?: string | null
  updatedAt?: Timestamp | null
  updatedBY?: string | null
  name: string
  description: string
  address: string
  workplaceId: string,
}