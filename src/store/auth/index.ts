/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signOut, User } from "firebase/auth"
import { auth } from "../../firebase/config"
import { getFirebaseBackend } from "../../firebase/helper"

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const firebaseBackend = getFirebaseBackend()

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, type }: { email: string; password: string; type: "GROUP" | "USER" }, { rejectWithValue }) => {
    try {

      if (!email.includes("@")) email += "@soclite.mn"
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await firebaseBackend?.addDocumentToCollection({
        route: "user",
        data: {
          email,
          uuid: user.uid,
          type,
        },
      })
      return user
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try {
    if(!firebaseBackend){
      throw Error("something went wrong please try again later")
    }
    const response: any = firebaseBackend.loginUser(email, password)
    if (!response) throw Error("Нэвтрэх хүсэлт амжилтгүй боллоо.")

    firebaseBackend.setLoggedInUser(response)
    return response
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

// **Logout Thunk**
export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth)
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default authSlice.reducer
