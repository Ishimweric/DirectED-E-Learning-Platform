"use client"

import type React from "react"
import { DashboardLayout } from "../../components/layouts/DashboardLayout"
// import { ProgressCard } from "../../components/dashboards/ProgressCard"
import { Search, Grid, List, ArrowUp } from "lucide-react"
import { Button } from "../../components/common/Button"

export const StudentDashboardPage: React.FC = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Greeting Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Greetings, John!</h1>
          <p className="text-lg text-gray-600 mb-2">
            We're thrilled to have you join our community of learners
          </p>
          <p className="text-gray-600">
            Discover a wide range of courses curated by industry experts
          </p>
        </div>

        {/* Search and View Options */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search all courses available"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by</span>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button className="p-2 bg-green-100 text-green-600 rounded">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Design</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">C++ Programming</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Web Development</span>
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "UI/UX Design",
                category: "Design",
                duration: "8 Weeks",
                icon: "🎨",
                enrolled: true,
              },
              {
                title: "Design Systems",
                category: "Design",
                duration: "2-4 weeks",
                icon: "🔧",
                enrolled: true,
              },
              {
                title: "Color Theory",
                category: "Design",
                duration: "1-2 weeks",
                icon: "🎨",
                enrolled: true,
              },
              {
                title: "React Libraries",
                category: "Web Development",
                duration: "6-8 Weeks",
                icon: "⚛️",
                enrolled: false,
              },
              {
                title: "JavaScript",
                category: "Web Development",
                duration: "6-8 Weeks",
                icon: "JS",
                enrolled: false,
              },
              {
                title: "Typescript",
                category: "Web Development",
                duration: "6-8 Weeks",
                icon: "TS",
                enrolled: false,
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold">
                    {course.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                </div>
                {course.enrolled ? (
                  <Button variant="outline" className="w-full border-gray-300 text-gray-600">
                    Continue Learning
                  </Button>
                ) : (
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    ENROLL
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
