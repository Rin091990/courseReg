// server/controllers/enrollmentController.js
import Enrollment from '../models/Enrollment.js'
import Course from '../models/Course.js'

// 📌 רישום לקורס
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params
    const studentId = req.user._id

    const course = await Course.findById(courseId)
    if (!course) return res.status(404).json({ message: 'קורס לא נמצא' })
    if (!course.isOpen) return res.status(400).json({ message: 'הרישום לקורס סגור' })
    if (course.enrolledCount >= course.maxStudents) {
      return res.status(400).json({ message: 'הקורס מלא' })
    }

    // בדיקה אם כבר רשום
    const existing = await Enrollment.findOne({ course: courseId, student: studentId })
    if (existing) {
      return res.status(400).json({ message: 'כבר רשום לקורס' })
    }

    // יצירת הרשמה
    await Enrollment.create({ student: studentId, course: courseId })

    // עדכון מספר נרשמים בקורס
    course.enrolledCount += 1
    await course.save()

    res.status(201).json({ message: 'נרשמת בהצלחה' })
  } catch (error) {
    res.status(500).json({ message: 'שגיאה ברישום לקורס', error: error.message })
  }
}

// 📘 קורסים שהמשתמש הנוכחי רשום אליהם
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course')

    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת הרשמות', error: error.message })
  }
}

// 📋 שליפת כל הסטודנטים שרשומים לקורס מסוים
export const getEnrollmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params

    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'name email')

    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת סטודנטים', error: error.message })
  }
}

// ❌ ביטול רישום לקורס
export const cancelEnrollment = async (req, res) => {
  try {
    const { id } = req.params
    const enrollment = await Enrollment.findById(id).populate('course')

    if (!enrollment) return res.status(404).json({ message: 'הרישום לא נמצא' })

    const isOwner = enrollment.student.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'אין הרשאה לבטל רישום זה' })
    }

    // עדכון קורס
    const course = enrollment.course
    course.enrolledCount = Math.max(0, course.enrolledCount - 1)
    await course.save()

    // מחיקת ההרשמה
    await enrollment.deleteOne()

    res.status(200).json({ message: 'הרישום בוטל' })
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בביטול הרשמה', error: error.message })
  }
}
