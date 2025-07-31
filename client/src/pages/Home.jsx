import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ברוכים הבאים לפורטל הקורסים</h1>
        <p className="text-lg mb-6">ניהול קורסים, הרשמה, לוח אישי והרשאות מתקדמות</p>
        
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-16 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">הרשמה והתחברות</h3>
          <p className="text-gray-700">אימות משתמשים עם JWT והרשאות לפי תפקיד</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">ניהול קורסים</h3>
          <p className="text-gray-700">צפייה בקורסים, הוספה ועריכה למנהלים</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">סטודנטים ומרצים</h3>
          <p className="text-gray-700">התאמת תכנים ולוח אישי לפי סוג המשתמש</p>
        </div>
      </section>

      {/* Link to Courses */}
      <div className="text-center mt-12">
        <Link to="/courses" className="text-blue-700 hover:underline text-lg font-medium">
          עיין בקורסים זמינים →
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-16 text-sm text-gray-600">
        © 2025 כל הזכויות שמורות - מערכת הקורסים של האוניברסיטה
      </footer>
    </div>
  )
}

export default Home