import { create } from 'zustand'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,     // שימושי להרשמה/התחברות
  isLoading: true,    // מצב טעינה ראשוני של initUser
  error: null,

  // התחברות
  login: async ({ email, password }) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true })
      const { user, token } = res.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      set({ user, token, loading: false })
      return { success: true, user }
    } catch (err) {
      set({ error: err.response?.data?.message || 'שגיאה כללית', loading: false })
      return { success: false }
    }
  },

  // הרשמה
  register: async ({ name, email, password, role }) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post(`${API}/auth/register`, { name, email, password, role }, { withCredentials: true })
      const { user, token } = res.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      set({ user, token, loading: false })
      return { success: true, user }
    } catch (err) {
      set({ error: err.response?.data?.message || 'שגיאה כללית', loading: false })
      return { success: false }
    }
  },

  // יציאה
  logout: async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true })
    } catch (_) {}

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },

  // טעינה מ-localStorage בעת אתחול האפליקציה
  initUser: () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      set({
        user: JSON.parse(savedUser),
        token: savedToken,
        isLoading: false
      })
    } else {
      set({ isLoading: false })
    }
  }
}))
