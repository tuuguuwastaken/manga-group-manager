import { createAction, createReducer } from "@reduxjs/toolkit"
import firebase from "firebase/compat/app"
import { RootState } from "../../states"
import { NavigateFunction } from "react-router-dom"

export interface RegisterState {
  error?: string | null
  loading: boolean
  user?: firebase.User | null
}

export interface RegisterType {
  username: string
  password: string
  type: "GROUP" | "USER"
  orgName?: string | null
  orgEmail?: string | null
  navigate: NavigateFunction
}

const initialState: RegisterState = {
  loading: false,
}

export const selectRegisterState = (state: RootState): RegisterState => state.authRegister

export const registerUser = createAction<RegisterType>("REGISTER_USER")
export const registerSuccess = createAction<firebase.User>("REGISTER_USER_SUCCESS")
export const registerError = createAction<string>("REGISTER_USER_ERROR")

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser, (state) => {
      Object.assign(state, { user: null, error: null, loading: true } as RegisterState)
    })
    .addCase(registerSuccess, (state, action) => {
      Object.assign(state, { loading: false, user: action.payload, error: null } as RegisterState)
    })
    .addCase(registerError, (state, action) => {
      Object.assign(state, { error: action.payload, loading: false, user: null } as RegisterState)
    })
})

export default registerReducer
