import express from 'express'
import { deleteUser, getAllUsers } from '../controllers/userController.js'
import authMiddleware, { isAdmin } from '../middleware/authmiddleware.js'

const router = express.Router()

//  שליפת כל המשתמשים – אדמין בלבד
router.get('/', authMiddleware, isAdmin, getAllUsers)

// מחיקת משתמש – אדמין בלבד
router.delete('/:id', authMiddleware, isAdmin, deleteUser)

export default router
