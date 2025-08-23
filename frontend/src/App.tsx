
import "./index.css"

import { ThemeProvider } from "./context/ThemeContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Public pages
import { LandingPage } from "./pages/public/LandingPage"
import { CourseCatalogPage } from "./pages/public/CourseCatalogPage"
import CourseDetailPage from "./pages/public/CourseDetailPage"

// Auth pages
import { LoginPage } from "./pages/auth/LoginPage"
import { SignupPage } from "./pages/auth/SignupPage"
import PasswordResetPage from "./pages/auth/PasswordResetPage"

// Student pages
import { StudentDashboardPage } from "./pages/student/StudentDashboardPage"
import MyCoursesPage from "./pages/student/MyCoursesPage"

// Shared pages
import ProfilePage from "./pages/shared/ProfilePage"
import NotificationsPage from "./pages/shared/NotificationPage"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/reset-password" element={<PasswordResetPage />} />

            {/* Student Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute requiredRole="student">
                  <MyCoursesPage />
                </ProtectedRoute>
              }
            />

            {/* Shared Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
