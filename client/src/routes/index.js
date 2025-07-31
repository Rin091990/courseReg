import express from 'express'
import authRoutes from './auth.routes.js' // ← צור קובץ זה אם לא קיים

const router = express.Router()

router.use('/auth', authRoutes) // ← כל ה-auth תחת /auth

export default router
