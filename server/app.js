// server/app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import config from './config/index.js'
import connectToDB from './config/database.js'
import routes from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

// התחברות למסד נתונים
connectToDB()

const app = express()

// הגדרות בסיסיות
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}))
app.use(express.json({ limit: config.maxFileSize || '10mb' }))
app.use(express.urlencoded({ extended: true }))

// בריאות השרת
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Server is running properly',
    environment: process.env.NODE_ENV || 'development'
  })
})

// ברירת מחדל
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the project server!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  })
})

// ❗️החלק החשוב – שימוש בכל קבוצות הנתיבים תחת /api
app.use('/api', routes)

// טיפול ב-404
app.use(notFound)

// טיפול בשגיאות
app.use(errorHandler)

export default app
