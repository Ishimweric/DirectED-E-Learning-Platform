declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

// Environment variables
export interface EnvironmentConfig {
  REACT_APP_API_URL: string
  REACT_APP_CLOUDINARY_CLOUD_NAME?: string
  REACT_APP_CLOUDINARY_UPLOAD_PRESET?: string
  REACT_APP_GOOGLE_CLIENT_ID?: string
  REACT_APP_FACEBOOK_APP_ID?: string
}

// Theme types
export type ThemeMode = "light" | "dark" | "system"

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Filter types
export interface CourseFilters {
  category?: string
  level?: "beginner" | "intermediate" | "advanced"
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  duration?: {
    min: number
    max: number
  }
  tags?: string[]
  search?: string
}

// Progress tracking
export interface LearningProgress {
  courseId: string
  lessonId: string
  progress: number // 0-100
  timeSpent: number // in seconds
  lastAccessed: string
  isCompleted: boolean
}

// Chat/AI Assistant types
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  metadata?: {
    courseId?: string
    lessonId?: string
    context?: string
  }
}

export interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

// File upload types
export interface FileUpload {
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  url?: string
  error?: string
}

// Notification types
export interface Notification {
  id: string
  userId: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

// Analytics types
export interface CourseAnalytics {
  courseId: string
  totalStudents: number
  completionRate: number
  averageRating: number
  totalRevenue: number
  engagementMetrics: {
    averageTimeSpent: number
    dropoffPoints: string[]
    popularLessons: string[]
  }
}

export interface StudentAnalytics {
  userId: string
  coursesEnrolled: number
  coursesCompleted: number
  totalTimeSpent: number
  averageScore: number
  streakDays: number
  achievements: string[]
}
