import firebase from "firebase/compat/app"
import { RootState } from "../../states"
import { createAction, createReducer } from "@reduxjs/toolkit"
import { LoginType } from "../../../types/user"
import { NavigateFunction } from "react-router-dom"

export interface LoginState {
  error?: string
  loading: boolean
  user?: firebase.User | null
}

const initialState: LoginState = {
  loading: false,
}

export const selectLoginState = (state: RootState): LoginState => state.authLogin

export const loginUser = createAction<LoginType>("LOGIN_USER")
export const loginSuccess = createAction<firebase.User>("LOGIN_USER_SUCCES")
export const logoutUser = createAction<NavigateFunction>("LOGOUT_USER")
export const logoutUserSuccess = createAction("LOGOUT_USER_SUCCESS")
export const apiError = createAction<string>("API_ERROR")
export const loginUserSet = createAction<firebase.User>("LOGIN_USER_SET")

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser, (state) => {
      Object.assign(state, { error: "", loading: true })
    })
    .addCase(loginSuccess, (state, action) => {
      Object.assign(state, { error: "", loading: false, user: action.payload })
    })
    .addCase(logoutUser, (state) => {
      Object.assign(state, { error: "", loading: false })
    })
    .addCase(logoutUserSuccess, (state) => {
      Object.assign(state, { error: "", loading: false, user: null, keycloak: null })
    })
    .addCase(apiError, (state, action) => {
      Object.assign(state, { error: action.payload, loading: false })
    })
    .addCase(loginUserSet, (state, action) => {
      Object.assign(state, { error: "", loading: false, user: action.payload })
    })
})

export default loginReducer
