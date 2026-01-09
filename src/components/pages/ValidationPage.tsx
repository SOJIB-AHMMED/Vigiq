import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from 'sonner'
import { Eye, Plus } from '@phosphor-icons/react'
import { CustomValidationWorkflow } from '@/components/CustomValidationWorkflow'
import type { Validation } from '@/lib/types'

export function ValidationPage() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()
  const currentUser = getCurrentUser()
  const isMobile = useIsMobile()

  const [selectedValidation, setSelectedValidation] = useState<Validation | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [decisionReason, setDecisionReason] = useState('')

  if (!currentUser) return null

  const relevantValidations = currentUser.role === 'ADMIN'
    ? appState.validations
    : appState.validations.filter(v => v.userId === currentUser.id)

  const handleViewDetails = (validation: Validation) => {
    setSelectedValidation(validation)
    setShowDetailSheet(true)
    setDecisionReason('')
  }

  const handleApprove = () => {
    if (!selectedValidation) return
    if (currentUser.role !== 'ADMIN') {
      toast.error('Only admins can approve validations')
      return
    }

    updateAppState(state => ({
      ...state,
      validations: state.validations.map(v =>
        v.validationId === selectedValidation.validationId
          ? {
              ...v,
              status: 'APPROVED' as const,
              validatedAt: new Date().toISOString(),
              reviewerId: currentUser.id,
              decisionReason
            }
          : v
      )
    }))

    addAuditEvent({
      entityType: 'VALIDATION',
      entityId: selectedValidation.validationId,
      action: 'VALIDATION_APPROVED',
      previousState: { status: 'PENDING' },
      newState: { status: 'APPROVED' },
      actorId: currentUser.id,
      metadata: { validationType: selectedValidation.validationType, decisionReason }
    })

    toast.success('Validation approved')
    setShowDetailSheet(false)
    setSelectedValidation(null)
  }

  const handleReject = () => {
    if (!selectedValidation) return
    if (currentUser.role !== 'ADMIN') {
      toast.error('Only admins can reject validations')
      return
    }

    if (!decisionReason.trim()) {
      toast.error('Please provide a reason for rejection')
      return
    }

    updateAppState(state => ({
      ...state,
      validations: state.validations.map(v =>
        v.validationId === selectedValidation.validationId
          ? {
              ...v,
              status: 'REJECTED' as const,
              validatedAt: new Date().toISOString(),
              reviewerId: currentUser.id,
              decisionReason
            }
          : v
      )
    }))

    addAuditEvent({
      entityType: 'VALIDATION',
      entityId: selectedValidation.validationId,
      action: 'VALIDATION_REJECTED',
      previousState: { status: 'PENDING' },
      newState: { status: 'REJECTED' },
      actorId: currentUser.id,
      metadata: { validationType: selectedValidation.validationType, decisionReason }
    })

    toast.success('Validation rejected')
    setShowDetailSheet(false)
    setSelectedValidation(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Validation</h1>
        <p className="text-muted-foreground">
          Identity, compliance, jurisdiction, and risk validation requests
        </p>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="requests">Validation Requests</TabsTrigger>
          <TabsTrigger value="new">
            <Plus size={16} className="mr-2" />
            New Request
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Requests</CardTitle>
              <CardDescription>
                {currentUser.role === 'ADMIN' 
                  ? 'Review and approve validation requests from all users'
                  : 'Your validation requests and their status'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {relevantValidations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No validation requests yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Validation ID</TableHead>
                      <TableHead>Type</TableHead>
                      {currentUser.role === 'ADMIN' && <TableHead>User</TableHead>}
                      <TableHead>Module</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relevantValidations.map((validation) => {
                      const user = appState.users.find(u => u.id === validation.userId)
                      const module = validation.moduleKey 
                        ? appState.modules.find(m => m.moduleKey === validation.moduleKey)
                        : null

                      return (
                        <TableRow key={validation.validationId}>
                          <TableCell className="monospace text-xs">{validation.validationId}</TableCell>
                          <TableCell className="font-medium">{validation.validationType}</TableCell>
                          {currentUser.role === 'ADMIN' && (
                            <TableCell className="text-sm">{user?.email || 'Unknown'}</TableCell>
                          )}
                          <TableCell className="text-sm">
                            {module?.displayName || validation.moduleKey || 'General'}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={validation.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(validation.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleViewDetails(validation)}
                              title="View details"
                              className="h-8 w-8"
                            >
                              <Eye size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <CustomValidationWorkflow />
        </TabsContent>
      </Tabs>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Validation Request Details</SheetTitle>
            <SheetDescription>
              Review validation evidence and make a decision
            </SheetDescription>
          </SheetHeader>
          {selectedValidation && (
            <div className="space-y-6 mt-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Validation ID</Label>
                  <p className="monospace text-sm mt-1">{selectedValidation.validationId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium mt-1">{selectedValidation.validationType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedValidation.status} />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Evidence Reference</Label>
                  <p className="text-sm mt-1 bg-muted/30 p-3 rounded">
                    {selectedValidation.evidenceReference}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Submitted</Label>
                  <p className="text-sm mt-1">
                    {new Date(selectedValidation.submittedAt).toLocaleString()}
                  </p>
                </div>
                {selectedValidation.validatedAt && (
                  <div>
                    <Label className="text-muted-foreground">Validated</Label>
                    <p className="text-sm mt-1">
                      {new Date(selectedValidation.validatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
                {selectedValidation.decisionReason && (
                  <div>
                    <Label className="text-muted-foreground">Decision Reason</Label>
                    <p className="text-sm mt-1 bg-muted/30 p-3 rounded">
                      {selectedValidation.decisionReason}
                    </p>
                  </div>
                )}
              </div>

              {currentUser.role === 'ADMIN' && selectedValidation.status === 'PENDING' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="decision-reason">Decision Reason (required for rejection)</Label>
                    <Textarea
                      id="decision-reason"
                      placeholder="Explain the decision..."
                      value={decisionReason}
                      onChange={(e) => setDecisionReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
