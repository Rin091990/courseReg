// server/controllers/courseController.js
import Course from '../models/Course.js'

// שליפת כל הקורסים
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email')
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בטעינת קורסים', error: error.message })
  }
}

// שליפת קורס בודד לפי ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email')
    if (!course) return res.status(404).json({ message: 'קורס לא נמצא' })
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בטעינה', error: error.message })
  }
}

// יצירת קורס (רק למרצה/אדמין)
export const createCourse = async (req, res) => {
  try {
    const { title, description, maxStudents } = req.body
    const course = await Course.create({
      title,
      description,
      maxStudents,
      instructor: req.user._id
    })
    res.status(201).json(course)
  } catch (error) {
    res.status(400).json({ message: 'שגיאה ביצירת קורס', error: error.message })
  }
}

// עדכון קורס (רק למרצה/אדמין)
export const updateCourse = async (req, res) => {
  try {
    const { title, description, maxStudents, isOpen } = req.body
    const course = await Course.findById(req.params.id)

    if (!course) return res.status(404).json({ message: 'קורס לא נמצא' })

    course.title = title ?? course.title
    course.description = description ?? course.description
    course.maxStudents = maxStudents ?? course.maxStudents
    course.isOpen = isOpen ?? course.isOpen

    await course.save()
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בעדכון קורס', error: error.message })
  }
}

// מחיקת קורס (רק לאדמין)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ message: 'קורס לא נמצא' })

    await course.deleteOne()
    res.status(200).json({ message: 'הקורס נמחק בהצלחה' })
  } catch (error) {
    res.status(500).json({ message: 'שגיאה במחיקה', error: error.message })
  }
}
