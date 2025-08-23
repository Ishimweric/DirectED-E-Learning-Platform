"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../../components/common/Button"

interface Notification {
  id: string
  type: "course" | "system" | "achievement" | "message"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "course",
      title: "New lesson available",
      message: 'A new lesson "Advanced React Hooks" has been added to your enrolled course.',
      timestamp: "2024-01-15T10:30:00Z",
      isRead: false,
      actionUrl: "/courses/1/learn",
    },
    {
      id: "2",
      type: "achievement",
      title: "Course completed!",
      message: 'Congratulations! You have successfully completed "UX/UI Design Fundamentals".',
      timestamp: "2024-01-14T15:45:00Z",
      isRead: false,
      actionUrl: "/certificates/1",
    },
    {
      id: "3",
      type: "system",
      title: "System maintenance",
      message: "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM EST.",
      timestamp: "2024-01-13T09:00:00Z",
      isRead: true,
    },
    {
      id: "4",
      type: "message",
      title: "New message from instructor",
      message: "Sarah Johnson has sent you a message regarding your recent assignment submission.",
      timestamp: "2024-01-12T14:20:00Z",
      isRead: true,
      actionUrl: "/messages/instructor-1",
    },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "course" | "system" | "achievement" | "message">("all")

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.isRead
    return notif.type === filter
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "course":
        return "📚"
      case "achievement":
        return "🏆"
      case "system":
        return "⚙️"
      case "message":
        return "💬"
      default:
        return "🔔"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your learning progress and important announcements
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "all", label: "All", count: notifications.length },
            { key: "unread", label: "Unread", count: unreadCount },
            { key: "course", label: "Courses", count: notifications.filter((n) => n.type === "course").length },
            {
              key: "achievement",
              label: "Achievements",
              count: notifications.filter((n) => n.type === "achievement").length,
            },
            { key: "system", label: "System", count: notifications.filter((n) => n.type === "system").length },
            { key: "message", label: "Messages", count: notifications.filter((n) => n.type === "message").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zm6 10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for new updates.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border p-6 ${
                !notification.isRead ? "border-l-4 border-l-green-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                    <p className="text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                          View Details
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
