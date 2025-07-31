// server/routes/courseRoutes.js
import express from 'express'
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllCourses)
router.get('/:id', getCourseById)
router.post('/', protect, createCourse)
router.put('/:id', protect, updateCourse)
router.delete('/:id', protect, adminOnly, deleteCourse)

export default router
