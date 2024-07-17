import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { persistStore } from 'redux-persist'
import authSlice from '~/store/auth/auth-slice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export function getState() {
  return store.getState()
}

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

/**
 * Sử dụng các hook này để call thay cho useDispatch và useSelector của react-redux
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
