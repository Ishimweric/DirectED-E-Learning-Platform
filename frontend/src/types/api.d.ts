export interface User {
  id: string
  email: string
  fullName: string
  role: "student" | "instructor" | "admin"
  avatar?: string
  bio?: string
  skills?: string[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  preferences?: {
    theme: "light" | "dark" | "system"
    notifications: {
      email: boolean
      push: boolean
      marketing: boolean
    }
    language: string
  }
  createdAt: string
  updatedAt: string
}



export interface Course {
  id: string
  title: string
  description: string
  shortDescription?: string
  instructorId: string;      // always the ID
  instructor?: User;  
  thumbnail?: string
  previewVideo?: string
  price: number
  originalPrice?: number
  currency?: string
  duration: number  // in minutes
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  subcategory?: string
  tags?: string[]
  rating: number
  reviewsCount?: number
  studentsCount: number
  language?: string
  // avatar: string 
  subtitles?: string[]
  requirements?: string[]
  whatYouWillLearn?: string[]
  targetAudience?: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  progress?: number
  learningOutcomes?: string[]
  isPublished?: boolean
  isEnroll?: boolean
  showEnrollModal?: boolean
}


export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl?: string
  content: string
  duration: number // in minutes
  order: number
  type: "video" | "text" | "quiz" | "assignment"
  resources?: Array<{
    title: string
    url: string
    type: "pdf" | "link" | "download"
  }>
  isPreview: boolean
  isCompleted?: boolean
  completedAt?: string
}





export interface Review {
  id: string
  courseId: string
  userId: string
  user: Pick<User, "id" | "fullName" | "avatar">
  rating: number
  comment: string
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number // percentage
  completedLessons: string[]
  currentLesson?: string
  timeSpent: number // in minutes
  enrolledAt: string
  completedAt?: string
  certificateUrl?: string
}


export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parentId?: string
  children?: Category[]
  coursesCount: number
}

// API Request/Response types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupRequest {
  fullName: string
  email: string
  password: string
  role: "student" | "instructor"
  agreeToTerms: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Array<{
    field?: string
    message: string
  }>
}

export interface ApiError {
  status: number
  message: string
  errors?: Array<{
    field?: string
    message: string
  }>
}

// Search and Filter types
export interface SearchCoursesRequest {
  query?: string
  category?: string
  level?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  sortBy?: "relevance" | "rating" | "price" | "newest" | "popular"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface CreateCourseRequest {
  title: string
  description: string
  shortDescription?: string
  category: string
  subcategory?: string
  level: "beginner" | "intermediate" | "advanced"
  price: number
  language: string
  requirements?: string[]
  whatYouWillLearn: string[]
  targetAudience?: string[]
  tags?: string[]
}

export interface UpdateProfileRequest {
  fullName?: string
  bio?: string
  skills?: string[]
  socialLinks?: User["socialLinks"]
  preferences?: User["preferences"]
}

// ../../types/api.ts
export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

