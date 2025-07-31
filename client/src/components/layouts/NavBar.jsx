import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const NavBar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <nav className="bg-gray-50 shadow-sm border-b">
        <div className="main-container">
          <div className="flex justify-between items-center h-16 flex-row-reverse">
            {/* לוגו */}
            <div className="flex items-center">
              <span
                onClick={() => setShowModal(true)}
                className="cursor-pointer text-2xl font-extrabold text-blue-600 hover:text-blue-800 transition"
              >
                פרויקט הגמר
              </span>
            </div>

            {/* תפריט ניווט */}
            <div className="flex items-center gap-x-4 flex-row-reverse">
              {user ? (
                <>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-md text-sm font-medium"
                  >
                    בית
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-md text-sm font-medium"
                  >
                    לוח בקרה
                  </Link>
                  <div className="flex items-center gap-x-2 flex-row-reverse">
                    <span className="text-gray-600 text-sm">שלום {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium transition"
                    >
                      התנתק
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-x-2 flex-row-reverse">
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-1.5 rounded-full text-sm"
                  >
                    התחבר
                  </Link>
                  <Link
                    to="/register"
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-4 py-1.5 rounded-full text-sm"
                  >
                    הירשם
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* מודאל – יוצר הפרויקט */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-blue-700">יוצר הפרויקט</h2>
            <p className="text-gray-800 font-medium">ניר בן יעקב</p>
            <p className="text-gray-500">nirby1990@gmail.com</p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
