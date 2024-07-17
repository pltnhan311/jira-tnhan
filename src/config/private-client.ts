import axios from 'axios'

const jiraAxios = axios.create({
  baseURL: `${import.meta.env.VITE_CYBER_API}/api`
})

jiraAxios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // const accessToken = getState().Auth?.data.accessToken

    const accessToken =
      'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJkaW5vc2F1ckBnbWFpbC5jb20iLCJuYmYiOjE3MjEyMzIxMTgsImV4cCI6MTcyMTIzNTcxOH0.pPgBNHYbgDlYoX2vR8wPnL0tgt0_gKcHmsGUJQ36vok'

    if (accessToken) {
      config.headers.TokenCybersoft = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default jiraAxios
