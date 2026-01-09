import { ReactNode, useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Logo } from '@/components/Logo'
import { ChatBot } from '@/components/ChatBot'
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  Shield,
  SignOut,
  SpinnerGap,
  SquaresFour,
  Storefront,
  CheckCircle,
  ClipboardText,
  Wallet,
  ListBullets,
  User,
  Gear,
  ChatsCircle,
  UserCircleGear,
  DotsThree,
  CaretRight,
  CaretLeft
} from '@phosphor-icons/react'

interface AppLayoutProps {
  children: ReactNode
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000
const WARNING_BEFORE_TIMEOUT_MS = 2 * 60 * 1000

export function AppLayout({ children }: AppLayoutProps) {
  const { logout, getCurrentUser } = useAuth()
  const location = useLocation()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showRightNav, setShowRightNav] = useState(false)
  
  const currentUser = getCurrentUser()

  const resetActivity = useCallback(() => {
    setLastActivity(Date.now())
    setShowTimeoutWarning(false)
  }, [])

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
    
    events.forEach(event => {
      document.addEventListener(event, resetActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetActivity)
      })
    }
  }, [resetActivity])

  useEffect(() => {
    const checkTimeout = setInterval(() => {
      let currentActivity = Date.now()
      
      if (typeof lastActivity === 'number') {
        currentActivity = lastActivity
      } else if (lastActivity && typeof lastActivity === 'object' && 'getTime' in lastActivity) {
        currentActivity = (lastActivity as Date).getTime()
      }
      
      const timeSinceActivity = Date.now() - currentActivity
      
      if (timeSinceActivity >= SESSION_TIMEOUT_MS) {
        logout()
        window.location.href = '/signin'
        toast.error('Session expired due to inactivity')
      } else if (timeSinceActivity >= SESSION_TIMEOUT_MS - WARNING_BEFORE_TIMEOUT_MS && !showTimeoutWarning) {
        setShowTimeoutWarning(true)
        toast.warning('Your session will expire soon due to inactivity', {
          duration: 10000,
          action: {
            label: 'Stay Active',
            onClick: () => resetActivity()
          }
        })
      }
    }, 10000)

    return () => clearInterval(checkTimeout)
  }, [lastActivity, logout, showTimeoutWarning, resetActivity])

  if (!currentUser) {
    window.location.href = '/signin'
    return null
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = async () => {
    setIsLoggingOut(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    logout()
    setShowLogoutConfirm(false)
    setIsLoggingOut(false)
    toast.success('Successfully signed out', {
      description: 'You have been securely logged out of your account'
    })
    window.location.href = '/signin'
  }

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  const navItems = [
    { to: '/app/overview', icon: SquaresFour, label: 'Overview' },
    { to: '/app/marketplace', icon: Storefront, label: 'Marketplace' },
    { to: '/app/active', icon: CheckCircle, label: 'Active' },
    { to: '/app/validation', icon: ClipboardText, label: 'Validation' },
    { to: '/app/billing', icon: Wallet, label: 'Billing' },
  ]

  const moreNavItems = [
    { to: '/app/audit', icon: ListBullets, label: 'Audit Log' },
    { to: '/app/forum', icon: ChatsCircle, label: 'Forum' },
    ...(currentUser.role === 'ADMIN' ? [{ to: '/app/admin', icon: UserCircleGear, label: 'Admin' }] : []),
    { to: '/app/settings', icon: Gear, label: 'Settings' },
  ]

  return (
    <>
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <SignOut size={24} className="text-destructive" />
              Confirm Sign Out
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmLogout} 
              disabled={isLoggingOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoggingOut ? (
                <>
                  <SpinnerGap size={18} className="mr-2 animate-spin" />
                  Signing out...
                </>
              ) : (
                'Sign Out'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex h-screen bg-background overflow-hidden">
        <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/20">
          <div className="p-4 border-b border-border flex items-center justify-center">
            <Logo size="md" className="text-accent w-24 h-20" />
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-accent/20 text-accent'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}

              <div className="pt-3 mt-3 border-t border-border">
                {moreNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-accent/20 text-accent'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/50 border border-border mb-3">
              <Avatar className="h-9 w-9 border-2 border-border">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName || currentUser.email} />
                <AvatarFallback className="bg-accent/20 text-accent-foreground text-xs font-medium">
                  {getInitials(currentUser.displayName || currentUser.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentUser.displayName || currentUser.email}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <SignOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <header className="border-b border-border p-4 bg-card/20 backdrop-blur-sm flex-shrink-0 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <Logo size="sm" className="text-accent w-16 h-14" />
              </div>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-border">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName || currentUser.email} />
                  <AvatarFallback className="bg-accent/20 text-accent-foreground text-xs font-medium">
                    {getInitials(currentUser.displayName || currentUser.email)}
                  </AvatarFallback>
                </Avatar>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  aria-label="Sign out"
                >
                  <SignOut size={16} />
                </Button>
              </div>
            </div>
          </header>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "fixed top-1/2 -translate-y-1/2 z-40 h-12 w-8 rounded-l-lg rounded-r-none border-r-0",
              "bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg transition-all duration-300",
              showRightNav ? "right-80" : "right-0"
            )}
            onClick={() => setShowRightNav(!showRightNav)}
            aria-label={showRightNav ? "Close quick access panel" : "Open quick access panel"}
          >
            {showRightNav ? <CaretRight size={20} /> : <CaretLeft size={20} />}
          </Button>

          <aside className={cn(
            "fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-sm border-l border-border z-30 transition-transform duration-300",
            showRightNav ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Quick Access</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowRightNav(false)}
                    aria-label="Close quick access panel"
                  >
                    <CaretRight size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName || currentUser.email} />
                      <AvatarFallback className="bg-accent/20 text-accent-foreground text-sm font-medium">
                        {getInitials(currentUser.displayName || currentUser.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{currentUser.displayName || currentUser.email}</p>
                      <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Links</h3>
                  <div className="space-y-1">
                    {moreNavItems.map((item) => {
                      const isActive = location.pathname === item.to
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setShowRightNav(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                            isActive
                              ? 'bg-accent/20 text-accent'
                              : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                          )}
                        >
                          <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
                          <span>{item.label}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <SignOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </aside>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              <Breadcrumbs />
              {children}
            </div>
          </div>

          <nav className="lg:hidden border-t border-border bg-card/30 backdrop-blur-sm pb-safe">
            <div className="flex items-center justify-around px-2 py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all min-w-0',
                      isActive
                        ? 'text-accent'
                        : 'text-muted-foreground active:bg-secondary/50'
                    )}
                  >
                    <item.icon size={22} weight={isActive ? 'fill' : 'regular'} />
                    <span className="truncate max-w-[60px]">{item.label}</span>
                  </NavLink>
                )
              })}
              
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                  showMoreMenu
                    ? 'text-accent'
                    : 'text-muted-foreground active:bg-secondary/50'
                )}
              >
                <DotsThree size={22} weight={showMoreMenu ? 'fill' : 'regular'} />
                <span>More</span>
              </button>
            </div>

            {showMoreMenu && (
              <div className="border-t border-border bg-card/50 p-3 space-y-1">
                {moreNavItems.map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setShowMoreMenu(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-accent/20 text-accent'
                          : 'text-muted-foreground active:bg-secondary/50'
                      )}
                    >
                      <item.icon size={20} weight={isActive ? 'fill' : 'regular'} />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>
            )}
          </nav>
        </div>
      </div>
      
      <ChatBot variant="floating" />
    </>
  )
}
