import { Timestamp } from "firebase/firestore";
import { ImageType } from "../../image";
import { WorkplaceWorkerType } from "../../workplace";

export interface WorkerType {
    createAt?: Timestamp | null,
    createdBy?: string | null,
    updatedAt?: Timestamp | null,
    updatedBy?: string | null,
    firstName: string
    lastName: string
    workerId: string
    email?: string | null,
    phoneNumber?: string | null,
    profilePicture?: ImageType | null
    workplace?: WorkplaceWorkerType[]
}