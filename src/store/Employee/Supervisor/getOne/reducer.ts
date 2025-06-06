import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { SupervisorType } from "../../../../types/employee/supervidor"
import { ConfigState } from "../../../../hooks/group"

export interface SupervisorGetOneState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<SupervisorType> | null
}

const initialState: SupervisorGetOneState = {
    loading: false
}

export const selectSupervisorGetOneState = (state: RootState): SupervisorGetOneState => state.supervisorGetOne

export const supervisorGetOneInitial = createAction("SUPERVISOR_GET_ONE_INITIAL")
export const supervisorGetOneRequest = createAction<{config: ConfigState,id:string, onSuccess?: (val: CustomDocumentType<SupervisorType>) => void}>("SUPERVISOR_GET_ONE_REQUEST")
export const supervisorGetOneSuccess = createAction<CustomDocumentType<SupervisorType>>("SUPERVISOR_GET_ONE_SUCCES")
export const supervisorGetOneError = createAction<string>("SUPERVISOR_GET_ONE_ERROR")

const supervisorGetOneReducer = createReducer(initialState,  (builder) => {
    builder.addCase(supervisorGetOneInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as SupervisorGetOneState)
    })
    builder.addCase(supervisorGetOneRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as SupervisorGetOneState)
    }) 
    builder.addCase(supervisorGetOneSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload} as SupervisorGetOneState)
    })
    builder.addCase(supervisorGetOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as SupervisorGetOneState)
    })
})

export default supervisorGetOneReducer