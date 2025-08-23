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
       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
  <input
    type="text"
    placeholder="Test typing"
    className="border p-2 w-full"
  />
</div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 mb-1">
            Account Type <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="student">Student - I want to learn new skills</option>
            <option value="instructor">Instructor - I want to teach and share knowledge</option>
          </select>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" required />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button type="submit" className="w-full text-bg-green">
          Create Account
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
