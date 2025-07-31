import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

const StudentCourses = () => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">הקורסים שלי</h2>
    <p className="text-gray-600">צפייה בקורסים שאליהם נרשמת</p>
  </div>
)

const StudentProgress = () => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">התקדמות</h2>
    <p className="text-gray-600">צפייה בהתקדמות שלך בלמידה</p>
  </div>
)

const StudentSettings = () => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">הגדרות חשבון</h2>
    <p className="text-gray-600">עדכון פרטי חשבון וסיסמה</p>
  </div>
)

const StudentDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">לוח סטודנט</h1>

      <div className="flex space-x-4 mb-4 flex-row-reverse">
        <button
          onClick={() => navigate('/student/courses')}
          className={`px-4 py-2 rounded ${location.pathname === '/student/courses' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          הקורסים שלי
        </button>
        <button
          onClick={() => navigate('/student/progress')}
          className={`px-4 py-2 rounded ${location.pathname === '/student/progress' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          התקדמות
        </button>
        <button
          onClick={() => navigate('/student/settings')}
          className={`px-4 py-2 rounded ${location.pathname === '/student/settings' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          הגדרות
        </button>
      </div>

      <Routes>
        <Route path="courses" element={<StudentCourses />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="settings" element={<StudentSettings />} />
      </Routes>
    </div>
  )
}

export default StudentDashboard
