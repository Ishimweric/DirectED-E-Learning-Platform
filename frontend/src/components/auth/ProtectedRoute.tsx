"use client"

import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import type { ProtectedRouteProps } from "../../types/components"

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}) => {
  const { user, isAuthenticated, isLoading } = useAuthContext()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check role-based access if required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on user role
    const roleRedirects = {
      student: "/dashboard",
      instructor: "/instructor/dashboard",
      admin: "/admin/dashboard",
    }

    return <Navigate to={roleRedirects[user.role] || "/dashboard"} replace />
  }

  return <>{children}</>
}
