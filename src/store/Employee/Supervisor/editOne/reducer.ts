import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { ImageState } from "../../../../types/image"
import { SupervisorType } from "../../../../types/employee/supervidor"
import { ConfigState } from "../../../../hooks/group"
import { NavigateFunction } from "react-router-dom"

export interface SupervisorEditOneState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<SupervisorType> | null
}

const initialState: SupervisorEditOneState = {
    loading: false
}

export const selectSupervisorEditOneState = (state: RootState): SupervisorEditOneState => state.supervisorEditOne

export const supervisorEditOneInitial = createAction("SUPERVISOR_CREATE_ONE_INITIAL")
export const supervisorEditOneRequest = createAction<{data:SupervisorType,config: ConfigState, id?: string, image?: ImageState | null, navigate: NavigateFunction}>("SUPERVISOR_CREATE_ONE_REQUEST")
export const supervisorEditOneSuccess = createAction("SUPERVISOR_CREATE_ONE_SUCCES")
export const supervisorEditOneError = createAction<string>("SUPERVISOR_CREATE_ONE_ERROR")

const supervisorEditOneReducer = createReducer(initialState,  (builder) => {
    builder.addCase(supervisorEditOneInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as SupervisorEditOneState)
    })
    builder.addCase(supervisorEditOneRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as SupervisorEditOneState)
    }) 
    builder.addCase(supervisorEditOneSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload} as SupervisorEditOneState)
    })
    builder.addCase(supervisorEditOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as SupervisorEditOneState)
    })
})

export default supervisorEditOneReducer