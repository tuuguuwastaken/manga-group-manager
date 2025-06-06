import { Timestamp } from "firebase/firestore"
import { ImageType } from "../../image"
import { WorkplaceWorkerType } from "../../workplace"

export interface SupervisorType {
    createAt?: Timestamp | null
    createdBy?: string | null
    updatedAt?: Timestamp | null
    updatedBY?: string | null
    kakaoTalk?: string | null
    supervisorNumber?: string | null
    supervisorEmail?: string | null
    supervisorWorkplace?: WorkplaceWorkerType[],
    workerId: string | null
    supervisorPicture?: ImageType | null
}