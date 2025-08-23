import type React from "react"
import type { ProgressCardProps } from "../../types/components"

export const ProgressCard: React.FC<ProgressCardProps> = ({ title, progress, total, icon, color = "primary" }) => {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0

  const getColorClasses = () => {
    switch (color) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          progress: "bg-green-500",
        }
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          progress: "bg-yellow-500",
        }
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          progress: "bg-red-500",
        }
      default:
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          text: "text-primary",
          progress: "bg-primary",
        }
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {icon && <div className={`${colors.text}`}>{icon}</div>}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            {progress} of {total}
          </span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${colors.progress} h-3 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        {percentage === 100 ? (
          <span className="text-green-600 font-medium">✓ Completed</span>
        ) : (
          <span>{total - progress} remaining</span>
        )}
      </div>
    </div>
  )
}
