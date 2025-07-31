

import mongoose from 'mongoose'
import config from './index.js' // ודא שיש export של mongoUri

const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message)
  }
}

export default connectToDB