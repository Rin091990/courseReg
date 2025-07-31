// server/models/Course.js
import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'חובה להזין שם קורס']
  },
  description: {
    type: String,
    default: ''
  },
  instructor: {
    type: String,
    required: [true, 'חובה להזין שם המרצה']
  },
  hour: {
    type: String,
    default: ''
  },
  maxStudents: {
    type: Number,
    default: 30,
    min: [1, 'מספר תלמידים חייב להיות לפחות 1']
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Course', courseSchema, 'courses')
