import axios from 'axios'

export const getApiBaseUrl = () =>
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || ''

export const getClientBaseUrl = () =>
  import.meta.env.VITE_CLIENT_URL || import.meta.env.VITE_APP_URL || window.location.origin

const API = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true  // always send cookies
})

export const getMe = () => API.get('/api/auth/me')
export const logout = () => API.post('/api/auth/logout')
export const loginWithGoogle = () => {
  const baseUrl = getApiBaseUrl();
  window.location.href = `${baseUrl}/api/auth/google`
}