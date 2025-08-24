"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/common/Button"
import { Logo } from "../../components/common/Logo"
import { ThemeToggle } from "../../components/common/ThemeToggle"
import { MobileSidebar } from "../../components/common/MobileSidebar"
import { useTheme } from "../../context/ThemeContext"
import { 
  Search, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Users, 
  ChevronDown 
} from "lucide-react"

export const CourseCatalogPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { isDark } = useTheme()

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "data-science", name: "Data Science" },
    { id: "business", name: "Business" },
  ]

  const courses = [
    {
      id: "1",
      title: "Advanced JavaScript Development",
      instructor: "John Doe",
      description: "Learn advanced JavaScript concepts and techniques for building robust web applications.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$49.99",
      originalPrice: "$99.99",
      category: "development",
      rating: 4.8,
      students: 12500,
      duration: "40 hours",
      level: "Advanced",
      featured: true,
    },
    {
      id: "2",
      title: "Data Science Fundamentals",
      instructor: "Jane Smith",
      description: "Master the basics of data science, including data analysis, visualization, and machine learning.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$59.99",
      originalPrice: "$119.99",
      category: "data-science",
      rating: 4.9,
      students: 8900,
      duration: "60 hours",
      level: "Intermediate",
      featured: true,
    },
    {
      id: "3",
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      description: "Learn to create user-friendly and visually appealing interfaces for web and mobile applications.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$79.99",
      originalPrice: "$149.99",
      category: "design",
      rating: 4.7,
      students: 6700,
      duration: "35 hours",
      level: "Beginner",
      featured: false,
    },
    {
      id: "4",
      title: "Digital Marketing Strategy",
      instructor: "Alex Lee",
      description: "Build effective digital marketing campaigns, SEO, social media, and content marketing strategies.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$39.99",
      originalPrice: "$79.99",
      category: "marketing",
      rating: 4.6,
      students: 4500,
      duration: "25 hours",
      level: "Intermediate",
      featured: false,
    },
    {
      id: "5",
      title: "React Development Bootcamp",
      instructor: "Chris Kim",
      description: "Complete React development course from basics to advanced concepts and real-world projects.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$69.99",
      originalPrice: "$139.99",
      category: "development",
      rating: 4.8,
      students: 9800,
      duration: "50 hours",
      level: "Intermediate",
      featured: true,
    },
    {
      id: "6",
      title: "Business Analytics",
      instructor: "Dr. Michael Chen",
      description: "Learn business analytics techniques to make data-driven decisions and improve business performance.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$89.99",
      originalPrice: "$179.99",
      category: "business",
      rating: 4.7,
      students: 3200,
      duration: "45 hours",
      level: "Advanced",
      featured: false,
    },
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} sticky top-0 z-50`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Logo size="md" variant={isDark ? "light" : "dark"} />
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/courses" className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  Courses
                </Link>
                <a href="#about" className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  About
                </a>
                <a href="#contact" className={`${isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <ThemeToggle />
                <Link to="/auth/login">
                  <Button variant="ghost" className={isDark ? 'text-white hover:bg-gray-700' : ''}>
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        userRole="student"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Explore Courses
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our comprehensive collection of courses designed to help you advance your career
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? 'bg-green-100 text-green-600'
                  : isDark 
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? 'bg-green-100 text-green-600'
                  : isDark 
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } ${viewMode === "list" ? 'flex' : ''}`}
            >
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    course.featured 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {course.featured ? 'Featured' : course.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {course.rating}
                    </span>
                  </div>
                </div>
                
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">{course.price}</span>
                    <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {course.originalPrice}
                    </span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      View Course
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <ChevronDown className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No courses found
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
