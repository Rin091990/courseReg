import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// ראוט מוגן
const ProtectedRoute = ({ children, requiredRole, adminOnly }) => {
  const { user, token } = useAuthStore()

  if (!token || !user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/dashboard" replace />

  return children
}

// ראוט פתוח רק למי שלא מחובר
const PublicRoute = ({ children }) => {
  const { token, user } = useAuthStore()
  return token && user ? <Navigate to="/dashboard" replace /> : children
}

// טעינת משתמש בעת אתחול האפליקציה
const AuthLoader = ({ children }) => {
  const initUser = useAuthStore((state) => state.initUser)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    initUser()
  }, [])

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>טוען נתוני משתמש...</div>
  }

  return children
}

export { ProtectedRoute, PublicRoute, AuthLoader }
