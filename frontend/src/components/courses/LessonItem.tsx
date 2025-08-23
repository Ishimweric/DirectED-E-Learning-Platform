"use client"

import type React from "react"
import type { LessonItemProps } from "../../types/components"

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  isCompleted = false,
  isActive = false,
  onClick,
  showDuration = true,
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return "▶️"
      case "text":
        return "📄"
      case "quiz":
        return "❓"
      case "assignment":
        return "📝"
      default:
        return "📚"
    }
  }

  return (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-primary text-white"
          : isCompleted
            ? "bg-green-50 hover:bg-green-100"
            : "bg-gray-50 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {/* Completion Status */}
      <div className="flex-shrink-0 mr-3">
        {isCompleted ? (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        ) : (
          <div className={`w-6 h-6 border-2 rounded-full ${isActive ? "border-white" : "border-gray-300"}`}>
            {isActive && (
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lesson Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center mb-1">
          <span className="mr-2">{getTypeIcon(lesson.type)}</span>
          <h4 className={`font-medium truncate ${isActive ? "text-white" : "text-gray-900"}`}>{lesson.title}</h4>
        </div>
        {lesson.description && (
          <p className={`text-sm truncate ${isActive ? "text-white/80" : "text-gray-600"}`}>{lesson.description}</p>
        )}
      </div>

      {/* Duration */}
      {showDuration && (
        <div className="flex-shrink-0 ml-3">
          <span className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>
            {formatDuration(lesson.duration)}
          </span>
        </div>
      )}
    </div>
  )
}
