// Navigation route configuration
export const ROUTES = [
  { path: '/', label: 'Home', section: 'home' },
  { path: '/experience', label: 'Experience', section: 'experience' },
  { path: '/skills', label: 'Skills', section: 'skills' },
  { path: '/projects', label: 'Projects', section: 'projects' },
  { path: '/research', label: 'Research', section: 'research' },
  { path: '/awards', label: 'Awards', section: 'awards' },
  { path: '/community', label: 'Community', section: 'community' },
  { path: '/contact', label: 'Contact', section: 'contact' },
] as const

export type RoutePath = (typeof ROUTES)[number]['path']
export type RouteSection = (typeof ROUTES)[number]['section']

export function getRouteIndex(path: string): number {
  return ROUTES.findIndex((route) => route.path === path)
}

export function getNextRoute(currentPath: string): string | null {
  const index = getRouteIndex(currentPath)
  if (index === -1 || index >= ROUTES.length - 1) return null
  return ROUTES[index + 1].path
}

export function getPrevRoute(currentPath: string): string | null {
  const index = getRouteIndex(currentPath)
  if (index <= 0) return null
  return ROUTES[index - 1].path
}
