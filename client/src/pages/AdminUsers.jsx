import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const { token } = useAuthStore()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(res.data)
    } catch (err) {
      console.error('שגיאה בטעינת משתמשים:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש הזה?')) return

    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchUsers()
    } catch (err) {
      console.error('שגיאה במחיקת משתמש:', err)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ניהול משתמשים</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email} ({user.role})</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="text-red-600 hover:underline"
            >
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminUsers
