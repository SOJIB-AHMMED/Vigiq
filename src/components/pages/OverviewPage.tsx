import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { CheckSquare, ClipboardText, Hourglass, Wallet, Gear, Plus, Bell, Headset, UserCircle, DotsThree, ListBullets, ChatsCircle, UserCircleGear } from '@phosphor-icons/react'
import { NotificationFeed } from '@/components/NotificationFeed'
import { SupportChat } from '@/components/SupportChat'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function OverviewPage() {
  const { getCurrentUser, appState } = useAuth()
  const currentUser = getCurrentUser()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false)
  const [supportDialogOpen, setSupportDialogOpen] = useState(false)

  if (!currentUser) return null

  const userEntitlements = appState.entitlements.filter(e => e.userId === currentUser.id && e.status === 'ACTIVE')
  const userValidationsPending = appState.validations.filter(v => v.userId === currentUser.id && v.status === 'PENDING')
  
  const onProcessCount = appState.entitlements.filter(e => e.userId === currentUser.id && e.status === 'ISSUED').length

  const handleNotificationToggle = () => {
    if (supportDialogOpen) {
      setSupportDialogOpen(false)
    }
    setNotificationDialogOpen(prev => !prev)
  }

  const handleSupportToggle = () => {
    if (notificationDialogOpen) {
      setNotificationDialogOpen(false)
    }
    setSupportDialogOpen(prev => !prev)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
          <Button
            size="icon"
            variant="outline"
            className="shrink-0 h-9 w-9 md:h-10 md:w-10 hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95 hover:shadow-md border-2"
            title="View Profile"
            onClick={() => navigate('/app/profile')}
          >
            <UserCircle size={20} weight="bold" />
          </Button>
          <Link to="/app/marketplace">
            <Button
              size="icon"
              variant="outline"
              className="shrink-0 h-9 w-9 md:h-10 md:w-10 hover:bg-accent hover:text-accent-foreground transition-all duration-200 active:scale-95 hover:shadow-md border-2"
              title="Add new module"
            >
              <Plus size={20} weight="bold" />
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={notificationDialogOpen ? "secondary" : "ghost"}
            size="icon"
            className="shrink-0 h-9 w-9 relative hover:bg-accent/10 hover:text-accent transition-all duration-200 active:scale-95"
            onClick={handleNotificationToggle}
            title="Notifications"
          >
            <Bell size={20} weight={notificationDialogOpen ? "fill" : "regular"} />
            {userValidationsPending.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                {userValidationsPending.length}
              </span>
            )}
          </Button>

          <Button
            variant={supportDialogOpen ? "secondary" : "ghost"}
            size="icon"
            className="shrink-0 h-9 w-9 hover:bg-accent/10 hover:text-accent transition-all duration-200 active:scale-95"
            onClick={handleSupportToggle}
            title="Support Chat"
          >
            <Headset size={20} weight={supportDialogOpen ? "fill" : "regular"} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-9 w-9 hover:bg-accent/10 hover:text-accent transition-all duration-200 active:scale-95"
                title="More Options"
              >
                <DotsThree size={20} weight="bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/app/audit')}>
                <ListBullets size={18} weight="duotone" className="mr-2" />
                Audit Log
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/app/forum')}>
                <ChatsCircle size={18} weight="duotone" className="mr-2" />
                Forum
              </DropdownMenuItem>
              {currentUser.role === 'ADMIN' && (
                <DropdownMenuItem onClick={() => navigate('/app/admin')}>
                  <UserCircleGear size={18} weight="duotone" className="mr-2" />
                  Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/app/settings')}>
                <Gear size={18} weight="duotone" className="mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {notificationDialogOpen && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <NotificationFeed onClose={() => setNotificationDialogOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {supportDialogOpen && (
          <motion.div
            key="support"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <SupportChat onClose={() => setSupportDialogOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Link to="/app/active" className="block h-full">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-accent/50 cursor-pointer h-full">
              <CardHeader className="pb-2 md:pb-3">
                <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                  <CheckSquare size={16} className="text-accent md:w-[18px] md:h-[18px]" weight="duotone" />
                  <span>Active</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-semibold">{userEntitlements.length}</div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>

        <Link to="/app/validation" className="block h-full">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-warning/50 cursor-pointer h-full">
              <CardHeader className="pb-2 md:pb-3">
                <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                  <ClipboardText size={16} className="text-warning md:w-[18px] md:h-[18px]" weight="duotone" />
                  <span>Pending</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-semibold">{userValidationsPending.length}</div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
          <Card className="hover:shadow-lg transition-all duration-200 hover:border-muted-foreground/50 cursor-pointer h-full">
            <CardHeader className="pb-2 md:pb-3">
              <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                <Hourglass size={16} className="text-muted-foreground md:w-[18px] md:h-[18px]" weight="duotone" />
                <span>Processing</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-semibold">{onProcessCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        <Link to="/app/billing" className="block h-full">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
            <Card className="hover:shadow-lg transition-all duration-200 hover:border-success/50 cursor-pointer h-full">
              <CardHeader className="pb-2 md:pb-3">
                <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
                  <Wallet size={16} className="text-success md:w-[18px] md:h-[18px]" weight="duotone" />
                  <span>Balance</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-semibold monospace">${appState.walletBalance.toFixed(2)}</div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
