import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from 'sonner'
import { IdentificationCard, EnvelopeSimple, Camera, CaretDown, MapPin, UserCircle, ShieldCheck, Gear, ArrowLeft } from '@phosphor-icons/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'

export function ProfilePage() {
  const { getCurrentUser, updateAvatar } = useAuth()
  const currentUser = getCurrentUser()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!currentUser) return null

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      const success = updateAvatar(currentUser.id, base64String)
      if (success) {
        toast.success('Avatar updated')
      } else {
        toast.error('Update failed')
      }
    }
    reader.onerror = () => {
      toast.error('File read error')
    }
    reader.readAsDataURL(file)
  }

  const getInitials = (displayName: string | undefined, email: string) => {
    if (displayName && displayName.trim()) {
      const parts = displayName.trim().split(' ')
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      return displayName.slice(0, 2).toUpperCase()
    }
    return email.slice(0, 2).toUpperCase()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size={isMobile ? 'icon' : 'default'}
            className={`${isMobile ? 'shrink-0 h-9 w-9' : ''} hover:bg-secondary/80 transition-all active:scale-95`}
            onClick={() => navigate('/app/overview')}
          >
            {isMobile ? (
              <ArrowLeft size={18} weight="bold" />
            ) : (
              <>
                <ArrowLeft size={18} weight="bold" className="mr-2" />
                Dashboard
              </>
            )}
          </Button>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/app/settings')}
          className="gap-2"
        >
          <Gear size={18} weight="duotone" />
          {!isMobile && 'Settings'}
        </Button>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-8 flex-1">
              <div className="relative group flex-shrink-0">
                <Avatar className="h-32 w-32 border-2 border-border/50">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName || currentUser.email} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-foreground font-medium">
                    {getInitials(currentUser.displayName, currentUser.email)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  aria-label="Upload avatar"
                >
                  <Camera size={28} weight="duotone" className="text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    <IdentificationCard size={16} weight="duotone" className="text-accent" />
                    Name
                  </div>
                  <p className="text-xl font-medium">
                    {currentUser.displayName || 'Not set'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    <EnvelopeSimple size={16} weight="duotone" className="text-accent" />
                    Email
                  </div>
                  <p className="text-base font-mono text-foreground/90">{currentUser.email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors flex-shrink-0"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <CaretDown size={20} weight="bold" className="text-muted-foreground" />
              </motion.div>
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-border/50 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        <ShieldCheck size={16} weight="duotone" className="text-accent" />
                        User State
                      </div>
                      <p className="text-base font-medium">{currentUser.state}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        <MapPin size={16} weight="duotone" className="text-accent" />
                        Region
                      </div>
                      <p className="text-base font-medium">{currentUser.region}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        <UserCircle size={16} weight="duotone" className="text-accent" />
                        Role
                      </div>
                      <p className="text-base font-medium">{currentUser.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
