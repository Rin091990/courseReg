import express from 'express'

// קודם יוצרים את ה-router
const router = express.Router()

// ייבוא כל קבצי הנתיבים
import authRoutes from './auth.routes.js'
import courseRoutes from './course.routes.js'
import enrollmentRoutes from './enrollment.routes.js'
import userRoutes from './user.routes.js'

// הגדרת כל הנתיבים לפי קבוצה
router.use('/auth', authRoutes)                // הרשמה והתחברות
router.use('/courses', courseRoutes)           // קורסים
router.use('/enrollments', enrollmentRoutes)   // רישום לקורסים
router.use('/users', userRoutes)               // ✅ משתמשים

// בדיקת בריאות השרת
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'השרת פועל תקין'
  })
})

export default router
