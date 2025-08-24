import type React from "react"
import logoImage from "../../assets/images/logo.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  variant?: "light" | "dark"
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  
}) => {
  const sizeClasses = {
    sm: "w-25 h-25",
    md: "w-50 h-50",
    lg: "w-75 h-75"
  }

  


  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Replaced SVG with Image */}
      <img
        src={logoImage}
        alt="DirectEd Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
     
    </div>
  )
}
