// server/routes/enrollment.routes.js
import express from 'express'
import {
  enrollInCourse,
  getMyEnrollments,
  getEnrollmentsByCourse,
  cancelEnrollment
} from '../controllers/enrollmentController.js'

import authMiddleware, {
  isStudent,
  isInstructor,
  isAdmin
} from '../middleware/authmiddleware.js'

const router = express.Router()

// 📌 רישום לקורס (רק סטודנט)
router.post('/:courseId', authMiddleware, isStudent, enrollInCourse)

// 📘 צפייה בקורסים של המשתמש (רק סטודנט)
router.get('/my', authMiddleware, isStudent, getMyEnrollments)

// 📋 צפייה במי שנרשם לקורס מסוים (רק למרצה או אדמין)
router.get('/course/:courseId', authMiddleware, (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'instructor') {
    return next()
  }
  return res.status(403).json({ message: 'גישה למרצים או אדמינים בלבד' })
}, getEnrollmentsByCourse)


// ❌ ביטול רישום (סטודנט או אדמין)
router.delete('/:id', authMiddleware, cancelEnrollment)

export default router
