'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getNextRoute, getPrevRoute, ROUTES } from '@/constants/routes'
import { useNavigation } from '@/context/NavigationContext'

export default function NavigationArrows() {
  const pathname = usePathname()
  const router = useRouter()
  const { setDirection, setTransitioning } = useNavigation()
  
  const prevRoute = getPrevRoute(pathname)
  const nextRoute = getNextRoute(pathname)
  
  const currentIndex = ROUTES.findIndex(r => r.path === pathname)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === ROUTES.length - 1

  const handleNavigate = (path: string, direction: 'forward' | 'backward') => {
    setDirection(direction)
    setTransitioning(true)
    router.push(path)
    
    // Reset transition state after animation
    setTimeout(() => {
      setTransitioning(false)
      setDirection('none')
    }, 500)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevRoute) {
        e.preventDefault()
        handleNavigate(prevRoute, 'backward')
      } else if (e.key === 'ArrowRight' && nextRoute) {
        e.preventDefault()
        handleNavigate(nextRoute, 'forward')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevRoute, nextRoute])

  return (
    <>
      {/* Left Arrow - Previous Section */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          prevRoute
            ? 'opacity-100 cursor-pointer hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link
          href={prevRoute || '#'}
          onClick={(e) => {
            e.preventDefault()
            if (prevRoute) handleNavigate(prevRoute, 'backward')
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-tertiary/80 backdrop-blur-sm border border-secondary/30 hover:border-secondary hover:bg-tertiary transition-all duration-300 group"
          aria-label="Previous section"
        >
          <ChevronLeft className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
        </Link>
      </div>

      {/* Right Arrow - Next Section */}
      <div
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          nextRoute
            ? 'opacity-100 cursor-pointer hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link
          href={nextRoute || '#'}
          onClick={(e) => {
            e.preventDefault()
            if (nextRoute) handleNavigate(nextRoute, 'forward')
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-tertiary/80 backdrop-blur-sm border border-secondary/30 hover:border-secondary hover:bg-tertiary transition-all duration-300 group"
          aria-label="Next section"
        >
          <ChevronRight className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
        </Link>
      </div>
    </>
  )
}
