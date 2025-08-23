"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole?: "student" | "instructor" | "admin"
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole = "student" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const studentNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Courses", href: "/courses", icon: "📚" },
    { name: "My Courses", href: "/my-courses", icon: "📖" },
    { name: "Certificates", href: "/certificates", icon: "🏆" },
    { name: "Profile", href: "/profile", icon: "👤" },
    { name: "Notifications", href: "/notifications", icon: "🔔" },
    { name: "AI Assistant", href: "/assistant", icon: "🤖" },
  ]

  const instructorNavItems = [
    { name: "Dashboard", href: "/instructor/dashboard", icon: "📊" },
    { name: "My Courses", href: "/instructor/courses", icon: "📚" },
    { name: "Create Course", href: "/instructor/create-course", icon: "➕" },
    { name: "Quizzes", href: "/instructor/quizzes", icon: "❓" },
    { name: "Student Progress", href: "/instructor/analytics", icon: "📈" },
    { name: "Profile", href: "/profile", icon: "👤" },
    { name: "Notifications", href: "/notifications", icon: "🔔" },
    { name: "AI Assistant", href: "/assistant", icon: "🤖" },
  ]

  const navItems = userRole === "instructor" ? instructorNavItems : studentNavItems

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-primary">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold">D</span>
            </div>
            <span className="text-white font-bold text-xl">DirectEd</span>
          </div>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors ${
                location.pathname === item.href ? "bg-primary/10 text-primary border-r-2 border-primary" : ""
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <span className="sr-only">Open sidebar</span>☰
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <button className="p-2 text-gray-600 hover:text-gray-900">🌙</button>

              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
