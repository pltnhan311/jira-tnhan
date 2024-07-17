import publicClient from '~/config/public-client'

export interface LoginResponseContent {
  id: number
  email: string
  avatar: string
  phoneNumber: string
  name: string
  accessToken: string
}

export interface LoginResponse {
  statusCode: number
  message: string
  content: LoginResponseContent
  dateTime: string
}

const authApi = {
  login: (user: { email: string; passWord: string }): Promise<LoginResponse> => {
    return publicClient.post('/Users/signin', user)
  }
}

export default authApi
