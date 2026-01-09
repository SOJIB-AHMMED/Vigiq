import { Link, useLocation } from 'react-router-dom'
import { CaretRight, House } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  path?: string
}

const routeConfig: Record<string, { label: string; parent?: string }> = {
  '/app/overview': { label: 'Overview' },
  '/app/marketplace': { label: 'Marketplace', parent: '/app/overview' },
  '/app/active': { label: 'Active Modules', parent: '/app/overview' },
  '/app/validation': { label: 'Validation', parent: '/app/overview' },
  '/app/billing': { label: 'Billing', parent: '/app/overview' },
  '/app/audit': { label: 'Audit Log', parent: '/app/overview' },
  '/app/forum': { label: 'Community Forum', parent: '/app/overview' },
  '/app/admin': { label: 'Admin', parent: '/app/overview' },
  '/app/settings': { label: 'Settings', parent: '/app/overview' }
}

export function Breadcrumbs() {
  const location = useLocation()
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []
    const currentPath = location.pathname
    
    if (currentPath === '/app/overview') {
      breadcrumbs.push({ 
        label: 'Overview',
        path: undefined
      })
      return breadcrumbs
    }
    
    const config = routeConfig[currentPath]
    
    if (!config) {
      breadcrumbs.push({ label: 'Home', path: '/app/overview' })
      return breadcrumbs
    }
    
    if (config.parent) {
      const parentConfig = routeConfig[config.parent]
      if (parentConfig) {
        breadcrumbs.push({ 
          label: parentConfig.label, 
          path: config.parent 
        })
      }
    }
    
    breadcrumbs.push({ 
      label: config.label,
      path: undefined
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  if (breadcrumbs.length === 0) {
    return null
  }
  
  const isOverviewOnly = breadcrumbs.length === 1 && breadcrumbs[0].label === 'Overview'
  
  return (
    <nav 
      className={cn(
        "flex items-center gap-1 text-sm flex-wrap transition-all duration-200",
        isOverviewOnly ? "mb-3" : "mb-4"
      )} 
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        const isFirst = index === 0
        
        return (
          <div key={`${crumb.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && (
              <CaretRight 
                size={14} 
                className="text-muted-foreground/60" 
                weight="bold" 
              />
            )}
            
            {crumb.path ? (
              <Link
                to={crumb.path}
                className="h-auto px-2 py-1 hover:bg-accent/20 hover:text-accent transition-all duration-200 active:scale-95 rounded-md flex items-center"
              >
                {isFirst && (
                  <House size={16} className="mr-1.5" weight="fill" />
                )}
                <span className="text-sm">{crumb.label}</span>
              </Link>
            ) : (
              <span 
                className={cn(
                  "px-2 py-1 rounded-md flex items-center gap-1.5 transition-all duration-200",
                  isLast 
                    ? "text-foreground font-semibold bg-accent/10 shadow-sm" 
                    : "text-muted-foreground"
                )}
              >
                {isFirst && isOverviewOnly && (
                  <House size={16} weight="fill" />
                )}
                <span className="text-sm">{crumb.label}</span>
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
