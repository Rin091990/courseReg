import express from 'express'
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js'

import authMiddleware, {
  isAdmin,
  isInstructor
} from '../middleware/authmiddleware.js'

const router = express.Router()

// 📘 שליפת כל הקורסים – פתוח לכולם
router.get('/', getAllCourses)

// 🔍 שליפת קורס לפי ID – פתוח לכול
router.get('/:id', getCourseById)

// ➕ יצירת קורס – רק מרצה או אדמין
router.post('/', authMiddleware, isAdmin, createCourse)

// ✏️ עדכון קורס – רק מרצה או אדמין
router.put('/:id', authMiddleware, isAdmin, updateCourse)

// 🗑️ מחיקת קורס – רק אדמין
router.delete('/:id', authMiddleware, isAdmin, deleteCourse)

export default router
