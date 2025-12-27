'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { ROUTES } from '@/constants/routes'
import { Menu, X } from 'lucide-react'
import { useNavigation } from '@/context/NavigationContext'

export default function TopNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { setDirection, setTransitioning } = useNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate direction based on route indices
  const getDirection = useCallback((targetIndex: number, currentIndex: number) => {
    if (currentIndex === -1) return 'forward'
    return targetIndex > currentIndex ? 'forward' : 'backward'
  }, [])

  const handleNavigate = useCallback((path: string, direction: 'forward' | 'backward') => {
    setDirection(direction)
    setTransitioning(true)
    router.push(path)

    // Reset transition state after animation
    setTimeout(() => {
      setTransitioning(false)
      setDirection('none')
    }, 400)
  }, [router, setDirection, setTransitioning])

  const currentIndex = ROUTES.findIndex(r => r.path === pathname)

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-primary/95 backdrop-blur-md border-b border-secondary/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Name - Left side */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname !== '/') {
                    e.preventDefault()
                    handleNavigate('/', 'backward')
                  }
                }}
                className="text-xl font-bold text-white tracking-wide hover:text-secondary transition-colors"
              >
                ZULQARNAIN
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1">
              {ROUTES.map((route, index) => {
                const isActive = pathname === route.path
                const direction = getDirection(index, currentIndex)

                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault()
                        handleNavigate(route.path, direction)
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-secondary/20 border border-secondary/40'
                        : 'text-secondary hover:text-white hover:bg-tertiary/50'
                    }`}
                  >
                    {route.label}
                  </Link>
                )
              })}
              {/* Download CV Button */}
              <a
                href="/assets/resume.pdf"
                download
                className="ml-4 px-4 py-2 bg-secondary/20 border border-secondary/40 text-white rounded-lg text-sm font-medium hover:bg-secondary/40 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                CV
              </a>
            </div>

            {/* Mobile Menu Button - Right side */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-secondary hover:text-white hover:bg-tertiary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/98 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative z-50 pt-24 px-4">
            <div className="flex flex-col space-y-2">
              {ROUTES.map((route, index) => {
                const isActive = pathname === route.path
                const direction = getDirection(index, currentIndex)

                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault()
                        setIsMobileMenuOpen(false)
                        handleNavigate(route.path, direction)
                      } else {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className={`px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-secondary/30 border border-secondary/50'
                        : 'text-secondary hover:text-white hover:bg-tertiary/70'
                    }`}
                  >
                    {route.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
