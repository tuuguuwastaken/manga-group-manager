import { createAction, createReducer } from "@reduxjs/toolkit";
import { CustomDocumentType } from "../../../types/firebase";
import { PalletWeightType } from "../../../types/pallets";
import { RootState } from "../../states";
import { ConfigType } from "../../../types/config";

export interface PalletWeightGetOneState {
    error?: string,
    loading: boolean,
    data?: CustomDocumentType<PalletWeightType>,
}

const initialState: PalletWeightGetOneState = {
    loading: false
}

export const selectPalletWeightGetOneState = (state: RootState) => state.palletWeightGetOne

export const palletWeightGetOneInitial = createAction("PALLET_WEIGHT_INITIAL")
export const palletWeightGetOneRequest = createAction<{config: ConfigType, id?: string}>("PALLET_WEIGHT_GET_ONE_REQUEST")
export const palletWeightGetOneSuccess = createAction<CustomDocumentType<PalletWeightType>>("PALLET_WEIGHT_GET_ONE_SUCCESS")
export const palletWeightGetOneError = createAction<string>("PALLET_WEIGHT_GET_ONE_ERROR")

const palletWeightGetOneReducer = createReducer(initialState, (builder) => {
    builder.addCase(palletWeightGetOneInitial, (state) => {
        Object.assign(state, {error: null, loading: false, data:null})
    })
    builder.addCase(palletWeightGetOneRequest, (state) => {
        Object.assign(state, { error:null, loading: true, data:null})
    })
    builder.addCase(palletWeightGetOneSuccess, (state,action) =>{
        Object.assign(state, {error: null, loading: false, data: action.payload})
    })
    builder.addCase(palletWeightGetOneError, (state, action) => {
        Object.assign(state, {error: action.payload, loading:false, data: null})
    })
})

export default palletWeightGetOneReducer