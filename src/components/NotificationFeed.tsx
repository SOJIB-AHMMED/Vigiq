import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth'
import { Bell, Check, X, Clock, Shield, ShoppingCart, ClipboardText, CreditCard } from '@phosphor-icons/react'
import type { AuditEvent } from '@/lib/types'

interface NotificationItem {
  id: string
  type: 'validation' | 'entitlement' | 'transaction' | 'system'
  title: string
  description: string
  timestamp: string
  read: boolean
  event: AuditEvent
}

interface NotificationFeedProps {
  onClose?: () => void
}

export function NotificationFeed({ onClose }: NotificationFeedProps) {
  const { appState, getCurrentUser } = useAuth()
  const currentUser = getCurrentUser()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!currentUser) return

    const userEvents = appState.auditEvents
      .filter(e => e.actorId === currentUser.id || e.entityId === currentUser.id)
      .slice(-20)
      .reverse()

    const notificationItems: NotificationItem[] = userEvents.map(event => {
      let type: NotificationItem['type'] = 'system'
      let title = event.action.replace(/_/g, ' ')
      let description = `${event.entityType}: ${event.action}`

      if (event.entityType === 'VALIDATION') {
        type = 'validation'
        if (event.action === 'VALIDATION_CREATED') {
          title = 'Validation Request Submitted'
          description = 'Your validation request is being processed'
        } else if (event.action === 'VALIDATION_APPROVED') {
          title = 'Validation Approved'
          description = 'Your validation request has been approved'
        } else if (event.action === 'VALIDATION_REJECTED') {
          title = 'Validation Rejected'
          description = 'Your validation request was not approved'
        }
      } else if (event.entityType === 'ENTITLEMENT') {
        type = 'entitlement'
        if (event.action === 'ENTITLEMENT_ISSUED') {
          title = 'Module Activated'
          description = 'A new module has been activated for your account'
        } else if (event.action === 'ENTITLEMENT_REVOKED') {
          title = 'Module Revoked'
          description = 'A module has been revoked from your account'
        }
      } else if (event.entityType === 'TRANSACTION') {
        type = 'transaction'
        if (event.action === 'TRANSACTION_CREATED') {
          title = 'Transaction Completed'
          description = `${event.newState?.type || 'Transaction'} processed successfully`
        }
      }

      return {
        id: event.eventId,
        type,
        title,
        description,
        timestamp: event.atUtc,
        read: false,
        event
      }
    })

    setNotifications(notificationItems)
  }, [appState.auditEvents, currentUser])

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'validation':
        return <ClipboardText size={18} weight="duotone" className="text-warning" />
      case 'entitlement':
        return <ShoppingCart size={18} weight="duotone" className="text-accent" />
      case 'transaction':
        return <CreditCard size={18} weight="duotone" className="text-success" />
      default:
        return <Shield size={18} weight="duotone" className="text-muted-foreground" />
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const then = new Date(timestamp)
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <Card ref={cardRef}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} weight="duotone" className="text-accent" />
            <CardTitle className="text-lg">Notifications</CardTitle>
          </div>
          {notifications.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {notifications.length}
            </Badge>
          )}
        </div>
        <CardDescription>Recent system events and updates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell size={48} weight="thin" className="mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                You'll see updates about your account here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                          <Clock size={12} />
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      {notification.event.ipAddress && (
                        <p className="text-xs text-muted-foreground/70 monospace">
                          IP: {notification.event.ipAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
