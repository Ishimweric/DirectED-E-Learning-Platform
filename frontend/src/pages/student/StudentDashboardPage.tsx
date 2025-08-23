"use client"

import type React from "react"
import { DashboardLayout } from "../../components/layouts/DashboardLayout"
import { ProgressCard } from "../../components/dashboards/ProgressCard"

export const StudentDashboardPage: React.FC = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard title="Courses Completed" progress={3} total={5} icon={<span>🎓</span>} color="success" />
          <ProgressCard title="Hours Learned" progress={24} total={40} icon={<span>⏰</span>} color="primary" />
          <ProgressCard title="Certificates Earned" progress={2} total={5} icon={<span>🏆</span>} color="warning" />
          <ProgressCard title="Current Streak" progress={7} total={30} icon={<span>🔥</span>} color="error" />
        </div>

        {/* Continue Learning */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock course data - replace with real data */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">React Development</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-sm text-gray-600">65% complete</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
