"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook to detect screen size and provide responsive utilities
 */
export function useResponsive() {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
        height
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

/**
 * Responsive container component that adapts its layout based on screen size
 */
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Responsive grid component that adapts columns based on screen size
 */
interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
  className?: string
}

export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 4,
  className = "" 
}: ResponsiveGridProps) {
  const gridClasses = [
    "grid",
    `grid-cols-${cols.mobile || 1}`,
    `md:grid-cols-${cols.tablet || 2}`,
    `lg:grid-cols-${cols.desktop || 3}`,
    `gap-${gap}`,
    className
  ].filter(Boolean).join(" ")

  return <div className={gridClasses}>{children}</div>
}

/**
 * Responsive text component that adapts font size based on screen size
 */
interface ResponsiveTextProps {
  children: React.ReactNode
  variant?: "heading" | "subheading" | "body" | "caption"
  className?: string
}

export function ResponsiveText({ children, variant = "body", className = "" }: ResponsiveTextProps) {
  const getTextClasses = () => {
    switch (variant) {
      case "heading":
        return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
      case "subheading":
        return "text-lg sm:text-xl md:text-2xl font-semibold"
      case "body":
        return "text-sm sm:text-base"
      case "caption":
        return "text-xs sm:text-sm text-gray-600"
      default:
        return "text-sm sm:text-base"
    }
  }

  return (
    <span className={`${getTextClasses()} ${className}`}>
      {children}
    </span>
  )
}

/**
 * Responsive card component that adapts padding and layout
 */
interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function ResponsiveCard({ children, className = "", hover = false }: ResponsiveCardProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-sm border border-gray-200
      p-4 sm:p-6
      ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}