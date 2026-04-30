import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const { user, loading, login, logout, fetchUser } = useAuthStore()

  useEffect(() => {
    fetchUser() // auto-login on mount (checks cookie)
  }, [])

  return { user, loading, login, logout }
}