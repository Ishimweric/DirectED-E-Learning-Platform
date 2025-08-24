"use client"

import type React from "react"
import { DashboardLayout } from "../../components/layouts/DashboardLayout"
import { Button } from "../../components/common/Button"
import { 
  Users, 
  Clock, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Plus,
  AlertTriangle,
  MessageCircle,
  // Award, // Removed unused import
  // FileText, // Removed unused import
  // Sparkles, // Removed unused import
  // Certificate, // Removed unused import - doesn't exist in lucide-react
} from "lucide-react"

export const InstructorDashboardPage: React.FC = () => {
  return (
    <DashboardLayout userRole="instructor">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, James! Here's what's happening with the courses you've published.
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students Completed</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">128</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Student Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Student Analysis</h2>
            <button className="text-green-600 hover:text-green-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {[
              {
                course: "UI/UX fundamentals",
                completionRate: 85,
                time: "Tomorrow 10:00 AM",
              },
              {
                course: "Gen AI requirements",
                completionRate: 72,
                time: "Friday 2:00 PM",
              },
              {
                course: "FullStack Mern",
                completionRate: 91,
                time: "Monday 9:00 AM",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.course}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-medium text-gray-900">{item.completionRate}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{item.time}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${item.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-4">
                  View Course
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h2>
            <button className="text-green-600 hover:text-green-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Project Submission",
                course: "Full Stack web development",
                due: "Tomorrow",
                icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
                priority: "high"
              },
              {
                title: "Quiz: Functions & Modules",
                course: "Full Stack web development",
                due: "in 3 days",
                icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
                priority: "medium"
              },
              {
                title: "User Research Analysis",
                course: "Full Stack web development",
                due: "Next Week",
                icon: <BarChart3 className="w-5 h-5 text-gray-500" />,
                priority: "low"
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {item.icon}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.course}</p>
                </div>
                <span className="text-sm text-gray-600">{item.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Assignments</h2>
            <button className="text-green-600 hover:text-green-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Calculus Problem Set #5",
                course: "Advanced Mathematics",
                due: "Tomorrow",
                priority: "high"
              },
              {
                title: "Algorithm Analysis Report",
                course: "Computer Science",
                due: "in 3 days",
                priority: "medium"
              },
              {
                title: "Lab Report: Motion Physics",
                course: "Physics Laboratory",
                due: "next Week",
                priority: "low"
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.course}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{item.due}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-gray-900">Ask AI Assistant</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Ask tutor chat.</p>
            <Button variant="outline" size="sm" className="w-full">
              Start Chat
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Plus className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-gray-900">Create Courses</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Create the courses.</p>
            <Button variant="outline" size="sm" className="w-full">
              New Course
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-gray-900">Certificates</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">View your certifications.</p>
            <Button variant="outline" size="sm" className="w-full">
              View All
            </Button>
          </div>
        </div>

        {/* Create Course Button */}
        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
            Create Course
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
