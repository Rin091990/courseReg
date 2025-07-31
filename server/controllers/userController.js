// server/controllers/userController.js

import User from '../models/User.js'

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'משתמש לא נמצא' })

    await user.deleteOne()
    res.status(200).json({ message: 'המשתמש נמחק בהצלחה' })
  } catch (error) {
    res.status(500).json({ message: 'שגיאה במחיקה', error: error.message })
  }
}

// שליפת כל המשתמשים (רק לאדמין)
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password')
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: 'שגיאה בטעינת המשתמשים', error: error.message })
    }
  }
  