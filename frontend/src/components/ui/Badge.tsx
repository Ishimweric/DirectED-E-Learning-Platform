import React from "react"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "secondary"
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", className, ...props }) => {
  let styles = ""
  if (variant === "outline") styles = "border border-gray-300 text-gray-700"
  else if (variant === "secondary") styles = "bg-gray-200 text-gray-800"
  else styles = "bg-blue-600 text-white"

  return (
    <span
      className={`px-2 py-1 rounded-md text-sm font-medium ${styles} ${className ?? ""}`}
      {...props}
    />
  )
}
