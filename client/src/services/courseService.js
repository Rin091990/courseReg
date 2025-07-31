import axios from 'axios'

export const getCourses = async () => {
  const res = await axios.get('/api/courses')
  return res.data
}

export const createCourse = async (courseData) => {
  const res = await axios.post('/api/courses', courseData)
  return res.data
}

export const deleteCourse = async (id) => {
  const res = await axios.delete(`/api/courses/${id}`)
  return res.data
}

export const updateCourse = async (id, data) => {
  const res = await axios.put(`/api/courses/${id}`, data)
  return res.data
}
