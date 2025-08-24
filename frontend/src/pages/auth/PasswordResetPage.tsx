"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthLayout } from "../../components/layouts/AuthLayout"
import { Button } from "../../components/common/Button"
import { Input } from "../../components/common/Input"

export default function PasswordResetPage() {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sending reset code to:", email)
    setStep("otp")
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Verifying OTP:", otp.join(""))
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement
        if (nextInput) nextInput.focus()
      }
    }
  }

  if (step === "otp") {
    return (
      <AuthLayout title="Enter Verification Code" subtitle="We've sent a 4-digit code to your email">
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                  maxLength={1}
                  required
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="w-8 h-0.5 bg-blue-500"></div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Verify
          </Button>

          <div className="text-center">
            <span className="text-gray-600">Didn't receive the code? </span>
            <button type="button" className="text-green-600 hover:underline">
              Resend
            </button>
          </div>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email address and we'll send you a code to reset your password">
      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <Input
          label="Email*"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Send Reset Code
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Remember your password? </span>
          <Link to="/auth/login" className="text-green-600 hover:underline">
            Back to Login
          </Link>
        </div>

        <div className="flex justify-center">
          <Button type="button" className="bg-green-600 hover:bg-green-700">
            CONTINUE
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
