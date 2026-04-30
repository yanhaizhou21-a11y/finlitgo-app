import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Empty means it will use relative path on production (same domain)
  withCredentials: true  // always send cookies
})

export const getMe = () => API.get('/api/auth/me')
export const logout = () => API.post('/api/auth/logout')
export const loginWithGoogle = () => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  window.location.href = `${baseUrl}/api/auth/google`
}