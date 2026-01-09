import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { Download } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { EntityType } from '@/lib/types'

export function AuditLogPage() {
  const { appState } = useAuth()
  const isMobile = useIsMobile()
  
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('ALL')
  const [actionFilter, setActionFilter] = useState<string>('ALL')

  const filteredEvents = appState.auditEvents
    .filter(e => entityTypeFilter === 'ALL' || e.entityType === entityTypeFilter)
    .filter(e => actionFilter === 'ALL' || e.action === actionFilter)
    .sort((a, b) => new Date(b.atUtc).getTime() - new Date(a.atUtc).getTime())

  const uniqueEntityTypes = Array.from(new Set(appState.auditEvents.map(e => e.entityType)))
  const uniqueActions = Array.from(new Set(appState.auditEvents.map(e => e.action)))

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredEvents, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `audit-log-${new Date().toISOString()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Audit log exported')
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Audit Log</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Immutable event stream of all governance actions with before/after state tracking
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg md:text-xl">Audit Events</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {filteredEvents.length} events • No deletion • Export only
              </CardDescription>
            </div>
            <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={handleExport} className="w-full sm:w-auto">
              <Download size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Entity Types</SelectItem>
                  {uniqueEntityTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No audit events match the selected filters
            </p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => {
                    const actor = appState.users.find(u => u.id === event.actorId)
                    
                    return (
                      <TableRow key={event.eventId}>
                        <TableCell className="monospace text-xs">
                          {event.eventId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.entityType}
                        </TableCell>
                        <TableCell className="monospace text-xs">
                          {event.entityId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.action}
                        </TableCell>
                        <TableCell className="text-sm">
                          {actor?.email || event.actorId}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(event.atUtc).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Integrity Guarantees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Immutability:</strong> Events cannot be modified or deleted once recorded
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Complete History:</strong> Before and after states captured for all mutations
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Actor Accountability:</strong> All actions traced to authenticated user or system
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Exportable:</strong> Full audit trail can be exported for compliance review
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
