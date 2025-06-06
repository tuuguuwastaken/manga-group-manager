import { createAction, createReducer } from "@reduxjs/toolkit";
import { ContractorType } from "../../../types/contractor";
import { CustomDocumentType } from "../../../types/firebase";
import { RootState } from "../../states";
import { ConfigState } from "../../../hooks/group";

export interface ConctractorGetListState {
    error?: string,
    loading: boolean,
    data?: CustomDocumentType<ContractorType>[]
}

const initialState: ConctractorGetListState = {
    loading:false
}

export const selectContractorGetListState = (state: RootState): ConctractorGetListState => state.contractorGetList

export const contractorGetListRequest = createAction<{config:ConfigState }>("CONTRACTOR_GET_LIST_REQUEST")
export const contractorGetListSuccess = createAction<CustomDocumentType<ContractorType>[]>("CONTRACTOR_GET_LIST_SUCCESS")
export const contractorGetListError = createAction<string>("CONTRACTOR_GET_LIST_ERROR")

const contractorGetListReducer = createReducer(initialState, (builder) => {
    builder.addCase(contractorGetListRequest, (state) => {
        Object.assign(state, {error: null, loading: true, data: null})
    })
    builder.addCase(contractorGetListSuccess, (state, action) => {
        Object.assign(state, {error: null, loading: false, data: action.payload})
    })
    builder.addCase(contractorGetListError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null})
    })
})

export default contractorGetListReducer