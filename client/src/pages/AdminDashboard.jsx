import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminCourses from './AdminCourses'
import AdminUsers from './AdminUsers'

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">לוח מנהל</h1>

      <div className="mt-4">
        <Routes>
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
