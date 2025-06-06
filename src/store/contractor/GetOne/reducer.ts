import { createAction, createReducer } from "@reduxjs/toolkit"
import { ConfigType } from "dayjs"
import { ContractorType } from "../../../types/contractor"
import { CustomDocumentType } from "../../../types/firebase"
import { RootState } from "../../states"


export interface ContractorGetOneState {
    error?: string,
    loading: boolean,
    data?: CustomDocumentType<ContractorType>,
}

const initialState: ContractorGetOneState = {
    loading: false
}

export const selectContractorGetOneState = (state: RootState) => state.contractorGetOne

export const contractorGetOneInitial = createAction("PALLET_WEIGHT_INITIAL")
export const contractorGetOneRequest = createAction<{config: ConfigType, id?: string}>("PALLET_WEIGHT_GET_ONE_REQUEST")
export const contractorGetOneSuccess = createAction<CustomDocumentType<ContractorType>>("PALLET_WEIGHT_GET_ONE_SUCCESS")
export const contractorGetOneError = createAction<string>("PALLET_WEIGHT_GET_ONE_ERROR")

const contractorGetOneReducer = createReducer(initialState, (builder) => {
    builder.addCase(contractorGetOneInitial, (state) => {
        Object.assign(state, {error: null, loading: false, data:null})
    })
    builder.addCase(contractorGetOneRequest, (state) => {
        Object.assign(state, { error:null, loading: true, data:null})
    })
    builder.addCase(contractorGetOneSuccess, (state,action) =>{
        Object.assign(state, {error: null, loading: false, data: action.payload})
    })
    builder.addCase(contractorGetOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading:false, data: null})
    })
})

export default contractorGetOneReducer