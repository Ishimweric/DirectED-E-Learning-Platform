import React from "react"

// simple helper to join class names
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "lg"
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  size,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === "ghost" && "bg-transparent hover:bg-gray-100",
        variant === "outline" && "border border-gray-300 hover:bg-gray-100",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        size === "sm" && "text-sm px-2 py-1",
        size === "lg" && "text-lg px-6 py-3",
        className
      )}
      {...props}
    />
  )
}
