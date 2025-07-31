import React, { useState } from 'react'
import axios from 'axios'

const CreateCourseForm = ({ onCreate }) => {
  const [form, setForm] = useState({ title: '', description: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/courses', form)
      setForm({ title: '', description: '' })
      if (onCreate) onCreate()
    } catch (err) {
      console.error('שגיאה ביצירת קורס:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        type="text"
        name="title"
        placeholder="שם הקורס"
        value={form.title}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <textarea
        name="description"
        placeholder="תיאור"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        הוסף קורס
      </button>
    </form>
  )
}

export default CreateCourseForm
