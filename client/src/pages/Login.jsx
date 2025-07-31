import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error, user } = useAuthStore()
  const navigate = useNavigate()

  // ✅ אם המשתמש כבר מחובר (מ-localStorage למשל), ננתב אותו לדשבורד
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/student')
      }
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login({ email, password })

    if (result.success && result.user) {
      const user = result.user
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/student')
      }
    }
  }

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold text-center mb-6">התחברות</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* שדות אימייל וסיסמה... */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            אימייל
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            סיסמה
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="w-full btn-primary">
          {loading ? 'מתחבר...' : 'התחבר'}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        אין לך חשבון?
        <Link to="/register" className="text-blue-500 hover:underline mr-1">הירשם</Link>
      </p>
    </div>
  )
}

export default Login
