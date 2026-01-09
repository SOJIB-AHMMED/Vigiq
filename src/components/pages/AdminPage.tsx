import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatusBadge } from '@/components/StatusBadge'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { UserState } from '@/lib/types'

export function AdminPage() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()
  const currentUser = getCurrentUser()
  const isMobile = useIsMobile()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <div className="text-center py-16">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-sm md:text-base text-muted-foreground">This page is restricted to ADMIN users only</p>
      </div>
    )
  }

  const handleChangeUserState = (userId: string, newState: UserState) => {
    const user = appState.users.find(u => u.id === userId)
    if (!user) return

    updateAppState(state => ({
      ...state,
      users: state.users.map(u =>
        u.id === userId ? { ...u, state: newState } : u
      )
    }))

    addAuditEvent({
      entityType: 'USER',
      entityId: userId,
      action: 'USER_STATE_CHANGED',
      previousState: { state: user.state },
      newState: { state: newState },
      actorId: currentUser.id,
      metadata: { reason: 'Admin action' }
    })

    toast.success(`User state updated to ${newState}`)
  }

  const handleDisableModule = (moduleKey: string) => {
    const module = appState.modules.find(m => m.moduleKey === moduleKey)
    if (!module) return

    const newStatus = module.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE'

    updateAppState(state => ({
      ...state,
      modules: state.modules.map(m =>
        m.moduleKey === moduleKey ? { ...m, status: newStatus } : m
      )
    }))

    addAuditEvent({
      entityType: 'MODULE',
      entityId: moduleKey,
      action: 'MODULE_STATUS_CHANGED',
      previousState: { status: module.status },
      newState: { status: newStatus },
      actorId: currentUser.id,
      metadata: {}
    })

    toast.success(`Module ${newStatus.toLowerCase()}`)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Admin Controls</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage modules, users, and governance policies
        </p>
      </div>

      <Tabs defaultValue="modules">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules" className="text-xs md:text-sm">
            {isMobile ? 'Modules' : 'Module Registry'}
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs md:text-sm">
            {isMobile ? 'Users' : 'User Management'}
          </TabsTrigger>
          <TabsTrigger value="policies" className="text-xs md:text-sm">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Module Registry</CardTitle>
              <CardDescription>
                Manage available service modules and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isMobile ? (
                <div className="space-y-3">
                  {appState.modules.map((module) => (
                    <Card key={module.moduleKey} className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <div>
                          <p className="font-medium text-sm">{module.displayName}</p>
                          <p className="text-xs text-muted-foreground monospace">{module.moduleKey}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{module.category}</span>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">${module.pricing.monthlyPrice}/mo</span>
                          {module.moduleKey !== 'ACCOUNT_GOVERNANCE_CORE' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDisableModule(module.moduleKey)}
                            >
                              {module.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module Key</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pricing</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appState.modules.map((module) => (
                      <TableRow key={module.moduleKey}>
                        <TableCell className="monospace text-xs">
                          {module.moduleKey}
                        </TableCell>
                        <TableCell className="font-medium">
                          {module.displayName}
                        </TableCell>
                        <TableCell>{module.category}</TableCell>
                        <TableCell>
                          <StatusBadge status={module.status} />
                        </TableCell>
                        <TableCell className="text-sm">
                          ${module.pricing.monthlyPrice}/mo
                        </TableCell>
                        <TableCell>
                          {module.moduleKey !== 'ACCOUNT_GOVERNANCE_CORE' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDisableModule(module.moduleKey)}
                            >
                              {module.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">User Management</CardTitle>
              <CardDescription>
                Manage user states and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Current State</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appState.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell className="monospace text-sm">{user.role}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.state} />
                      </TableCell>
                      <TableCell>{user.region}</TableCell>
                      <TableCell>
                        <Select
                          value={user.state}
                          onValueChange={(value) => handleChangeUserState(user.id, value as UserState)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                            <SelectItem value="RESTRICTED">RESTRICTED</SelectItem>
                            <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Configuration</CardTitle>
              <CardDescription>
                Platform-wide governance policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Default Entitlement Duration</p>
                  <p className="text-sm text-muted-foreground">
                    Time-bound licensing period for new entitlements
                  </p>
                </div>
                <div className="text-lg font-semibold">
                  {appState.policies.defaultEntitlementDurationDays} days
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
