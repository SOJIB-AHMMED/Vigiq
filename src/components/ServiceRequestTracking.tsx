import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Clock, CheckCircle, XCircle, HourglassHigh, Package, Plus, MagnifyingGlass, Download } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

type RequestStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'CANCELLED'

type ServiceRequest = {
  id: string
  serviceDomain: string
  serviceType: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  notes: string
  jurisdiction: string
  urgency: 'STANDARD' | 'PRIORITY'
  statusHistory: {
    status: RequestStatus
    timestamp: string
    note?: string
  }[]
}

const statusConfig: Record<RequestStatus, { label: string; icon: React.ComponentType<any>; color: string; bgColor: string }> = {
  PENDING: { label: 'Pending', icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10 border-yellow-500/30' },
  UNDER_REVIEW: { label: 'Under Review', icon: HourglassHigh, color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/30' },
  APPROVED: { label: 'Approved', icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10 border-green-500/30' },
  IN_PROGRESS: { label: 'In Progress', icon: Package, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/30' },
  COMPLETED: { label: 'Completed', icon: CheckCircle, color: 'text-accent', bgColor: 'bg-accent/10 border-accent/30' },
  REJECTED: { label: 'Rejected', icon: XCircle, color: 'text-destructive', bgColor: 'bg-destructive/10 border-destructive/30' },
  CANCELLED: { label: 'Cancelled', icon: XCircle, color: 'text-muted-foreground', bgColor: 'bg-muted border-border' }
}

const serviceDomains = [
  { value: 'wise', label: 'Wise Banking' },
  { value: 'revolut', label: 'Revolut Ecosystem' },
  { value: 'betting', label: 'Betting Platforms' },
  { value: 'trading', label: 'Trading Infrastructure' },
  { value: 'business', label: 'Business Solutions' },
  { value: 'crypto', label: 'Crypto Access' },
  { value: 'regions', label: 'Regional Banking' }
]

export function ServiceRequestTracking() {
  const [requests, setRequests] = useKV<ServiceRequest[]>('service-requests', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)

  const [newRequest, setNewRequest] = useState({
    serviceDomain: '',
    serviceType: '',
    jurisdiction: '',
    urgency: 'STANDARD' as 'STANDARD' | 'PRIORITY',
    notes: ''
  })

  const createRequest = () => {
    if (!newRequest.serviceDomain || !newRequest.serviceType || !newRequest.jurisdiction) {
      toast.error('Please fill in all required fields')
      return
    }

    const request: ServiceRequest = {
      id: `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      serviceDomain: newRequest.serviceDomain,
      serviceType: newRequest.serviceType,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: calculateEstimatedDelivery(newRequest.urgency),
      notes: newRequest.notes,
      jurisdiction: newRequest.jurisdiction,
      urgency: newRequest.urgency,
      statusHistory: [{
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        note: 'Request created'
      }]
    }

    setRequests(current => [request, ...(current || [])])
    
    setNewRequest({
      serviceDomain: '',
      serviceType: '',
      jurisdiction: '',
      urgency: 'STANDARD',
      notes: ''
    })
    setIsCreateDialogOpen(false)

    toast.success('Service request created', {
      description: `Request ID: ${request.id}`
    })
  }

  const calculateEstimatedDelivery = (urgency: 'STANDARD' | 'PRIORITY'): string => {
    const days = urgency === 'PRIORITY' ? 3 : 7
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString()
  }

  const updateRequestStatus = (requestId: string, newStatus: RequestStatus, note?: string) => {
    setRequests(current => 
      (current || []).map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            statusHistory: [
              ...req.statusHistory,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                note
              }
            ]
          }
        }
        return req
      })
    )

    toast.success('Status updated', {
      description: `Request moved to ${statusConfig[newStatus].label}`
    })
  }

  const filteredRequests = (requests || []).filter(req => {
    const matchesSearch = req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         serviceDomains.find(d => d.value === req.serviceDomain)?.label.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportRequests = () => {
    const dataStr = JSON.stringify(filteredRequests, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `service-requests-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Requests exported successfully')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Package size={32} className="text-accent" weight="bold" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold">Service Request Tracking</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your service requests from submission to completion with real-time status updates
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:min-w-[300px]">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by ID, service type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RequestStatus | 'ALL')}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={exportRequests}
            className="flex-1 sm:flex-none"
            disabled={filteredRequests.length === 0}
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1 sm:flex-none">
                <Plus size={16} className="mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Service Request</DialogTitle>
                <DialogDescription>
                  Submit a new request for service enablement
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceDomain">Service Domain *</Label>
                  <Select value={newRequest.serviceDomain} onValueChange={(value) => setNewRequest(prev => ({ ...prev, serviceDomain: value }))}>
                    <SelectTrigger id="serviceDomain">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceDomains.map(domain => (
                        <SelectItem key={domain.value} value={domain.value}>
                          {domain.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Input
                    id="serviceType"
                    placeholder="e.g., Business Account, Personal Wallet"
                    value={newRequest.serviceType}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, serviceType: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction *</Label>
                  <Input
                    id="jurisdiction"
                    placeholder="e.g., UK, EU, US"
                    value={newRequest.jurisdiction}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, jurisdiction: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest(prev => ({ ...prev, urgency: value as 'STANDARD' | 'PRIORITY' }))}>
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STANDARD">Standard (7 days)</SelectItem>
                      <SelectItem value="PRIORITY">Priority (3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional information or requirements..."
                    value={newRequest.notes}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={createRequest} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                  Create Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <Package size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== 'ALL' 
                    ? 'No requests match your filters' 
                    : 'No service requests yet. Create your first request to get started.'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4"
          >
            {filteredRequests.map((request, index) => {
              const statusInfo = statusConfig[request.status]
              const StatusIcon = statusInfo.icon
              const domain = serviceDomains.find(d => d.value === request.serviceDomain)

              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedRequest(request)}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-lg font-mono">{request.id}</CardTitle>
                            {request.urgency === 'PRIORITY' && (
                              <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                                Priority
                              </Badge>
                            )}
                          </div>
                          <CardDescription>
                            {domain?.label} · {request.serviceType}
                          </CardDescription>
                        </div>
                        
                        <Badge variant="outline" className={`${statusInfo.bgColor} ${statusInfo.color} border shrink-0`}>
                          <StatusIcon size={14} className="mr-1.5" weight="bold" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Created</div>
                          <div className="font-medium">{formatDate(request.createdAt)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Updated</div>
                          <div className="font-medium">{formatDate(request.updatedAt)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Jurisdiction</div>
                          <div className="font-medium">{request.jurisdiction}</div>
                        </div>
                        {request.estimatedDelivery && (
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Est. Delivery</div>
                            <div className="font-medium">{formatDate(request.estimatedDelivery)}</div>
                          </div>
                        )}
                      </div>

                      {request.notes && (
                        <>
                          <Separator />
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Notes: </span>
                            {request.notes}
                          </div>
                        </>
                      )}

                      <Separator />

                      <div className="flex gap-2 flex-wrap">
                        {request.status === 'PENDING' && (
                          <>
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'UNDER_REVIEW', 'Moved to review') }}>
                              Move to Review
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'CANCELLED', 'Cancelled by user') }}>
                              Cancel
                            </Button>
                          </>
                        )}
                        {request.status === 'UNDER_REVIEW' && (
                          <>
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'APPROVED', 'Request approved') }}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'REJECTED', 'Request rejected') }}>
                              Reject
                            </Button>
                          </>
                        )}
                        {request.status === 'APPROVED' && (
                          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'IN_PROGRESS', 'Enablement started') }}>
                            Start Processing
                          </Button>
                        )}
                        {request.status === 'IN_PROGRESS' && (
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={(e) => { e.stopPropagation(); updateRequestStatus(request.id, 'COMPLETED', 'Service enabled successfully') }}>
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        {selectedRequest && (
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-mono">{selectedRequest.id}</DialogTitle>
              <DialogDescription>
                Complete request timeline and status history
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Service Domain</div>
                  <div className="font-medium">{serviceDomains.find(d => d.value === selectedRequest.serviceDomain)?.label}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Service Type</div>
                  <div className="font-medium">{selectedRequest.serviceType}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Jurisdiction</div>
                  <div className="font-medium">{selectedRequest.jurisdiction}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Urgency</div>
                  <div className="font-medium">{selectedRequest.urgency}</div>
                </div>
              </div>

              {selectedRequest.notes && (
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <div className="text-muted-foreground text-xs mb-1">Notes</div>
                  <div>{selectedRequest.notes}</div>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Status History</h4>
                <div className="space-y-3">
                  {selectedRequest.statusHistory.map((history, index) => {
                    const statusInfo = statusConfig[history.status]
                    const StatusIcon = statusInfo.icon
                    return (
                      <div key={index} className="flex gap-3">
                        <div className={`p-2 rounded-lg ${statusInfo.bgColor} h-fit`}>
                          <StatusIcon size={16} className={statusInfo.color} weight="bold" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-medium text-sm">{statusInfo.label}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(history.timestamp)}</span>
                          </div>
                          {history.note && (
                            <p className="text-sm text-muted-foreground">{history.note}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </motion.div>
  )
}
