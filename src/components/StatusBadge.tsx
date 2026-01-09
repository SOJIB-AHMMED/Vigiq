import { Badge } from '@/components/ui/badge'
import type { UserState, ValidationStatus, EntitlementStatus, ModuleStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: UserState | ValidationStatus | EntitlementStatus | ModuleStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className: string }> = {
    ACTIVE: { variant: 'default', className: 'bg-success text-success-foreground' },
    APPROVED: { variant: 'default', className: 'bg-success text-success-foreground' },
    ISSUED: { variant: 'default', className: 'bg-accent text-accent-foreground' },
    
    PENDING: { variant: 'default', className: 'bg-warning text-warning-foreground' },
    
    RESTRICTED: { variant: 'destructive', className: '' },
    SUSPENDED: { variant: 'destructive', className: '' },
    REVOKED: { variant: 'destructive', className: '' },
    REJECTED: { variant: 'destructive', className: '' },
    
    EXPIRED: { variant: 'outline', className: 'opacity-60' },
    DISABLED: { variant: 'outline', className: 'opacity-60' },
  }

  const config = variants[status] || { variant: 'secondary' as const, className: '' }

  return (
    <Badge variant={config.variant} className={`${config.className} ${className || ''}`}>
      {status}
    </Badge>
  )
}
