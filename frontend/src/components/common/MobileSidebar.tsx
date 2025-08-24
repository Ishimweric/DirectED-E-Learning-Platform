import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  Grid3X3, 
  Compass, 
  List, 
  FileText, 
  Bell, 
  User, 
  Sparkles, 
  Sun,
  LogOut,
  X
} from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { Logo } from "./Logo"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole?: "student" | "instructor"
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  userRole = "student" 
}) => {
  const location = useLocation()
  const { isDark, setTheme } = useTheme()

  const navItems = userRole === "instructor" ? [
    { name: "Landing page", href: "/", icon: <Grid3X3 className="w-5 h-5" /> },
    { name: "Courses", href: "/courses", icon: <Compass className="w-5 h-5" /> },
    { name: "My Courses", href: "/instructor/courses", icon: <List className="w-5 h-5" /> },
    { name: "Create Course", href: "/instructor/create-course", icon: <FileText className="w-5 h-5" /> },
    { name: "Quiz", href: "/instructor/quizzes", icon: <Bell className="w-5 h-5" /> },
    { name: "Profile", href: "/instructor/profile", icon: <User className="w-5 h-5" /> },
    { name: "AI Assistant", href: "/assistant", icon: <Sparkles className="w-5 h-5" /> },
  ] : [
    { name: "Landing page", href: "/", icon: <Grid3X3 className="w-5 h-5" /> },
    { name: "Courses", href: "/courses", icon: <Compass className="w-5 h-5" /> },
    { name: "My Courses", href: "/my-courses", icon: <List className="w-5 h-5" /> },
    { name: "Profile", href: "/profile", icon: <User className="w-5 h-5" /> },
    { name: "AI Assistant", href: "/assistant", icon: <Sparkles className="w-5 h-5" /> },
  ]

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <Logo size="md" variant="light" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.href 
                  ? "bg-green-600 text-white" 
                  : "text-green-800 hover:bg-green-50"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center px-4 py-3 mb-2 rounded-lg text-green-800 hover:bg-green-50 transition-colors w-full"
          >
            <Sun className="w-5 h-5 mr-3" />
            <span className="font-medium">Toggle Theme</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              // Handle logout
              onClose()
            }}
            className="flex items-center px-4 py-3 mb-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </>
  )
}
