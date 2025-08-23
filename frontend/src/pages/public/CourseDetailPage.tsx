"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "../../components/common/Button"
import { Modal } from "../../components/common/Modal"

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Mock course data - in real app, fetch based on id
  const course = {
    id: id || "1",
    title: "UX/UI Design",
    description:
      "DirectEd provides a wide variety of courses, from beginner to advanced levels, across multiple disciplines, ensuring learners have access to comprehensive and engaging educational content.",
    instructorId: "123",
      instructor: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Senior UX Designer with 8+ years of experience at top tech companies.",
    } ,
    duration: 120,
    level: "Beginner",
    image: "/placeholder.svg?height=400&width=600",
    curriculum: [
      { title: "Introduction: Basic information to start the course", duration: "2 min" },
      { title: "Designing the User Experience", duration: "5 min" },
      { title: "Information Architecture", duration: "12 min" },
      { title: "Introduction to figma", duration: "3 min" },
      { title: "Prototyping", duration: "8 min" },
      { title: "UI Composition", duration: "15 min" },
      { title: "Designing the User Interface", duration: "10 min" },
      { title: "UI Typography", duration: "7 min" },
    ],
    learningOutcomes: [
      "Setting up the environment",
      "Advanced HTML Practices",
      "Build a portfolio website",
      "Responsive Designs",
    ],
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    setShowEnrollModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-xl">DirectEd</span>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-green-600">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600">
                About
              </Link>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Course Header */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-3">
                  Design
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{course.duration} COURSE</span>
                </div>
              </div>
              <div className="ml-6">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-64 h-40 object-cover rounded-lg"
                />
                <Button
                  onClick={handleEnroll}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "ENROLLED" : "ENROLL"}
                </Button>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About the course</h2>
              <p className="text-gray-700 leading-relaxed">
                UX/UI design focuses on creating intuitive and engaging digital experiences for users. UX (User
                Experience) design emphasizes understanding user needs, usability, and functionality, while UI (User
                Interface) design concentrates on the visual aspects, ensuring the interface is aesthetically pleasing
                and interactive. Together, they enhance user satisfaction and product effectiveness.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">UX/UI Design Course Program</h2>
              <div className="space-y-3">
                {course.curriculum.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)}>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">You have Successfully Enrolled.</h3>
          <Button onClick={() => setShowEnrollModal(false)} className="mt-4 bg-green-600 hover:bg-green-700">
            CONTINUE
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CourseDetailPage
