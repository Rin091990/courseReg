// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import config from '../config/index.js' // קובץ שמכיל jwtSecret

// אימות בסיסי של טוקן
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'אין טוקן, גישה נדחית' })
    }

    // אימות הטוקן
    const decoded = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'משתמש לא נמצא' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'טוקן לא תקין' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'גישה למנהלים בלבד' })
  }
  next()
}

const isInstructor = (req, res, next) => {
  if (req.user?.role !== 'instructor') {
    return res.status(403).json({ message: 'גישה למרצים בלבד' })
  }
  next()
}

const isStudent = (req, res, next) => {
  if (req.user?.role !== 'student') {
    return res.status(403).json({ message: 'גישה לסטודנטים בלבד' })
  }
  next()
}

// יצוא
export default authMiddleware
export { isAdmin, isInstructor, isStudent }
