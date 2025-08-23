import type {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  ApiResponse,
  User,
  UpdateProfileRequest,
} from "../../types/api"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

class AuthService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store tokens
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("refreshToken", data.data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.data.user))
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to connect to server" }],
      }
    }
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store tokens
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("refreshToken", data.data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.data.user))
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to connect to server" }],
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
    }
  }

  async forgotPassword(email: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to connect to server" }],
      }
    }
  }

  async resetPassword(resetData: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to connect to server" }],
      }
    }
  }

  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("refreshToken", data.data.refreshToken)
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Failed to refresh token",
        errors: [{ message: "Token refresh failed" }],
      }
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders(),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to fetch user data" }],
      }
    }
  }

  async updateProfile(profileData: UpdateProfileRequest): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to update profile" }],
      }
    }
  }

  getCurrentUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
