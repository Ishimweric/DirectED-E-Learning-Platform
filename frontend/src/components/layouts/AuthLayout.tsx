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
  backgroundImage ="https://tse4.mm.bing.net/th/id/OIP.jGHnIsMnheNz_z8quCshTwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image with overlay text */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h1 className="text-3xl font-bold mb-4">Your learning journey starts here.</h1>
              <p className="text-lg opacity-90">
                Start your educational journey with DirectEd and unlock your potential through expertly curated courses
                and immersive learning experiences.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-400">24/7</div>
                  <div className="text-sm">Expert Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">100%</div>
                  <div className="text-sm">Mobile Ready</div>
                </div>
              </div>
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
