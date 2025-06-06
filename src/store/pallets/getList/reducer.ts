import { createAction, createReducer } from "@reduxjs/toolkit";
import { CustomDocumentType } from "../../../types/firebase";
import { PalletWeightType } from "../../../types/pallets";
import { RootState } from "../../states";
import { ConfigState } from "../../../hooks/group";

export interface PalletWeightGetListState {
    error?: string,
    loading: boolean,
    data?: CustomDocumentType<PalletWeightType>[],
}

const initialState: PalletWeightGetListState = {
    loading: false
}

export const selectPalletWeightGetListState = (state: RootState) => state.palletWeightGetList

export const palletWeightGetListRequest = createAction<{config: ConfigState }>("PALLET_WEIGHT_GET_LIST_REQUEST")
export const palletWeightGetListSuccess = createAction<CustomDocumentType<PalletWeightType>[]>("PALLET_WEIGHT_GET_LIST_SUCCESS")
export const palletWeightGetListError = createAction<string>("PALLET_WEIGHT_GET_LIST_ERROR")

const palletWeightGetListReducer = createReducer(initialState, (builder) => {
    builder.addCase(palletWeightGetListRequest, (state) => {
        Object.assign(state, { error:null, loading: true, data:null})
    })
    builder.addCase(palletWeightGetListSuccess, (state,action) =>{
        Object.assign(state, {error: null, loading: false, data: action.payload})
    })
    builder.addCase(palletWeightGetListError, (state, action) => {
        Object.assign(state, {error: action.payload, loading:false, data: null})
    })
})

export default palletWeightGetListReducer