import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/layouts/Layout'
import DashboardLayout from '../components/layouts/DashboardLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import AdminDashboard from '../pages/AdminDashboard'
import StudentDashboard from '../pages/StudentDashboard'
import AdminUsers from '../pages/AdminUsers'
import AdminCourses from '../pages/AdminCourses'
import NotFound from '../pages/NotFound'
import AvailableCourses from '../pages/AvailableCourses';
import MyCoursesPage from '../pages/MyCoursesPage';

import { ProtectedRoute, PublicRoute } from '../components/RouteGuards'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },
      {
        path: 'courses',
        element: <AvailableCourses />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'my-courses',
        element: <MyCoursesPage />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute adminOnly>
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'courses',
        element: <AdminCourses />
      }
      
      
    ]
  },
  {
    path: '/student/*',
    element: (
      <ProtectedRoute requiredRole="student">
        <DashboardLayout>
          <StudentDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
