import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { WorkerType } from "../../../../types/employee/worker"
import { ConfigState } from "../../../../hooks/group"

export interface WorkerGetListState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<WorkerType>[] | null
}

const initialState: WorkerGetListState = {
    loading: false
}

export const selectWorkerGetListState = (state: RootState): WorkerGetListState => state.workerGetList

export const workerGetListInitial = createAction("WORKER_GET_LIST_INITIAL")
export const workerGetListRequest = createAction<{config: ConfigState}>("WORKER_GET_LIST_REQUEST")
export const workerGetListSuccess = createAction<CustomDocumentType<WorkerType>[]>("WORKER_GET_LIST_SUCCES")
export const workerGetListError = createAction<string>("WORKER_GET_LIST_ERROR")

const workerGetListReducer = createReducer(initialState,  (builder) => {
    builder.addCase(workerGetListInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as WorkerGetListState)
    })
    builder.addCase(workerGetListRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as WorkerGetListState)
    }) 
    builder.addCase(workerGetListSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload ?? []} as WorkerGetListState)
    })
    builder.addCase(workerGetListError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as WorkerGetListState)
    })
})

export default workerGetListReducer