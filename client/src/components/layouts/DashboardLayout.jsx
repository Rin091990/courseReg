import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate, Link, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">תפריט</h2>
        <ul className="space-y-4">
          {user?.role === 'admin' && (
            <>
              <li>
                <Link to="/admin/users" className="hover:text-yellow-400">
                  ניהול משתמשים
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" className="hover:text-yellow-400">
                  ניהול קורסים
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  בית
                </Link>
              </li>
            </>
          )}

          {user?.role === 'user' && (
            <>
              <li>
                <Link to="/dashboard/my-courses" className="hover:text-yellow-400">
                  הקורסים שלי
                </Link>
              </li>
              
              <li>
                <Link to="/" className="hover:text-yellow-400">בית</Link>
              </li>
            </>
          )}
        </ul>

        <button
          onClick={handleLogout}
          className="mt-10 text-sm underline hover:text-red-400"
        >
          התנתק
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">שלום {user?.name}!</h1>
        </header>

        {/* הצגת תוכן פנימי לפי נתיב */}
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
