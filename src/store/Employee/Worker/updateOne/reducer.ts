import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { ConfigType } from "../../../../types/config"
import { WorkerType } from "../../../../types/employee/worker"

export interface WorkerUpdateOneState {
  error?: string | null
  loading: boolean
  data?: CustomDocumentType<WorkerType> | null
}

const initialState: WorkerUpdateOneState = {
  loading: false,
}

export const selectWorkerUpdateOneState = (state: RootState): WorkerUpdateOneState => state.workerUpdateOne

export const workerUpdateOneInitial = createAction("WORKER_GET_LIST_INITIAL")
export const workerUpdateOneRequest = createAction<{ config: ConfigType; id: string; data: WorkerType }>("WORKER_GET_LIST_REQUEST")
export const workerUpdateOneSuccess = createAction("WORKER_GET_LIST_SUCCES")
export const workerUpdateOneError = createAction<string>("WORKER_GET_LIST_ERROR")

const workerUpdateOneReducer = createReducer(initialState, (builder) => {
  builder.addCase(workerUpdateOneInitial, (state) => {
    Object.assign(state, { error: null, loading: false, data: null } as WorkerUpdateOneState)
  })
  builder.addCase(workerUpdateOneRequest, (state) => {
    Object.assign(state, { error: null, loading: true, data: null } as WorkerUpdateOneState)
  })
  builder.addCase(workerUpdateOneSuccess, (state) => {
    Object.assign(state, { error: null, loading: false } as WorkerUpdateOneState)
  })
  builder.addCase(workerUpdateOneError, (state, action) => {
    Object.assign(state, { error: action.payload, loading: false, data: null } as WorkerUpdateOneState)
  })
})

export default workerUpdateOneReducer
