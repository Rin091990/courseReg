// server/models/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'חובה להזין שם']
  },
  email: {
    type: String,
    required: [true, 'חובה להזין אימייל'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'חובה להזין סיסמה'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 🔐 Middleware להצפנת סיסמה לפני שמירה
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// 🔍 Method להשוואת סיסמה בעת התחברות
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema, 'users')
