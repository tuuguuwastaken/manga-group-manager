import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../../types/firebase"
import { RootState } from "../../../states"
import { SupervisorType } from "../../../../types/employee/supervidor"
import { ConfigState } from "../../../../hooks/group"

export interface SupervisorGetListState {
    error?: string | null
    loading: boolean
    data?: CustomDocumentType<SupervisorType>[] | null
}

const initialState: SupervisorGetListState = {
    loading: false
}

export const selectSupervisorGetListState = (state: RootState): SupervisorGetListState => state.supervisorGetList

export const supervisorGetListInitial = createAction("SUPERVISOR_GET_LIST_INITIAL")
export const supervisorGetListRequest = createAction<{config: ConfigState}>("SUPERVISOR_GET_LIST_REQUEST")
export const supervisorGetListSuccess = createAction<CustomDocumentType<SupervisorType>[]>("SUPERVISOR_GET_LIST_SUCCES")
export const supervisorGetListError = createAction<string>("SUPERVISOR_GET_LIST_ERROR")

const supervisorGetListReducer = createReducer(initialState,  (builder) => {
    builder.addCase(supervisorGetListInitial, (state) => {
        Object.assign(state, {error:null, loading:false,data:null} as SupervisorGetListState)
    })
    builder.addCase(supervisorGetListRequest, (state) => {
        Object.assign(state,{error:null, loading: true, data:null} as SupervisorGetListState)
    }) 
    builder.addCase(supervisorGetListSuccess, (state,action) => {
        Object.assign(state, {error: null, loading:false, data:action.payload ?? []} as SupervisorGetListState)
    })
    builder.addCase(supervisorGetListError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null } as SupervisorGetListState)
    })
})

export default supervisorGetListReducer