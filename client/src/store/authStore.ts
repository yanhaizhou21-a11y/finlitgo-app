import { create } from 'zustand'
import { getMe, logout as logoutService, loginWithGoogle } from '../services/authService'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthStore {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  login: () => loginWithGoogle(),

  logout: async () => {
    await logoutService()
    set({ user: null })
  },

  fetchUser: async () => {
    try {
      const res = await getMe()
      set({ user: res.data, loading: false })
    } catch {
      set({ user: null, loading: false })
    }
  }
}))