import axios from 'axios'
import queryString from 'query-string'
import { getState } from '~/store/store'
import { BASE_URL } from '~/utils/config'

const privateClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params)
  }
})

privateClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = getState().auth?.data?.accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default privateClient
