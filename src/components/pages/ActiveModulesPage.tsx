import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Pause, Trash } from '@phosphor-icons/react'

export function ActiveModulesPage() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()
  const currentUser = getCurrentUser()
  const isMobile = useIsMobile()

  if (!currentUser) return null

  const userEntitlements = appState.entitlements.filter(e => e.userId === currentUser.id)

  const handlePauseEntitlement = (entitlementId: string) => {
    const entitlement = appState.entitlements.find(e => e.entitlementId === entitlementId)
    if (!entitlement) return

    updateAppState(state => ({
      ...state,
      entitlements: state.entitlements.map(e =>
        e.entitlementId === entitlementId
          ? { ...e, status: 'SUSPENDED' as const }
          : e
      )
    }))

    addAuditEvent({
      entityType: 'ENTITLEMENT',
      entityId: entitlementId,
      action: 'ENTITLEMENT_SUSPENDED',
      previousState: { status: entitlement.status },
      newState: { status: 'SUSPENDED' },
      actorId: currentUser.id,
      metadata: {}
    })

    toast.success('Entitlement suspended')
  }

  const handleRevokeEntitlement = (entitlementId: string) => {
    const entitlement = appState.entitlements.find(e => e.entitlementId === entitlementId)
    if (!entitlement) return

    if (currentUser.role !== 'ADMIN' && entitlement.userId !== currentUser.id) {
      toast.error('Only admins can revoke other users\' entitlements')
      return
    }

    updateAppState(state => ({
      ...state,
      entitlements: state.entitlements.map(e =>
        e.entitlementId === entitlementId
          ? { ...e, status: 'REVOKED' as const }
          : e
      )
    }))

    addAuditEvent({
      entityType: 'ENTITLEMENT',
      entityId: entitlementId,
      action: 'ENTITLEMENT_REVOKED',
      previousState: { status: entitlement.status },
      newState: { status: 'REVOKED' },
      actorId: currentUser.id,
      metadata: {}
    })

    toast.success('Entitlement revoked')
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Active Modules</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your time-bound entitlements and module access
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">My Entitlements</CardTitle>
          <CardDescription>
            Time-bound licenses for service modules with revocation and suspension controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userEntitlements.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No active entitlements. Visit the Marketplace to activate modules.
            </p>
          ) : isMobile ? (
            <div className="space-y-3">
              {userEntitlements.map((entitlement) => {
                const module = appState.modules.find(m => m.moduleKey === entitlement.moduleKey)
                return (
                  <Card key={entitlement.entitlementId} className="bg-muted/50">
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <p className="font-medium text-sm mb-1">
                          {module?.displayName || entitlement.moduleKey}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{entitlement.scope}</Badge>
                          <StatusBadge status={entitlement.status} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Issued</span>
                          <p>{new Date(entitlement.issuedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expires</span>
                          <p>{entitlement.expiresAt 
                            ? new Date(entitlement.expiresAt).toLocaleDateString()
                            : 'No expiration'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {entitlement.status === 'ACTIVE' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handlePauseEntitlement(entitlement.entitlementId)}
                          >
                            Pause
                          </Button>
                        )}
                        {(entitlement.status === 'ACTIVE' || entitlement.status === 'SUSPENDED') && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleRevokeEntitlement(entitlement.entitlementId)}
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userEntitlements.map((entitlement) => {
                  const module = appState.modules.find(m => m.moduleKey === entitlement.moduleKey)
                  return (
                    <TableRow key={entitlement.entitlementId}>
                      <TableCell className="font-medium">
                        {module?.displayName || entitlement.moduleKey}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{entitlement.scope}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={entitlement.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(entitlement.issuedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entitlement.expiresAt 
                          ? new Date(entitlement.expiresAt).toLocaleDateString()
                          : 'No expiration'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {entitlement.status === 'ACTIVE' && (
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handlePauseEntitlement(entitlement.entitlementId)}
                              title="Pause"
                              className="h-8 w-8"
                            >
                              <Pause size={16} />
                            </Button>
                          )}
                          {(entitlement.status === 'ACTIVE' || entitlement.status === 'SUSPENDED') && (
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleRevokeEntitlement(entitlement.entitlementId)}
                              title="Revoke"
                              className="h-8 w-8"
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
