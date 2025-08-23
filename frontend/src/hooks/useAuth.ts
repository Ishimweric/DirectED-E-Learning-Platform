"use client"

import { useState, useEffect, useCallback } from "react"
import type { User, LoginRequest, SignupRequest } from "../types/api"
import { authService } from "../services/api/auth"

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>
  signup: (userData: SignupRequest) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  const initializeAuth = useCallback(async () => {
    try {
      const storedUser = authService.getCurrentUserFromStorage()
      if (storedUser && authService.isAuthenticated()) {
        // Verify token is still valid by fetching current user
        const response = await authService.getCurrentUser()
        if (response.success && response.data) {
          setUser(response.data)
        } else {
          // Token is invalid, clear storage
          await authService.logout()
          setUser(null)
        }
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      await authService.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true)
    try {
      const response = await authService.login(credentials)
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return {
          success: false,
          message: response.message || "Login failed",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (userData: SignupRequest) => {
    setIsLoading(true)
    try {
      const response = await authService.signup(userData)
      if (response.success && response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return {
          success: false,
          message: response.message || "Signup failed",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) return

    try {
      const response = await authService.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error("Refresh user error:", error)
    }
  }, [])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
  }
}
