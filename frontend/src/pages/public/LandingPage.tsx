"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/common/Button"
import { 
  Search, 
  Menu, 
  Users, 
  Clock, 
  Award, 
  BookOpen, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Heart,
  Target,
  Lightbulb,
  Rocket,
  GraduationCap,
  MessageCircle
} from "lucide-react"
import { Logo } from "../../components/common/Logo"
import { ThemeToggle } from "../../components/common/ThemeToggle"
import { MobileSidebar } from "../../components/common/MobileSidebar"
import { useTheme } from "../../context/ThemeContext"

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { number: "50K+", label: "Active Students", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Expert Courses", icon: <BookOpen className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <MessageCircle className="w-6 h-6" /> }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `${isDark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg'}`
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" variant={isDark ? "light" : "dark"} />

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className={`font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Courses
              </Link>
              <Link to="/about" className={`font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                About
              </Link>
              <Link to="/contact" className={`font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Contact
              </Link>
              <Link to="/pricing" className={`font-medium transition-colors hover:text-green-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className={`hidden md:flex items-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
                <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className={`ml-2 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>

              <ThemeToggle />

              <div className="hidden md:flex items-center space-x-3">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Get Started
                  </Button>
                </Link>
              </div>

              <button 
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500 opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master Your Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Join millions of learners worldwide and unlock your potential with expert-led courses, 
              hands-on projects, and a supportive community that accelerates your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Get Premium Access
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-white'} flex items-center justify-center shadow-lg`}>
                  <div className="text-green-500">{stat.icon}</div>
                </div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-green-600">DirectEd</span>?
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the future of learning with our cutting-edge platform designed to maximize your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast Learning",
                description: "Accelerate your learning with our optimized platform and expert-led courses designed for maximum retention."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Community",
                description: "Connect with learners from around the world, share experiences, and build lasting professional relationships."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Reliable",
                description: "Your data is protected with enterprise-grade security. Learn with confidence knowing your information is safe."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Personalized Paths",
                description: "AI-powered recommendations create custom learning paths tailored to your goals and skill level."
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Innovative Methods",
                description: "Learn through interactive exercises, real-world projects, and cutting-edge educational technology."
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Career Acceleration",
                description: "Transform your career with industry-recognized certifications and practical skills employers value."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                }`}
              >
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-green-600">Courses</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Hand-picked courses from industry experts to help you master in-demand skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Web Development",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 1247,
                price: "$89.99",
                originalPrice: "$199.99",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
                category: "Development",
                duration: "12 hours",
                level: "Advanced"
              },
              {
                title: "Data Science Masterclass",
                instructor: "Dr. Michael Chen",
                rating: 4.8,
                students: 2156,
                price: "$129.99",
                originalPrice: "$299.99",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
                category: "Data Science",
                duration: "18 hours",
                level: "Intermediate"
              },
              {
                title: "UI/UX Design Fundamentals",
                instructor: "Emma Rodriguez",
                rating: 4.7,
                students: 892,
                price: "$69.99",
                originalPrice: "$149.99",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
                category: "Design",
                duration: "10 hours",
                level: "Beginner"
              }
            ].map((course, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100'
                }`}
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.category === 'Development' ? 'bg-blue-100 text-blue-800' :
                      course.category === 'Design' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {course.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    by {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className={`ml-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {course.rating}
                        </span>
                      </div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        ({course.students.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold text-green-600`}>
                        {course.price}
                      </span>
                      <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {course.originalPrice}
                      </span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-green-600">Students Say</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied learners who have transformed their careers with DirectEd
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jennifer Martinez",
                role: "Software Engineer",
                company: "Google",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                content: "DirectEd transformed my career. The practical projects and expert mentorship helped me land my dream job at Google. The community support was incredible!",
                rating: 5,
                achievement: "Landed job at Google",
                course: "Full Stack Development"
              },
              {
                name: "Marcus Johnson",
                role: "Product Manager",
                company: "Microsoft",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                content: "The quality of instruction and real-world applications made all the difference. I'm now leading product teams at Microsoft thanks to DirectEd.",
                rating: 5,
                achievement: "Promoted to Senior PM",
                course: "Product Management"
              },
              {
                name: "Sophia Chen",
                role: "UX Designer",
                company: "Apple",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
                content: "From beginner to professional designer in just 6 months. DirectEd's structured approach and community support are unmatched. Highly recommended!",
                rating: 5,
                achievement: "Joined Apple Design Team",
                course: "UI/UX Design"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
                }`}
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className={`italic leading-relaxed mb-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.content}"
                </blockquote>

                {/* Achievement Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ${isDark ? 'bg-green-900 text-green-200' : ''}`}>
                    <Award className="w-4 h-4 mr-2" />
                    {testimonial.achievement}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-green-200"
                  />
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Completed: {testimonial.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Testimonial Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {[
              { number: "98%", label: "Success Rate", description: "Students achieve their learning goals" },
              { number: "4.9/5", label: "Average Rating", description: "From over 50,000 reviews" },
              { number: "500+", label: "Career Transitions", description: "Students switched careers successfully" },
              { number: "24/7", label: "Support Available", description: "Expert help whenever you need it" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 text-green-600`}>
                  {stat.number}
                </div>
                <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.label}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* CTA within Testimonials */}
          <div className="mt-16 text-center">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ready to Join Our Success Stories?
              </h3>
              <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Start your journey today and become the next success story. Join thousands of learners who have transformed their careers with DirectEd.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/testimonials">
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Read More Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join millions of learners worldwide and start your journey to success today. 
            No matter your background or experience level, we have the perfect course for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/auth/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/courses">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-white/80">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>Loved by 50K+ students</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6" />
              <span>Instant access to all courses</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-6 h-6" />
              <span>24/7 expert support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="lg" variant={isDark ? "light" : "dark"} />
              <p className={`mt-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Empowering learners worldwide with quality education and innovative technology. 
                Join our community and unlock your potential.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Platform</h3>
              <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link to="/courses" className="hover:text-green-500 transition-colors">Browse Courses</Link></li>
                <li><Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
                <li><Link to="/pricing" className="hover:text-green-500 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Support</h3>
              <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link to="/help" className="hover:text-green-500 transition-colors">Help Center</Link></li>
                <li><Link to="/community" className="hover:text-green-500 transition-colors">Community</Link></li>
                <li><Link to="/terms" className="hover:text-green-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect</h3>
              <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-green-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; 2024 DirectEd. All rights reserved. Made with ❤️ for learners worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
