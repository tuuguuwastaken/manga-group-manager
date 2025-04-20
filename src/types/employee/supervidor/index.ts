import { Timestamp } from "firebase/firestore"
import { ImageType } from "../../image"

export interface SupervisorType {
    createAt?: Timestamp | null
    createdBy?: string | null
    updatedAt?: Timestamp | null
    updatedBY?: string | null
    kakaoTalk?: string | null
    workerId: string | null
    supervisorPicture?: ImageType | null
}