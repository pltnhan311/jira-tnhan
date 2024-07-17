import axios from 'axios'
import qs from 'query-string'
import { BASE_URL, TOKEN_CYBERSOFT } from '~/utils/config'

const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params)
  }
})

publicClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // const accessToken = getState().Auth?.data.accessToken
    config.headers.TokenCybersoft = TOKEN_CYBERSOFT
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

publicClient.interceptors.response.use(
  ({ data }) => {
    return data
  },
  ({ response }) => {
    return Promise.reject(response.data)
  }
)

export default publicClient
