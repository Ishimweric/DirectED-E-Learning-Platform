"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthLayout } from "../../components/layouts/AuthLayout"
import { Button } from "../../components/common/Button"
import { Input } from "../../components/common/Input"

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log("Login attempt:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your DirectEd account">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link to="/auth/reset-password" className="text-sm text-green-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Sign In
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/auth/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full bg-transparent border-gray-300 hover:bg-gray-50">
              <span className="mr-2">G</span>
              Google
            </Button>
            <Button variant="outline" className="w-full bg-transparent border-gray-300 hover:bg-gray-50">
              <span className="mr-2">f</span>
              Facebook
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
