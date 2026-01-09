import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/StatusBadge'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { useSoundSettings } from '@/hooks/use-sound-settings'
import { toast } from 'sonner'
import { Shield, Globe, ClockCounterClockwise, Lock, EnvelopeSimple, IdentificationCard, CaretDown, BellRinging, Camera, User, ClipboardText, SpeakerHigh, Vibrate } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { soundManager } from '@/lib/sound'
import type { Region, NotificationPreferences } from '@/lib/types'

export function SettingsPage() {
  const { getCurrentUser, updateAppState, addAuditEvent, appState, changePassword, changeEmail, updateDisplayName, updateNotificationPreferences, updateAvatar } = useAuth()
  const currentUser = getCurrentUser()
  const isMobile = useIsMobile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { soundEnabled, setSoundEnabled } = useSoundSettings()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  const [newEmail, setNewEmail] = useState('')
  const [passwordForEmail, setPasswordForEmail] = useState('')
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [isChangingEmail, setIsChangingEmail] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [displayNameDialogOpen, setDisplayNameDialogOpen] = useState(false)
  const [isUpdatingDisplayName, setIsUpdatingDisplayName] = useState(false)

  const [profileOpen, setProfileOpen] = useState(true)
  const [accountStatusOpen, setAccountStatusOpen] = useState(false)
  const [securityOpen, setSecurityOpen] = useState(false)
  const [regionalOpen, setRegionalOpen] = useState(false)
  const [validationsOpen, setValidationsOpen] = useState(false)
  const [auditEventsOpen, setAuditEventsOpen] = useState(false)
  const [notificationPrefsOpen, setNotificationPrefsOpen] = useState(false)
  const [soundHapticOpen, setSoundHapticOpen] = useState(false)

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
        toast.success('Avatar updated successfully')
      } else {
        toast.error('Failed to update avatar')
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

  const defaultNotificationPrefs: NotificationPreferences = {
    emailNotifications: {
      validationUpdates: true,
      entitlementChanges: true,
      transactionAlerts: true,
      systemAnnouncements: true
    },
    pushNotifications: {
      validationUpdates: true,
      entitlementChanges: true,
      transactionAlerts: false,
      systemAnnouncements: false
    }
  }

  const notificationPrefs = currentUser.notificationPreferences || defaultNotificationPrefs

  const handleNotificationPreferenceChange = (
    category: 'emailNotifications' | 'pushNotifications',
    key: keyof NotificationPreferences['emailNotifications'],
    value: boolean
  ) => {
    const newPrefs: NotificationPreferences = {
      ...notificationPrefs,
      [category]: {
        ...notificationPrefs[category],
        [key]: value
      }
    }

    const success = updateNotificationPreferences(currentUser.id, newPrefs)
    if (success) {
      toast.success('Notification preferences updated')
    } else {
      toast.error('Failed to update preferences')
    }
  }

  const userValidations = appState.validations
    .filter(v => v.userId === currentUser.id)
    .slice(-10)
    .reverse()

  const recentAuditEvents = appState.auditEvents
    .filter(e => e.actorId === currentUser.id || e.entityId === currentUser.id)
    .slice(-10)
    .reverse()

  const handleRegionChange = (newRegion: Region) => {
    updateAppState(state => ({
      ...state,
      users: state.users.map(u =>
        u.id === currentUser.id ? { ...u, region: newRegion } : u
      )
    }))

    addAuditEvent({
      entityType: 'USER',
      entityId: currentUser.id,
      action: 'USER_REGION_CHANGED',
      previousState: { region: currentUser.region },
      newState: { region: newRegion },
      actorId: currentUser.id,
      metadata: {}
    })

    toast.success(`Region updated to ${newRegion}`)
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required')
      return
    }

    if (currentPassword.length !== 4 || newPassword.length !== 4) {
      toast.error('PIN must be exactly 4 digits')
      return
    }

    if (!/^\d{4}$/.test(currentPassword) || !/^\d{4}$/.test(newPassword)) {
      toast.error('PIN must contain only digits')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New PINs do not match')
      return
    }

    if (currentPassword === newPassword) {
      toast.error('New PIN must be different from current PIN')
      return
    }

    setIsChangingPassword(true)

    const success = changePassword(currentUser.id, currentPassword, newPassword)

    if (success) {
      toast.success('PIN changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordDialogOpen(false)
    } else {
      toast.error('Current PIN is incorrect')
    }

    setIsChangingPassword(false)
  }

  const handleEmailChange = () => {
    if (!newEmail || !passwordForEmail) {
      toast.error('All fields are required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      toast.error('Invalid email format')
      return
    }

    if (passwordForEmail.length !== 4 || !/^\d{4}$/.test(passwordForEmail)) {
      toast.error('PIN must be exactly 4 digits')
      return
    }

    if (newEmail === currentUser.email) {
      toast.error('New email must be different from current email')
      return
    }

    setIsChangingEmail(true)

    const success = changeEmail(currentUser.id, newEmail, passwordForEmail)

    if (success) {
      toast.success('Email updated successfully')
      setNewEmail('')
      setPasswordForEmail('')
      setEmailDialogOpen(false)
    } else {
      toast.error('Failed to update email. Please check your PIN and try again.')
    }

    setIsChangingEmail(false)
  }

  const handleDisplayNameUpdate = () => {
    if (!displayName.trim()) {
      toast.error('Display name cannot be empty')
      return
    }

    if (displayName.length > 50) {
      toast.error('Display name must be 50 characters or less')
      return
    }

    setIsUpdatingDisplayName(true)

    const success = updateDisplayName(currentUser.id, displayName.trim())

    if (success) {
      toast.success('Display name updated successfully')
      setDisplayName('')
      setDisplayNameDialogOpen(false)
    } else {
      toast.error('Failed to update display name')
    }

    setIsUpdatingDisplayName(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, security, and governance preferences
        </p>
      </div>

      <Collapsible open={profileOpen} onOpenChange={setProfileOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <User weight="duotone" size={22} />
                  Profile
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Your identity and account information</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group flex-shrink-0">
                  <Avatar className="h-24 w-24 border-2 border-border/50">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName || currentUser.email} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-foreground font-medium">
                      {getInitials(currentUser.displayName, currentUser.email)}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    aria-label="Upload avatar"
                    type="button"
                  >
                    <Camera size={24} weight="duotone" className="text-white" />
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

                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <IdentificationCard size={14} weight="duotone" />
                        <span>Display Name</span>
                      </div>
                      <p className="text-base font-medium">
                        {currentUser.displayName || 'Not set'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <EnvelopeSimple size={14} weight="duotone" />
                        <span>Email</span>
                      </div>
                      <p className="text-sm font-mono text-foreground/90 break-all">{currentUser.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hover over your avatar to upload a new image (max 5MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={accountStatusOpen} onOpenChange={setAccountStatusOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Shield weight="duotone" size={22} />
                  Account Status
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${accountStatusOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Current governance state and region</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-sm text-muted-foreground">User State</span>
                <StatusBadge status={currentUser.state} />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-sm text-muted-foreground">Region</span>
                <span className="text-sm font-medium">{currentUser.region}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-sm text-muted-foreground">Role</span>
                <span className="text-sm font-medium monospace">{currentUser.role}</span>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={securityOpen} onOpenChange={setSecurityOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lock weight="duotone" size={22} />
                  Security
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${securityOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Manage your account authentication and personal information</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <Alert>
                <Shield weight="duotone" size={16} />
                <AlertDescription>
                  Your PIN is used to authenticate your account. Keep it secure and never share it with others.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Dialog open={displayNameDialogOpen} onOpenChange={setDisplayNameDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <IdentificationCard weight="duotone" size={18} />
                      Update Display Name
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Display Name</DialogTitle>
                      <DialogDescription>
                        Choose a display name that will be shown throughout the application.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input
                          id="display-name"
                          type="text"
                          placeholder="Enter your display name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          maxLength={50}
                        />
                        <p className="text-xs text-muted-foreground">
                          Max 50 characters. Current: {currentUser.displayName || 'Not set'}
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDisplayNameDialogOpen(false)
                          setDisplayName('')
                        }}
                        disabled={isUpdatingDisplayName}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDisplayNameUpdate} disabled={isUpdatingDisplayName}>
                        {isUpdatingDisplayName ? 'Updating...' : 'Update'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <EnvelopeSimple weight="duotone" size={18} />
                      Change Email Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Email Address</DialogTitle>
                      <DialogDescription>
                        Update your account email address. You'll need to verify your identity with your current PIN.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-email">New Email Address</Label>
                        <Input
                          id="new-email"
                          type="email"
                          placeholder="new.email@example.com"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          autoComplete="email"
                        />
                        <p className="text-xs text-muted-foreground">
                          Current: {currentUser.email}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-for-email">Current PIN</Label>
                        <Input
                          id="password-for-email"
                          type="password"
                          placeholder="Enter 4-digit PIN"
                          value={passwordForEmail}
                          onChange={(e) => setPasswordForEmail(e.target.value.slice(0, 4))}
                          maxLength={4}
                          autoComplete="current-password"
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter your current 4-digit PIN to confirm
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEmailDialogOpen(false)
                          setNewEmail('')
                          setPasswordForEmail('')
                        }}
                        disabled={isChangingEmail}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleEmailChange} disabled={isChangingEmail}>
                        {isChangingEmail ? 'Updating...' : 'Update Email'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" className="w-full justify-start">
                      <Lock weight="duotone" size={18} />
                      Change PIN
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Your PIN</DialogTitle>
                      <DialogDescription>
                        Update your 4-digit PIN. Make sure to remember your new PIN as it will be required to sign in.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current PIN</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Enter current 4-digit PIN"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value.slice(0, 4))}
                          maxLength={4}
                          autoComplete="current-password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New PIN</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter new 4-digit PIN"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value.slice(0, 4))}
                          maxLength={4}
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New PIN</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm new 4-digit PIN"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value.slice(0, 4))}
                          maxLength={4}
                          autoComplete="new-password"
                        />
                        <p className="text-xs text-muted-foreground">
                          PIN must be exactly 4 digits (numbers only)
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPasswordDialogOpen(false)
                          setCurrentPassword('')
                          setNewPassword('')
                          setConfirmPassword('')
                        }}
                        disabled={isChangingPassword}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handlePasswordChange} disabled={isChangingPassword}>
                        {isChangingPassword ? 'Changing...' : 'Change PIN'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={regionalOpen} onOpenChange={setRegionalOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Globe weight="duotone" size={22} />
                  Regional Configuration
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${regionalOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>
                Region settings for governance rule enforcement
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={currentUser.region} onValueChange={handleRegionChange}>
                  <SelectTrigger id="region">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="EEA">European Economic Area</SelectItem>
                    <SelectItem value="INTERNATIONAL">International</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Region affects validation requirements and module availability
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={validationsOpen} onOpenChange={setValidationsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ClipboardText weight="duotone" size={22} />
                  My Validations
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${validationsOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Your recent validation requests and their status</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              {userValidations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No validation requests yet</p>
              ) : isMobile ? (
                <div className="space-y-3">
                  {userValidations.map((validation) => (
                    <Card key={validation.validationId} className="bg-muted/30 border border-border/50">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Validation ID</span>
                          <span className="monospace text-xs text-right break-all">{validation.validationId}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Type</span>
                          <span className="text-xs text-right">{validation.validationType}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Status</span>
                          <StatusBadge status={validation.status} />
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Submitted</span>
                          <span className="text-xs text-right">{new Date(validation.submittedAt).toLocaleString()}</span>
                        </div>
                        {validation.validatedAt && (
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-xs text-muted-foreground">Validated</span>
                            <span className="text-xs text-right">{new Date(validation.validatedAt).toLocaleString()}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Validation ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Validated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userValidations.map((validation) => (
                        <TableRow key={validation.validationId}>
                          <TableCell className="monospace text-xs">{validation.validationId}</TableCell>
                          <TableCell>{validation.validationType}</TableCell>
                          <TableCell>
                            <StatusBadge status={validation.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(validation.submittedAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {validation.validatedAt ? new Date(validation.validatedAt).toLocaleString() : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={notificationPrefsOpen} onOpenChange={setNotificationPrefsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BellRinging weight="duotone" size={22} />
                  Notification Preferences
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${notificationPrefsOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Manage email and push notification settings</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Validation Updates</p>
                        <p className="text-xs text-muted-foreground">Receive emails when your validations are reviewed</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailNotifications.validationUpdates}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('emailNotifications', 'validationUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Entitlement Changes</p>
                        <p className="text-xs text-muted-foreground">Get notified about module activations and revocations</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailNotifications.entitlementChanges}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('emailNotifications', 'entitlementChanges', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Transaction Alerts</p>
                        <p className="text-xs text-muted-foreground">Receive emails for billing and payment activities</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailNotifications.transactionAlerts}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('emailNotifications', 'transactionAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">System Announcements</p>
                        <p className="text-xs text-muted-foreground">Stay informed about platform updates and changes</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailNotifications.systemAnnouncements}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('emailNotifications', 'systemAnnouncements', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Validation Updates</p>
                        <p className="text-xs text-muted-foreground">In-app alerts for validation status changes</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.pushNotifications.validationUpdates}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('pushNotifications', 'validationUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Entitlement Changes</p>
                        <p className="text-xs text-muted-foreground">In-app notifications for module changes</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.pushNotifications.entitlementChanges}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('pushNotifications', 'entitlementChanges', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Transaction Alerts</p>
                        <p className="text-xs text-muted-foreground">In-app alerts for billing activities</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.pushNotifications.transactionAlerts}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('pushNotifications', 'transactionAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">System Announcements</p>
                        <p className="text-xs text-muted-foreground">In-app notifications for platform updates</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.pushNotifications.systemAnnouncements}
                        onCheckedChange={(checked) => handleNotificationPreferenceChange('pushNotifications', 'systemAnnouncements', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={soundHapticOpen} onOpenChange={setSoundHapticOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <SpeakerHigh weight="duotone" size={22} />
                  Sound & Haptics
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${soundHapticOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Configure audio feedback and haptic responses</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SpeakerHigh size={16} weight="duotone" />
                      <p className="text-sm font-medium">Sound Effects</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Play audio feedback on progress completion</p>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={(checked) => {
                      setSoundEnabled(checked)
                      if (checked) {
                        toast.success('Sound effects enabled')
                        soundManager.playCompletionSound()
                      } else {
                        toast.success('Sound effects disabled')
                      }
                    }}
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Vibrate size={16} weight="duotone" />
                    Test Sound Effects
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        soundManager.playProgressTick()
                      }}
                      disabled={!soundEnabled}
                    >
                      Progress Tick
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        soundManager.playCompletionSound()
                      }}
                      disabled={!soundEnabled}
                    >
                      Completion
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        soundManager.playSuccessTone()
                      }}
                      disabled={!soundEnabled}
                    >
                      Success Tone
                    </Button>
                  </div>
                  {!soundEnabled && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Enable sound effects to test audio feedback
                    </p>
                  )}
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    Sound effects are synthesized using the Web Audio API and play automatically when loading bars and progress indicators complete. Haptic feedback (vibration) is triggered on supported devices when enabled.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={auditEventsOpen} onOpenChange={setAuditEventsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ClockCounterClockwise weight="duotone" size={22} />
                  Recent Audit Events
                </div>
                <CaretDown 
                  size={20} 
                  className={`transition-transform duration-200 ${auditEventsOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
              <CardDescription>Last 10 governance actions related to your account</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              {recentAuditEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No audit events yet</p>
              ) : isMobile ? (
                <div className="space-y-3">
                  {recentAuditEvents.map((event) => (
                    <Card key={event.eventId} className="bg-muted/30 border border-border/50">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Event ID</span>
                          <span className="monospace text-xs text-right break-all">{event.eventId}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Type</span>
                          <span className="text-xs text-right">{event.entityType}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Action</span>
                          <span className="text-xs font-medium text-right">{event.action}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">IP Address</span>
                          <span className="text-xs monospace text-right">{event.ipAddress || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs text-muted-foreground">Time</span>
                          <span className="text-xs text-right">{new Date(event.atUtc).toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event ID</TableHead>
                        <TableHead>Entity Type</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAuditEvents.map((event) => (
                        <TableRow key={event.eventId}>
                          <TableCell className="monospace text-xs">{event.eventId}</TableCell>
                          <TableCell>{event.entityType}</TableCell>
                          <TableCell className="font-medium">{event.action}</TableCell>
                          <TableCell className="monospace text-xs">{event.ipAddress || 'N/A'}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(event.atUtc).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}
