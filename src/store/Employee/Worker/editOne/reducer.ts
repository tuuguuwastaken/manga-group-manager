import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { ImageState } from "../../../../types/image"
import { WorkerType } from "../../../../types/employee/worker"
import { ConfigState } from "../../../../hooks/group"
import { NavigateFunction } from "react-router-dom"

export interface WorkerEditOneState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<WorkerType> | null
}

const initialState: WorkerEditOneState = {
    loading: false
}

export const selectWorkerEditOneState = (state: RootState): WorkerEditOneState => state.workerEditOne

export const workerEditOneInitial = createAction("WORKER_CREATE_ONE_INITIAL")
export const workerEditOneRequest = createAction<{data:WorkerType,config: ConfigState, id?: string, image?: ImageState | null, navigate: NavigateFunction}>("WORKER_CREATE_ONE_REQUEST")
export const workerEditOneSuccess = createAction("WORKER_CREATE_ONE_SUCCES")
export const workerEditOneError = createAction<string>("WORKER_CREATE_ONE_ERROR")

const workerEditOneReducer = createReducer(initialState,  (builder) => {
    builder.addCase(workerEditOneInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as WorkerEditOneState)
    })
    builder.addCase(workerEditOneRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as WorkerEditOneState)
    }) 
    builder.addCase(workerEditOneSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload} as WorkerEditOneState)
    })
    builder.addCase(workerEditOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as WorkerEditOneState)
    })
})

export default workerEditOneReducer