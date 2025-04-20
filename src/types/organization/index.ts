import { Timestamp } from "@firebase/firestore"

export interface OrganizationType {
    createdAt?: Timestamp | null
    createdBy?: string | null
    updatedAt?: Timestamp | null
    updatedBy?: string | null
    licenseExpire?: Timestamp | null
    rootAdminId: string
    name: string
    email: string,
    owner: string,
    code: string,
}