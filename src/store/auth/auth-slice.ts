import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { loginAction } from '~/store/auth/action'

type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AuthData = {
  id?: number
  email?: string
  name?: string
  avatar?: string
  accessToken?: string
}

export interface AuthState {
  loadingState: LoadingState
  data: AuthData
  isLoggedIn: boolean
  isLoaded: boolean
}

const initialState: AuthState = {
  loadingState: 'idle',
  isLoggedIn: false,
  isLoaded: false,
  data: {
    id: undefined,
    email: undefined,
    name: undefined,
    avatar: undefined,
    accessToken: undefined
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.data = {}
      state.isLoaded = false
      state.isLoggedIn = false
      state.loadingState = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loadingState = 'loading'
      state.data = {}
      state.isLoaded = false
      state.isLoggedIn = false
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded'
      state.isLoaded = true
      if (action.payload) {
        state.data = action.payload
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
        state.data = {}
      }
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.loadingState = 'failed'
      state.data = {}
      state.isLoggedIn = false
      state.isLoaded = true
    })
  }
})

export const { signOut } = authSlice.actions

/**
 * persist
 */
export default persistReducer(
  {
    key: `${import.meta.env.VITE_MODE}:npp`,
    storage
  },
  authSlice.reducer
)
