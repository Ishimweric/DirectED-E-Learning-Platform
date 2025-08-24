"use client"

import { Button } from "../../components/common/Button"
import { ArrowRight } from "lucide-react"

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DirectEd</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Courses
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <span className="text-lg">🌙</span>
                </button>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Course Information */}
          <div className="space-y-8">
            {/* Course Overview */}
            <div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Design
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4">UX/UI Design</h1>
              <p className="text-gray-600 mb-4">
                DirectEd provides a wide variety of courses, from beginner to advanced levels, across multiple disciplines, 
                ensuring learners have access to comprehensive and engaging educational content.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg font-semibold text-gray-900">8 weeks course</span>
                <Button className="bg-green-600 hover:bg-green-700">
                  ENROLL
                </Button>
              </div>
            </div>

            {/* About the Course */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the course</h2>
              <p className="text-gray-600 leading-relaxed">
                UX/UI design focuses on creating intuitive and engaging digital experiences for users. UX (User Experience) 
                design emphasizes understanding user needs, usability, and functionality, while UI (User Interface) design 
                concentrates on the visual aspects, ensuring the interface is aesthetically pleasing and interactive. 
                Together, they enhance user satisfaction and product effectiveness.
              </p>
            </div>

            {/* Course Program */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">UX/UI Design Course Program</h2>
              <div className="space-y-3">
                {[
                  "Introduction. Basic information to start the course",
                  "Designing the User Experience",
                  "Information Architecture",
                  "Introduction to figma",
                  "Prototyping",
                  "UI Composition",
                  "Designing the User Interface",
                  "UI Typography"
                ].map((module, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer">
                    <ArrowRight className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900">{module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Course Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="UX/UI Design Course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Preview</h3>
                  <p className="text-sm text-gray-600">
                    Get a glimpse of what you'll learn in this comprehensive UX/UI design course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
