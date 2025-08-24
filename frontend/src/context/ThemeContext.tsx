import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("theme") as Theme
    if (saved && ["light", "dark", "system"].includes(saved)) {
      return saved
    }
    return "system"
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      setIsDark(systemTheme === "dark")
    } else {
      root.classList.add(theme)
      setIsDark(theme === "dark")
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement
        root.classList.remove("light", "dark")
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        root.classList.add(systemTheme)
        setIsDark(systemTheme === "dark")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
