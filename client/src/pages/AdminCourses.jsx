import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const AdminCourses = () => {
  const [courses, setCourses] = useState([])
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    hour: '',
    instructor: ''
  })
  const [activeTab, setActiveTab] = useState('view')

  // שליפת הטוקן מה־authStore
  const { token } = useAuthStore()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses')
      setCourses(res.data)
    } catch (err) {
      console.error('שגיאה בשליפת קורסים:', err)
    }
  }

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    try {
      await axios.post('/api/courses', newCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNewCourse({ title: '', description: '', hour: '', instructor: '' })
      fetchCourses()
      setActiveTab('view') // מעבר לטאב צפייה אחרי יצירה
    } catch (err) {
      console.error('שגיאה ביצירת קורס:', err.response?.data || err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק קורס זה?')) return
    try {
      await axios.delete(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchCourses()
    } catch (err) {
      console.error('שגיאה במחיקת קורס:', err.response?.data || err)
    }
  }

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
         מחיקת קורסים
        </button>
        <button
           onClick={() => setActiveTab('create')}
           className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
         יצירת קורס
        </button>
        
        </div>


      {/* טופס יצירה */}
      {activeTab === 'create' && (
        <div className="space-y-2 mb-6">
          <input
            type="text"
            name="title"
            placeholder="שם הקורס"
            value={newCourse.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="description"
            placeholder="תיאור"
            value={newCourse.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="time"
            name="hour"
            placeholder="שעה"
            value={newCourse.hour}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="instructor"
            placeholder="מרצה"
            value={newCourse.instructor}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
            הוסף קורס
          </button>
        </div>
      )}

      {/* הצגת קורסים */}
      {activeTab === 'view' && (
        <ul className="space-y-4">
          {courses.map(course => (
            <li
              key={course._id}
              className="bg-white p-4 shadow rounded"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                  {course.hour && <p className="text-gray-500">🕒 שעה: {course.hour}</p>}
                  {course.instructor && <p className="text-gray-500">👨‍🏫 מרצה: {course.instructor}</p>}
                </div>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-600 hover:underline"
                >
                  מחק
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminCourses
