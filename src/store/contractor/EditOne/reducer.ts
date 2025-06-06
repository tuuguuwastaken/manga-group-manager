import { createAction, createReducer } from "@reduxjs/toolkit";
import { ContractorType } from "../../../types/contractor";
import { CustomDocumentType } from "../../../types/firebase";
import { RootState } from "../../states";
import { ConfigState } from "../../../hooks/group";
import { NavigateFunction } from "react-router-dom";

export interface ConctractorEditOneState {
    error?: string,
    loading: boolean,
    data?: CustomDocumentType<ContractorType>[]
}

const initialState: ConctractorEditOneState = {
    loading:false
}

export const selectContractorEditOneState = (state: RootState): ConctractorEditOneState => state.contractorEditOne

export const contractorEditOneRequest = createAction<{config:ConfigState, id?: string, navigate: NavigateFunction, data: ContractorType }>("CONTRACTOR_EDIT_ONE_REQUEST")
export const contractorEditOneSuccess = createAction("CONTRACTOR_EDIT_ONE_SUCCESS")
export const contractorEditOneError = createAction<string>("CONTRACTOR_EDIT_ONE_ERROR")

const contractorEditOneReducer = createReducer(initialState, (builder) => {
    builder.addCase(contractorEditOneRequest, (state) => {
        Object.assign(state, {error: null, loading: true, data: null})
    })
    builder.addCase(contractorEditOneSuccess, (state, action) => {
        Object.assign(state, {error: null, loading: false, data: action.payload})
    })
    builder.addCase(contractorEditOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading: false, data:null})
    })
})

export default contractorEditOneReducer