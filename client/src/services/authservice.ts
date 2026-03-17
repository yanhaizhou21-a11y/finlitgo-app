import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000
  withCredentials: true  // always send cookies
})

export const getMe = () => API.get('/api/auth/me')
export const logout = () => API.post('/api/auth/logout')
export const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`
}