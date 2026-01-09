import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/StatusBadge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth'
import { Shield, Lock, CheckCircle, Database, CreditCard, MagnifyingGlass, X, Funnel, SortAscending } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Module } from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function MarketplacePage() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()

  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [showActivationDialog, setShowActivationDialog] = useState(false)
  const [showValidationDialog, setShowValidationDialog] = useState(false)
  const [validationEvidence, setValidationEvidence] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  const currentUser = getCurrentUser()

  const userEntitlements = useMemo(() => 
    appState.entitlements.filter(e => e.userId === currentUser?.id),
    [appState.entitlements, currentUser?.id]
  )
  
  const userValidations = useMemo(() => 
    appState.validations.filter(v => v.userId === currentUser?.id),
    [appState.validations, currentUser?.id]
  )

  const getModuleStatus = useMemo(() => {
    return (module: Module): { status: string; canActivate: boolean; reason: string } => {
      if (!currentUser) return { status: 'LOCKED', canActivate: false, reason: 'Not authenticated' }
      
      if (module.moduleKey === 'ACCOUNT_GOVERNANCE_CORE') {
        return { status: 'CORE', canActivate: false, reason: 'Core governance layer (always active)' }
      }

      const existingEntitlement = userEntitlements.find(e => e.moduleKey === module.moduleKey)
      
      if (existingEntitlement) {
        if (existingEntitlement.status === 'ACTIVE') {
          return { status: 'ACTIVE', canActivate: false, reason: 'Module already active' }
        }
        if (existingEntitlement.status === 'REVOKED') {
          return { status: 'REVOKED', canActivate: false, reason: 'Entitlement revoked' }
        }
      }

      if (currentUser.state !== 'ACTIVE') {
        return { status: 'LOCKED', canActivate: false, reason: 'Account must be ACTIVE' }
      }

      for (const depKey of module.dependencies) {
        const depEntitlement = userEntitlements.find(e => e.moduleKey === depKey && e.status === 'ACTIVE')
        if (!depEntitlement && depKey !== 'ACCOUNT_GOVERNANCE_CORE') {
          const depModule = appState.modules.find(m => m.moduleKey === depKey)
          return { 
            status: 'LOCKED', 
            canActivate: false, 
            reason: `Requires active: ${depModule?.displayName || depKey}` 
          }
        }
      }

      if (module.requiresValidation) {
        const hasApprovedValidation = userValidations.some(
          v => (v.moduleKey === module.moduleKey || v.moduleKey === null) && 
               v.status === 'APPROVED' &&
               v.validationType === 'IDENTITY'
        )
        
        if (!hasApprovedValidation) {
          return { 
            status: 'PENDING_VALIDATION', 
            canActivate: true, 
            reason: 'Validation required before activation' 
          }
        }
      }

      return { status: 'AVAILABLE', canActivate: true, reason: 'Ready to activate' }
    }
  }, [currentUser, userEntitlements, userValidations, appState.modules])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(appState.modules.map(m => m.category)))
    return cats.sort()
  }, [appState.modules])

  const filteredAndSortedModules = useMemo(() => {
    let filtered = appState.modules.filter(module => {
      const matchesSearch = searchQuery.trim() === '' || 
        module.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory

      if (!matchesSearch || !matchesCategory) return false

      if (selectedStatus !== 'all') {
        const moduleStatus = getModuleStatus(module)
        if (selectedStatus === 'active' && moduleStatus.status !== 'ACTIVE') return false
        if (selectedStatus === 'available' && moduleStatus.status !== 'AVAILABLE') return false
        if (selectedStatus === 'locked' && moduleStatus.status !== 'LOCKED') return false
        if (selectedStatus === 'pending' && moduleStatus.status !== 'PENDING_VALIDATION') return false
      }

      return true
    })

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.displayName.localeCompare(b.displayName)
      } else if (sortBy === 'price-low') {
        return a.pricing.monthlyPrice - b.pricing.monthlyPrice
      } else if (sortBy === 'price-high') {
        return b.pricing.monthlyPrice - a.pricing.monthlyPrice
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category)
      }
      return 0
    })

    return filtered
  }, [appState.modules, searchQuery, selectedCategory, selectedStatus, sortBy, getModuleStatus])

  const modulesByCategory = useMemo(() => {
    return filteredAndSortedModules.reduce((acc, module) => {
      if (!acc[module.category]) {
        acc[module.category] = []
      }
      acc[module.category].push(module)
      return acc
    }, {} as Record<string, Module[]>)
  }, [filteredAndSortedModules])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSortBy('name')
  }

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedStatus !== 'all' || sortBy !== 'name'

  if (!currentUser) return null

  const handleActivateModule = (module: Module) => {
    setSelectedModule(module)
    const moduleStatus = getModuleStatus(module)

    if (!moduleStatus.canActivate) {
      toast.error(moduleStatus.reason)
      return
    }

    if (moduleStatus.status === 'PENDING_VALIDATION') {
      setShowValidationDialog(true)
      return
    }

    setShowActivationDialog(true)
    setPaymentAmount(module.pricing.monthlyPrice.toString())
  }

  const handleSubmitValidation = () => {
    if (!selectedModule || !validationEvidence.trim()) {
      toast.error('Please provide evidence reference')
      return
    }

    const newValidation = {
      validationId: `val-${Date.now()}`,
      userId: currentUser.id,
      moduleKey: selectedModule.moduleKey,
      validationType: 'IDENTITY' as const,
      status: 'PENDING' as const,
      evidenceReference: validationEvidence,
      validatedAt: null,
      submittedAt: new Date().toISOString(),
      reviewerId: null,
      decisionReason: null
    }

    updateAppState(state => ({
      ...state,
      validations: [...state.validations, newValidation]
    }))

    addAuditEvent({
      entityType: 'VALIDATION',
      entityId: newValidation.validationId,
      action: 'VALIDATION_SUBMITTED',
      previousState: null,
      newState: { status: 'PENDING', validationType: 'IDENTITY' },
      actorId: currentUser.id,
      metadata: { moduleKey: selectedModule.moduleKey }
    })

    toast.success('Validation request submitted')
    setShowValidationDialog(false)
    setValidationEvidence('')
    setSelectedModule(null)
  }

  const handleCompleteActivation = () => {
    if (!selectedModule) return

    const newEntitlement = {
      entitlementId: `ent-${Date.now()}`,
      userId: currentUser.id,
      moduleKey: selectedModule.moduleKey,
      scope: 'full',
      limits: {},
      status: 'ACTIVE' as const,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + appState.policies.defaultEntitlementDurationDays * 24 * 60 * 60 * 1000).toISOString()
    }

    const transaction = {
      transactionId: `tx-${Date.now()}`,
      userId: currentUser.id,
      type: 'CHARGE' as const,
      amount: selectedModule.pricing.monthlyPrice,
      currency: 'USD',
      reference: `${selectedModule.displayName} monthly subscription`,
      atUtc: new Date().toISOString()
    }

    updateAppState(state => ({
      ...state,
      entitlements: [...state.entitlements, newEntitlement],
      transactions: [...state.transactions, transaction],
      walletBalance: state.walletBalance - transaction.amount
    }))

    addAuditEvent({
      entityType: 'ENTITLEMENT',
      entityId: newEntitlement.entitlementId,
      action: 'ENTITLEMENT_ISSUED',
      previousState: null,
      newState: { moduleKey: selectedModule.moduleKey, status: 'ACTIVE' },
      actorId: currentUser.id,
      metadata: { scope: 'full' }
    })

    toast.success(`${selectedModule.displayName} activated successfully`)
    setShowActivationDialog(false)
    setSelectedModule(null)
    setPaymentAmount('')
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Module Marketplace</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Governed service modules with validation requirements and dependency enforcement
        </p>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-background"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2 self-start md:self-auto"
              >
                <X size={16} />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Funnel size={14} />
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Funnel size={14} />
                Status
              </Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending Validation</SelectItem>
                  <SelectItem value="locked">Locked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <SortAscending size={14} />
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredAndSortedModules.length} of {appState.modules.length} services
            </span>
            {hasActiveFilters && (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                Filters Active
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {Object.entries(modulesByCategory).map(([category, modules]) => (
        <div key={category}>
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{category} Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {modules.map((module) => {
              const moduleStatus = getModuleStatus(module)
              const isCore = module.moduleKey === 'ACCOUNT_GOVERNANCE_CORE'

              return (
                <Card key={module.moduleKey} className="relative">
                  {!moduleStatus.canActivate && !isCore && (
                    <div className="absolute top-4 right-4">
                      <Lock size={20} className="text-muted-foreground" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{module.displayName}</CardTitle>
                    </div>
                    <CardDescription className="text-xs font-medium">
                      {module.category}
                      {module.replaceable && <span className="ml-2 text-accent">• Replaceable</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>

                    {module.dependencies.length > 0 && (
                      <div className="text-xs">
                        <p className="text-muted-foreground mb-1">Dependencies:</p>
                        <div className="flex flex-wrap gap-1">
                          {module.dependencies.map(dep => {
                            const depModule = appState.modules.find(m => m.moduleKey === dep)
                            return (
                              <Badge key={dep} variant="outline" className="text-xs">
                                {depModule?.displayName || dep}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {module.requiresValidation && (
                      <div className="flex items-center gap-2 text-sm">
                        <Shield size={16} className="text-accent" />
                        <span className="text-muted-foreground">Validation required</span>
                      </div>
                    )}

                    {!isCore && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Monthly:</span>
                            <span className="font-semibold">${module.pricing.monthlyPrice}</span>
                          </div>
                          {module.metered && (
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Usage:</span>
                              <span>${module.pricing.usagePrice}/{module.pricing.usageUnit}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="pt-2">
                      {moduleStatus.status === 'ACTIVE' && (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle size={14} className="mr-1" />
                          Active
                        </Badge>
                      )}
                      {moduleStatus.status === 'CORE' && (
                        <Badge variant="outline">
                          <Database size={14} className="mr-1" />
                          Core Service
                        </Badge>
                      )}
                      {moduleStatus.status === 'AVAILABLE' && (
                        <Button 
                          size="sm" 
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => handleActivateModule(module)}
                        >
                          Request Activation
                        </Button>
                      )}
                      {moduleStatus.status === 'PENDING_VALIDATION' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full"
                          onClick={() => handleActivateModule(module)}
                        >
                          Submit Validation
                        </Button>
                      )}
                      {(moduleStatus.status === 'LOCKED' || moduleStatus.status === 'REVOKED') && (
                        <div className="text-xs text-destructive">
                          {moduleStatus.reason}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Validation Request</DialogTitle>
            <DialogDescription>
              This module requires identity validation. Provide evidence reference for admin review.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Module</Label>
              <Input value={selectedModule?.displayName || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence Reference</Label>
              <Textarea
                id="evidence"
                placeholder="Describe validation evidence or reference documents..."
                value={validationEvidence}
                onChange={(e) => setValidationEvidence(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowValidationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitValidation} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Submit for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showActivationDialog} onOpenChange={setShowActivationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Module</DialogTitle>
            <DialogDescription>
              Complete mock payment to issue time-bound entitlement
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Module</Label>
                <Input value={selectedModule.displayName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Entitlement Duration</Label>
                <Input value={`${appState.policies.defaultEntitlementDurationDays} days`} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Amount (USD)</Label>
                <div className="flex items-center gap-2">
                  <CreditCard size={20} className="text-muted-foreground" />
                  <Input
                    id="payment"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded text-sm">
                <p className="text-muted-foreground">
                  This is a mock payment. No real charges will be processed.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActivationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCompleteActivation} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Complete Activation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
