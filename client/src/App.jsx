
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import { AuthLoader } from './components/RouteGuards'
import ErrorBoundary from './components/ErrorBoundary'

import './styles/index.css'


// TODO: יבא את הרכיבים והדפים הנדרשים
// TODO: הגדר routing עם React Router
// TODO: הגדר מערכת אימות
// TODO: הוסף לוגיקת הגנה על routes פרטיים



function App() {
  return(

    <ErrorBoundary>
      <AuthLoader>
        <RouterProvider router={router} />
      </AuthLoader>
    </ErrorBoundary>
  ) 
  
}

export default App

