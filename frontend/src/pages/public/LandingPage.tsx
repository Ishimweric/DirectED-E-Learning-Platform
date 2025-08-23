"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/common/Button"
// import DataScienceImg from "../assets/images/data-science.png";


export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DirectEd</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/courses" className="text-green-600 hover:text-gray-900 transition-colors">
                  Courses
                </Link>
                <a href="#about" className="text-green-600 hover:text-green-900 transition-colors">
                  About
                </a>
                <a href="#instructors" className="text-green-600 hover:text-gray-900 transition-colors">
                  Instructors
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/auth/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button >Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              🚀 New: AI-Powered Learning Assistant
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Empower Learners Through <span className="text-primary">Accessible Education</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your future with expert-led courses, personalized learning paths, and an AI assistant that
              adapts to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button size="lg" className="text-lg px-8">
                  Start Learning Today →
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                ▶ Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack Web Development",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 12500,
                duration: "40 hours",
                image:
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"  ,
                price: "$89",
                category: "Development",
              },
              {
                title: "Data Science & Machine Learning",
                instructor: "Dr. Michael Chen",
                rating: 4.8,
                students: 8900,
                duration: "60 hours",
                image:
                 "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
                price: "$129",
                category: "Data Science",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Emma Rodriguez",
                rating: 4.9,
                students: 6700,
                duration: "35 hours",
                image:
                  "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800" ,
                price: "$79",
                category: "Design",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {course.category}
                    </span>
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{course.rating}</span>
                    </div>
                    <span>{course.students.toLocaleString()} students</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button className="w-full">View Course</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                View All Courses →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose DirectEd?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience learning like never before with our innovative platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "Expert-Led Courses",
                description: "Learn from industry professionals with real-world experience",
              },
              {
                icon: "👥",
                title: "Interactive Learning",
                description: "Engage with peers and instructors in our collaborative environment",
              },
              {
                icon: "🏆",
                title: "Certified Programs",
                description: "Earn recognized certificates to advance your career",
              },
              {
                icon: "⏰",
                title: "Flexible Schedule",
                description: "Learn at your own pace with 24/7 access to course materials",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our students and instructors about their DirectEd experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DirectEd transformed my career. The courses are practical, engaging, and the AI assistant helped me stay on track throughout my learning journey.",
                name: "Alex Thompson",
                role: "Software Developer",
                company: "TechCorp",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cToNGSB0t1CP4Deuo7baKmIsFJSaoR.png",
              },
              {
                quote:
                  "As an instructor, I love how DirectEd makes it easy to create engaging content and track student progress. The platform truly supports both teaching and learning.",
                name: "Dr. Lisa Park",
                role: "Data Science Instructor",
                company: "University of Technology",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cToNGSB0t1CP4Deuo7baKmIsFJSaoR.png",
              },
              {
                quote:
                  "The flexibility of DirectEd allowed me to upskill while working full-time. I completed three courses and got promoted within six months!",
                name: "Marcus Johnson",
                role: "Marketing Manager",
                company: "Growth Solutions",
                avatar:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cToNGSB0t1CP4Deuo7baKmIsFJSaoR.png",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-gray-900 mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their careers with DirectEd
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">D</span>
                </div>
                <span className="text-xl font-bold">DirectEd</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                Empowering learners worldwide with quality education and innovative technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram Feed
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube Channel
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; 2025 DirectEd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
