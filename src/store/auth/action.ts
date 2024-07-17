import { createAsyncThunk } from '@reduxjs/toolkit'
import { message as toast } from 'antd'
import authApi from '~/components/api/auth-api'

export const loginAction = createAsyncThunk('auth/login', async (payload: { email: string; passWord: string }) => {
  try {
    const { content, message, statusCode } = await authApi.login(payload)
    if (statusCode === 200) {
      toast.success(message)
      return content
    }
    return content
  } catch (error) {
    const message = (error as Error).message
    toast.error(message)
  }
})
