import type React from "react"
import  GeistSans  from "geist/font/sans"
import { AuthProvider } from "../context/AuthContext"
// import { ThemeProvider } from "../context/ThemeContext"
import { DashboardLayout } from "../components/layouts/DashboardLayout"
import "./globals.css"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistSans.variable};
  
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable}  antialiased`}>
        {/* <ThemeProvider> */}
          <AuthProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
