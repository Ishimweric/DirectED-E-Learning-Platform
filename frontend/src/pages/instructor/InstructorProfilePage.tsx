"use client"

import type React from "react"
import { DashboardLayout } from "../../components/layouts/DashboardLayout"
import { Button } from "../../components/common/Button"
import { 
  Edit,
  CheckCircle,
  // Circle,
  MessageCircle
} from "lucide-react"

export const InstructorProfilePage: React.FC = () => {
  return (
    <DashboardLayout userRole="instructor">
      <div className="space-y-8">
        {/* Instructor Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">JA</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">James Alexi</h1>
              <p className="text-gray-600">UI/UX designer</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Dashboard
            </Button>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Bio
            </Button>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Hi there! I'm a passionate instructor always looking for new challenges and skills to master. 
            I love diving into topics like web development and photography and connecting with people who 
            share similar interests. Let's learn and grow together!
          </p>
        </div>

        {/* Courses I've Published */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Courses I've Published</h2>
          <div className="space-y-3">
            {[
              {
                title: "User Interface Design",
                status: "Done",
                icon: <CheckCircle className="w-5 h-5 text-blue-500" />
              },
              {
                title: "Inclusive Design",
                status: "Done",
                icon: <CheckCircle className="w-5 h-5 text-blue-500" />
              },
              {
                title: "Usability Testing",
                status: "Done",
                icon: <CheckCircle className="w-5 h-5 text-blue-500" />
              },
            ].map((course, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {course.icon}
                <span className="font-medium text-gray-900">{course.title}</span>
                <span className="text-sm text-blue-600 font-medium">{course.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work in Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Work in Progress</h2>
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {[
              {
                title: "UX Fundamentals",
                progress: 79,
                status: "In progress"
              },
              {
                title: "Information Architecture",
                progress: 50,
                status: "In progress"
              },
              {
                title: "Intro to Prototyping",
                progress: 50,
                status: "In progress"
              },
            ].map((course, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{course.title}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-600">{course.progress}%</span>
                    </div>
                    <span className="text-sm text-orange-600 font-medium">{course.status}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
