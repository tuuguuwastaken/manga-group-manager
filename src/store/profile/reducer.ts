import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootState } from "../states"
import { UserType } from "../../types/user"
import { CustomDocumentType } from "../../types/firebase"

export interface ProfileState {
  error?: string | null
  loading: boolean
  data?: CustomDocumentType<UserType> | null
}

const initialState: ProfileState = {
  error: null,
  loading: false,
}

export const selectProfileState = (state: RootState): ProfileState => state.profile

export const profileInitial = createAction("PROFILE_INITIAL")
export const profileRequest = createAction("PROFILE_REQUEST")
export const profileRequestSuccess = createAction<CustomDocumentType<UserType>>("PROFILE_SUCCESS")
export const profileRequestError = createAction<string>("PROFILE_ERROR")

const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(profileInitial, (state) => {
    Object.assign(state, { error: null, loading: false, data: null } as ProfileState)
  })
  builder.addCase(profileRequest, (state) => {
    Object.assign(state, { error: null, loading: true, data: null } as ProfileState)
  })
  builder.addCase(profileRequestSuccess, (state, action) => {
    console.log(action.payload)
    Object.assign(state, { error: null, loading: false, data: action.payload } as ProfileState)
  })
  builder.addCase(profileRequestError, (state, action) => {
    Object.assign(state, { error: action.payload, loading: false } as ProfileState)
  })
})

export default profileReducer
