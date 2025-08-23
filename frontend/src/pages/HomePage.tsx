"use client"

import { useEffect } from "react"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { BookOpen, Users, Award, Clock, Star, Play, ChevronRight, Menu, Sun } from "lucide-react"
import { useAuth }  from "../hooks/useAuth"

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleGetStarted = () => {
    navigate("/auth/signup")
  }

  const handleLogin = () => {
    navigate("/auth/login")
  }

  const handleBrowseCourses = () => {
    navigate("/courses")
  }

  const handleWatchDemo = () => {
    // Implement demo video modal or redirect
    console.log("Watch demo clicked")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground font-[family-name:var(--font-manrope)]">
                  DirectEd
                </span>
              </div>
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
                <a href="#instructors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instructors
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
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🚀 New: AI-Powered Learning Assistant
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-manrope)]">
              Learn Without <span className="text-accent">Limits</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your future with expert-led courses, personalized learning paths, and an AI assistant that
              adapts to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={handleGetStarted}>
                Start Learning Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" onClick={handleWatchDemo}>
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-manrope)]">
              Featured Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                image: "/placeholder.svg?height=200&width=300",
                price: "$89",
                category: "Development",
                id: "1",
              },
              {
                title: "Data Science & Machine Learning",
                instructor: "Dr. Michael Chen",
                rating: 4.8,
                students: 8900,
                duration: "60 hours",
                image: "/placeholder.svg?height=200&width=300",
                price: "$129",
                category: "Data Science",
                id: "2",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Emma Rodriguez",
                rating: 4.9,
                students: 6700,
                duration: "35 hours",
                image: "/placeholder.svg?height=200&width=300",
                price: "$79",
                category: "Design",
                id: "3",
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
                    <Badge variant="outline">{course.category}</Badge>
                    <span className="text-lg font-bold text-accent">{course.price}</span>
                  </div>
                  <CardTitle className="text-lg font-[family-name:var(--font-manrope)]">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => navigate(`/courses/${course.id}`)}>
                    View Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={handleBrowseCourses}>
              View All Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-manrope)]">
              Why Choose DirectEd?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience learning like never before with our innovative platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-accent" />,
                title: "Expert-Led Courses",
                description: "Learn from industry professionals with real-world experience",
              },
              {
                icon: <Users className="w-8 h-8 text-accent" />,
                title: "Interactive Learning",
                description: "Engage with peers and instructors in our collaborative environment",
              },
              {
                icon: <Award className="w-8 h-8 text-accent" />,
                title: "Certified Programs",
                description: "Earn recognized certificates to advance your career",
              },
              {
                icon: <Clock className="w-8 h-8 text-accent" />,
                title: "Flexible Schedule",
                description: "Learn at your own pace with 24/7 access to course materials",
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3 font-[family-name:var(--font-manrope)]">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-manrope)]">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "As an instructor, I love how DirectEd makes it easy to create engaging content and track student progress. The platform truly supports both teaching and learning.",
                name: "Dr. Lisa Park",
                role: "Data Science Instructor",
                company: "University of Technology",
                avatar: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "The flexibility of DirectEd allowed me to upskill while working full-time. I completed three courses and got promoted within six months!",
                name: "Marcus Johnson",
                role: "Marketing Manager",
                company: "Growth Solutions",
                avatar: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <span className="text-xl font-bold font-[family-name:var(--font-manrope)]">DirectEd</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Empowering learners worldwide with quality education and innovative technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-manrope)]">Courses</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Business
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-manrope)]">Company</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-manrope)]">Support</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 DirectEd. All rights reserved. Built with passion for education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
