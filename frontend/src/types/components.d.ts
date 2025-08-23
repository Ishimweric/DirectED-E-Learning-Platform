import type React from "react"
import type { ReactNode } from "react"
import type { Course, Lesson, Quiz } from "./api"

export interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
  loading?: boolean
}

export interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  name?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  showCloseButton?: boolean
}

export interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
  showProgress?: boolean
  progress?: number
  variant?: "default" | "compact" | "detailed"
}

export interface LessonItemProps {
  lesson: Lesson
  isCompleted?: boolean
  isActive?: boolean
  onClick?: () => void
  showDuration?: boolean
}

export interface QuizResultProps {
  quiz: Quiz
  score: number
  totalQuestions: number
  correctAnswers: number
  onRetake?: () => void
  onContinue?: () => void
}

export interface ProgressCardProps {
  title: string
  progress: number
  total: number
  icon?: ReactNode
  color?: "primary" | "success" | "warning" | "error"
}

export interface AnalyticsChartProps {
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  type: "line" | "bar" | "pie" | "doughnut"
  title?: string
  height?: number
}

export interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  courseContext?: {
    courseId: string
    lessonId?: string
  }
}

export interface MessageBubbleProps {
  message: {
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
  isTyping?: boolean
}

export interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  backgroundImage?: string
}

export interface DashboardLayoutProps {
  children: ReactNode
  userRole?: "student" | "instructor"
}

export interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: "student" | "instructor" | "admin"
  redirectTo?: string
}
