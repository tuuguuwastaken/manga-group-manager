import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { WorkerType } from "../../../../types/employee/worker"
import { ConfigState } from "../../../../hooks/group"

export interface WorkerGetOneState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<WorkerType> | null
}

const initialState: WorkerGetOneState = {
    loading: false
}

export const selectWorkerGetOneState = (state: RootState): WorkerGetOneState => state.workerGetOne

export const workerGetOneInitial = createAction("WORKER_GET_ONE_INITIAL")
export const workerGetOneRequest = createAction<{config: ConfigState,id:string, onSuccess: (val: CustomDocumentType<WorkerType>) => void}>("WORKER_GET_ONE_REQUEST")
export const workerGetOneSuccess = createAction<CustomDocumentType<WorkerType>>("WORKER_GET_ONE_SUCCES")
export const workerGetOneError = createAction<string>("WORKER_GET_ONE_ERROR")

const workerGetOneReducer = createReducer(initialState,  (builder) => {
    builder.addCase(workerGetOneInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as WorkerGetOneState)
    })
    builder.addCase(workerGetOneRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as WorkerGetOneState)
    }) 
    builder.addCase(workerGetOneSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload} as WorkerGetOneState)
    })
    builder.addCase(workerGetOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as WorkerGetOneState)
    })
})

export default workerGetOneReducer