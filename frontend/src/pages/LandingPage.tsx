"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { BookOpen, Users, Award, Clock, Star, Play, ChevronRight, Menu, Sun } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleGetStarted = () => {
    navigate("/signup")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleBrowseCourses = () => {
    navigate("/courses")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">DirectEd</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={handleBrowseCourses}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Courses
                </button>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Sun className="w-4 h-4" />
                </Button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={handleLogin}>
                  Log In
                </Button>
                <Button onClick={handleGetStarted}>Sign Up</Button>
              </div>
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Empower Learners Through <span className="text-primary">Accessible Education</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your future with expert-led courses, personalized learning paths, and cutting-edge technology
                that adapts to your learning style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={handleGetStarted}>
                  Start Learning
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oU8hbdzyYREjxqkVWWwJtMEpyng1oR.png"
                alt="Students learning together"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Web Development",
                description: "Learn modern web development with React, Node.js, and more",
                duration: "12 weeks",
                image: "/placeholder.svg?height=200&width=300",
                category: "Development",
              },
              {
                title: "Data Science",
                description: "Master data analysis, machine learning, and visualization",
                duration: "16 weeks",
                image: "/placeholder.svg?height=200&width=300",
                category: "Data Science",
              },
              {
                title: "UI/UX Design",
                description: "Create beautiful and functional user experiences",
                duration: "10 weeks",
                image: "/placeholder.svg?height=200&width=300",
                category: "Design",
              },
              {
                title: "Digital Marketing",
                description: "Build effective marketing strategies for the digital age",
                duration: "8 weeks",
                image: "/placeholder.svg?height=200&width=300",
                category: "Marketing",
              },
            ].map((course, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleBrowseCourses}>
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DirectEd */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose DirectEd?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12 text-primary" />,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience",
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Community Support",
                description: "Join a thriving community of learners and mentors",
              },
              {
                icon: <BookOpen className="w-12 h-12 text-primary" />,
                title: "Comprehensive Curriculum",
                description: "Structured learning paths designed for real-world success",
              },
              {
                icon: <Clock className="w-12 h-12 text-primary" />,
                title: "Flexible Learning",
                description: "Study at your own pace with lifetime access to materials",
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Community Says */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Community Says</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 text-center p-8">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl mb-6 leading-relaxed">
                  "DirectEd has completely transformed my career. The courses are practical, engaging, and the community
                  support is incredible. I went from beginner to landing my dream job in just 6 months!"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-primary-foreground/80">Software Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Start Learning */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their careers with DirectEd
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={handleGetStarted}>
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" onClick={handleBrowseCourses}>
              Browse Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-bold">DirectEd</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Empowering learners worldwide with quality education and innovative technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Facebook Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Instagram Feed
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Twitter Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    LinkedIn Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    YouTube Channel
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-primary-foreground/80 mb-4">© 2025 DirectEd. All rights reserved.</p>
              <div className="flex justify-center gap-4 text-sm">
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Cookie Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
