// server/controllers/authController.js
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// הרשמה
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'משתמש כבר קיים' })

    const user = await User.create({ name, email, password, role })
    const token = generateToken(user)
    res.status(201).json({ user: { id: user._id, name, email, role }, token })
  } catch (err) {
    res.status(500).json({ message: 'שגיאה ברישום', error: err.message })
  }
}

// התחברות
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'אימייל או סיסמה שגויים' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(400).json({ message: 'אימייל או סיסמה שגויים' })

    const token = generateToken(user)
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בהתחברות', error: err.message })
  }
}
