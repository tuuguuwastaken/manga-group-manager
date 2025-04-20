import { Timestamp } from "firebase/firestore";
import { ImageType } from "../../image";

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
    
}