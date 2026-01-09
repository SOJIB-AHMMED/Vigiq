import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Session, AppState, User, AuditEvent, NotificationPreferences } from '@/lib/types'
import { createSeedData, hashPin } from '@/lib/seed'
import { useKV } from '@github/spark/hooks'
import { getClientInfo } from '@/lib/utils'

interface AuthContextType {
  session: Session | null
  appState: AppState
  login: (email: string, pin: string) => boolean
  logout: () => void
  register: (email: string, pin: string, displayName?: string) => boolean
  updateAppState: (updater: (state: AppState) => AppState) => void
  addAuditEvent: (event: Omit<AuditEvent, 'eventId' | 'atUtc'>) => void
  getCurrentUser: () => User | null
  changePassword: (userId: string, currentPin: string, newPin: string) => boolean
  changeEmail: (userId: string, newEmail: string, pin: string) => boolean
  updateAvatar: (userId: string, avatarUrl: string) => boolean
  updateDisplayName: (userId: string, displayName: string) => boolean
  updateNotificationPreferences: (userId: string, preferences: NotificationPreferences) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [appState, setAppState, deleteAppState] = useKV<AppState>('vifiq-app-state', createSeedData())

  const state = appState || createSeedData()

  useEffect(() => {
    const savedSession = localStorage.getItem('vifiq-session')
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession)
        setSession(parsed)
      } catch (e) {
        localStorage.removeItem('vifiq-session')
      }
    }
  }, [])

  const login = (email: string, pin: string): boolean => {
    const pinHash = hashPin(pin)
    const user = state.users.find(u => u.email === email && u.pinHash === pinHash)
    
    if (user) {
      const newSession: Session = {
        userId: user.id,
        email: user.email,
        role: user.role
      }
      setSession(newSession)
      localStorage.setItem('vifiq-session', JSON.stringify(newSession))
      
      addAuditEvent({
        entityType: 'USER',
        entityId: user.id,
        action: 'USER_LOGIN',
        previousState: null,
        newState: { email: user.email },
        actorId: user.id,
        metadata: { timestamp: new Date().toISOString() }
      })
      
      return true
    }
    return false
  }

  const logout = () => {
    if (session) {
      addAuditEvent({
        entityType: 'USER',
        entityId: session.userId,
        action: 'USER_LOGOUT',
        previousState: { email: session.email },
        newState: null,
        actorId: session.userId,
        metadata: { timestamp: new Date().toISOString() }
      })
    }
    
    setSession(null)
    localStorage.removeItem('vifiq-session')
  }

  const register = (email: string, pin: string, displayName?: string): boolean => {
    const existingUser = state.users.find(u => u.email === email)
    if (existingUser) {
      return false
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      pinHash: hashPin(pin),
      role: 'OPERATOR',
      state: 'ACTIVE',
      region: 'INTERNATIONAL',
      createdAt: new Date().toISOString(),
      displayName: displayName?.trim() || undefined
    }

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: [...current.users, newUser]
      }
    })

    addAuditEvent({
      entityType: 'USER',
      entityId: newUser.id,
      action: 'USER_CREATED',
      previousState: null,
      newState: { email: newUser.email, role: 'OPERATOR', state: 'ACTIVE', displayName: newUser.displayName },
      actorId: 'system',
      metadata: { source: 'registration' }
    })

    return true
  }

  const updateAppState = (updater: (state: AppState) => AppState) => {
    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return updater(current)
    })
  }

  const addAuditEvent = (event: Omit<AuditEvent, 'eventId' | 'atUtc'>) => {
    const clientInfo = getClientInfo()
    const newEvent: AuditEvent = {
      ...event,
      eventId: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      atUtc: new Date().toISOString(),
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent
    }

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        auditEvents: [...current.auditEvents, newEvent]
      }
    })
  }

  const getCurrentUser = (): User | null => {
    if (!session) return null
    return state.users.find(u => u.id === session.userId) || null
  }

  const changePassword = (userId: string, currentPin: string, newPin: string): boolean => {
    const user = state.users.find(u => u.id === userId)
    if (!user) return false

    const currentHash = hashPin(currentPin)
    if (currentHash !== user.pinHash) return false

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: current.users.map(u =>
          u.id === userId ? { ...u, pinHash: hashPin(newPin) } : u
        )
      }
    })

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'PASSWORD_CHANGED',
      previousState: { passwordChanged: false },
      newState: { passwordChanged: true },
      actorId: userId,
      metadata: { timestamp: new Date().toISOString() }
    })

    return true
  }

  const changeEmail = (userId: string, newEmail: string, pin: string): boolean => {
    const user = state.users.find(u => u.id === userId)
    if (!user) return false

    const pinHash = hashPin(pin)
    if (pinHash !== user.pinHash) return false

    const emailExists = state.users.find(u => u.email === newEmail && u.id !== userId)
    if (emailExists) return false

    const oldEmail = user.email

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: current.users.map(u =>
          u.id === userId ? { ...u, email: newEmail } : u
        )
      }
    })

    if (session && session.userId === userId) {
      const newSession = { ...session, email: newEmail }
      setSession(newSession)
      localStorage.setItem('vifiq-session', JSON.stringify(newSession))
    }

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'EMAIL_CHANGED',
      previousState: { email: oldEmail },
      newState: { email: newEmail },
      actorId: userId,
      metadata: { timestamp: new Date().toISOString() }
    })

    return true
  }

  const updateAvatar = (userId: string, avatarUrl: string): boolean => {
    const user = state.users.find(u => u.id === userId)
    if (!user) return false

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: current.users.map(u =>
          u.id === userId ? { ...u, avatarUrl } : u
        )
      }
    })

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'AVATAR_UPDATED',
      previousState: { avatarUrl: user.avatarUrl || null },
      newState: { avatarUrl },
      actorId: userId,
      metadata: { timestamp: new Date().toISOString() }
    })

    return true
  }

  const updateDisplayName = (userId: string, displayName: string): boolean => {
    const user = state.users.find(u => u.id === userId)
    if (!user) return false

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: current.users.map(u =>
          u.id === userId ? { ...u, displayName } : u
        )
      }
    })

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'DISPLAY_NAME_UPDATED',
      previousState: { displayName: user.displayName || null },
      newState: { displayName },
      actorId: userId,
      metadata: { timestamp: new Date().toISOString() }
    })

    return true
  }

  const updateNotificationPreferences = (userId: string, preferences: NotificationPreferences): boolean => {
    const user = state.users.find(u => u.id === userId)
    if (!user) return false

    setAppState((currentState) => {
      const current = currentState || createSeedData()
      return {
        ...current,
        users: current.users.map(u =>
          u.id === userId ? { ...u, notificationPreferences: preferences } : u
        )
      }
    })

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'NOTIFICATION_PREFERENCES_UPDATED',
      previousState: { notificationPreferences: user.notificationPreferences || null },
      newState: { notificationPreferences: preferences },
      actorId: userId,
      metadata: { timestamp: new Date().toISOString() }
    })

    return true
  }

  return (
    <AuthContext.Provider value={{
      session,
      appState: state,
      login,
      logout,
      register,
      updateAppState,
      addAuditEvent,
      getCurrentUser,
      changePassword,
      changeEmail,
      updateAvatar,
      updateDisplayName,
      updateNotificationPreferences
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
