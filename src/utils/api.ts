import axios, { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
})

api.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
  const store = JSON.parse(
    (localStorage.getItem('persist:auth') as string) ?? '{}',
  )

  if (Object.hasOwn(store, 'user') && store.user !== 'null') {
    const user = JSON.parse(store.user ?? '{}')
    if (user.token) requestConfig.headers.authorization = `Bearer ${user.token}`
  }

  return requestConfig
}, null)

export default api
