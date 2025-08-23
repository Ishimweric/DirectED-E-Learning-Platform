"use client"

import type React from "react"
import { Link } from "react-router-dom"
import type { CourseCardProps } from "../../types/components"
import { Button } from "../common/Button"

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  showProgress = false,
  progress = 0,
  variant = "default",
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatPrice = (price: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price)
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
        variant === "compact" ? "max-w-sm" : "max-w-md"
      }`}
    >
      {/* Course Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              course.level === "Beginner"
                ? "bg-green-100 text-green-800"
                : course.level === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {formatDuration(course.duration)}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{course.category}</span>
          <span className="text-lg font-bold text-primary">{formatPrice(course.price, course.currency)}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.shortDescription || course.description}</p>

        <div className="flex items-center mb-3">
          <img
            src={course.instructor?.avatar || "/placeholder.svg?height=24&width=24"}
            alt={course.instructor?.fullName} 
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-700">{course.instructor?.fullName}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">({course.studentsCount.toLocaleString()} students)</span>
          </div>
        </div>

        {/* Progress Bar (if showing progress) */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/courses/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
          {onEnroll && !showProgress && (
            <Button onClick={() => onEnroll(course.id)} className="flex-1">
              Enroll Now
            </Button>
          )}
          {showProgress && (
            <Link to={`/courses/${course.id}/learn`} className="flex-1">
              <Button className="w-full">Continue Learning</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
