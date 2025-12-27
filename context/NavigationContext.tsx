'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type TransitionDirection = 'forward' | 'backward' | 'none'

interface NavigationContextType {
  direction: TransitionDirection
  setDirection: (direction: TransitionDirection) => void
  isTransitioning: boolean
  setTransitioning: (value: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<TransitionDirection>('none')
  const [isTransitioning, setTransitioning] = useState(false)

  const updateDirection = useCallback((newDirection: TransitionDirection) => {
    setDirection(newDirection)
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        direction,
        setDirection: updateDirection,
        isTransitioning,
        setTransitioning,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
