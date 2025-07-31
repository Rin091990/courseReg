import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    if (user.role === 'admin') {
      navigate('/admin')
    } else if (user.role === 'student') {
      navigate('/student')
    }
  }, [user, navigate])

  return null
}

export default Dashboard
