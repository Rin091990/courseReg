// server/utils/createDefaultAdmin.js
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const createDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@gmail.com'

    // בדיקה אם המשתמש כבר קיים
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('🟡 משתמש אדמין כבר קיים.')
      return
    }

    // אם לא קיים, ניצור אותו
    const hashedPassword = await bcrypt.hash('123456', 10)

    const newAdmin = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: 123456,
      role: 'admin'
    })

    console.log(`✅ אדמין נוצר: ${newAdmin.email}`)
  } catch (error) {
    console.error('❌ שגיאה ביצירת אדמין:', error.message)
  }
}
