import dotenv from 'dotenv'
dotenv.config() // ← חייב לבוא לפני הייבוא של config

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set!');
}

const config = {
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  clientUrl: 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  }
  
  // 👇 זה קריטי!
  export default config
  