import axios from 'axios'
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
})
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export default client
export const get = client.get
export const post = client.post
export const put = client.put
export const del = client.delete

