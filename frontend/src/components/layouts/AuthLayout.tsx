import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  backgroundImage?: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  backgroundImage = "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image with overlay text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-green-800 to-green-900 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h1 className="text-3xl font-bold mb-4">Your learning journey starts here.</h1>
              <p className="text-lg opacity-90">
                Start your educational journey with DirectEd and unlock your potential through expert-led courses and interactive learning experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
