"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardLayout } from "../../components/layouts/DashboardLayout"
import { CourseCard } from "../../components/courses/CourseCard"
import { Button } from "../../components/common/Button"
import { Input } from "../../components/common/Input"
import { useAuthContext } from "../../context/AuthContext"
import { coursesService } from "../../services/api/courses"
import type { Course } from "../../types/api"

export const CourseCatalogPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthContext()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const response = await coursesService.searchCourses({
          query: searchQuery,
          category: selectedCategory,
          page: 1,
          limit: 12,
        })

        if (response.success && response.data) {
          setCourses(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [searchQuery, selectedCategory])

  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/auth/login"
      return
    }

    try {
      const response = await coursesService.enrollInCourse(courseId)
      if (response.success) {
        // Show success message or redirect
        console.log("Enrolled successfully!")
      }
    } catch (error) {
      console.error("Enrollment failed:", error)
    }
  }

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary/10 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">👋</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isAuthenticated ? `Greetings, ${user?.fullName}!` : "Welcome to DirectEd!"}
            </h1>
            <p className="text-gray-600">
              {isAuthenticated
                ? "Discover a wide range of courses curated by industry experts."
                : "Explore our course catalog and start your learning journey today."}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search all courses available"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="Design">Design</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
          </select>
          <Button variant="outline">Sort by ↓</Button>
          <Button variant="outline">⊞</Button>
          <Button variant="outline">☰</Button>
        </div>
      </div>

      {/* Browse Catalog Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Browse Catalog</h2>
          <Button variant="outline">VIEW ALL</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return isAuthenticated ? (
    <DashboardLayout userRole={user?.role}>{content}</DashboardLayout>
  ) : (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">DirectEd</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/auth/login")}>
                Log In
              </Button>
              <Button onClick={() => (window.location.href = "/auth/signup")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{content}</main>
    </div>
  )
}
