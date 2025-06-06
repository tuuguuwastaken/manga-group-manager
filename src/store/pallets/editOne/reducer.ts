import { createAction, createReducer } from "@reduxjs/toolkit"
import { CustomDocumentType } from "../../../types/firebase"
import { PalletWeightType } from "../../../types/pallets"
import { RootState } from "../../states"
import { NavigateFunction } from "react-router-dom"
import { ConfigState } from "../../../hooks/group"

export interface PalletWeightEditOneState {
  error?: string
  loading: boolean
  data?: CustomDocumentType<PalletWeightType>
}

const initialState: PalletWeightEditOneState = {
  loading: false,
}

export const selectPalletWeightEditOneState = (state: RootState) => state.palletWeightEditOne

export const palletWeightEditOneRequest = createAction<{ config: ConfigState; data: PalletWeightType, id?:string, navigate: NavigateFunction }>("PALLET_WEIGHT_EDIT_ONE_REQUEST")
export const palletWeightEditOneSuccess = createAction("PALLET_WEIGHT_EDIT_ONE_SUCCESS")
export const palletWeightEditOneError = createAction<string>("PALLET_WEIGHT_EDIT_ONE_ERROR")

const palletWeightEditOneReducer = createReducer(initialState, (builder) => {
  builder.addCase(palletWeightEditOneRequest, (state) => {
    Object.assign(state, { error: null, loading: true, data: null })
  })
  builder.addCase(palletWeightEditOneSuccess, (state, action) => {
    Object.assign(state, { error: null, loading: false, data: action.payload })
  })
  builder.addCase(palletWeightEditOneError, (state, action) => {
    Object.assign(state, { error: action.payload, loading: false, data: null })
  })
})

export default palletWeightEditOneReducer
