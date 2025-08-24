"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthLayout } from "../../components/layouts/AuthLayout"
import { Button } from "../../components/common/Button"
import { Input } from "../../components/common/Input"

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup attempt:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Join DirectEd and start learning today">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full name*"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          label="Email address*"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password*"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          label="Confirm password*"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Account Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Student - I want to learn new skills.</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="instructor"
                checked={formData.role === "instructor"}
                onChange={handleChange}
                className="mr-3 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Instructor - I want to teach and share knowledge.</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <input 
            type="checkbox" 
            className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500" 
            required 
          />
          <span className="ml-2 text-sm text-gray-600">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-green-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Create Account
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/auth/login" className="text-green-600 hover:underline">
            Sign in here
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
