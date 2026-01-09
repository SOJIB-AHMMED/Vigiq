import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/lib/auth'
import { useIsMobile } from '@/hooks/use-mobile'
import { CreditCard, Wallet } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function BillingPage() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()
  const currentUser = getCurrentUser()
  const isMobile = useIsMobile()

  const [showTopUpDialog, setShowTopUpDialog] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')

  if (!currentUser) return null

  const userTransactions = appState.transactions
    .filter(t => t.userId === currentUser.id)
    .sort((a, b) => new Date(b.atUtc).getTime() - new Date(a.atUtc).getTime())

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount)
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    const transaction = {
      transactionId: `tx-${Date.now()}`,
      userId: currentUser.id,
      type: 'TOPUP' as const,
      amount,
      currency: 'USD',
      reference: 'Mock wallet top-up',
      atUtc: new Date().toISOString()
    }

    updateAppState(state => ({
      ...state,
      transactions: [...state.transactions, transaction],
      walletBalance: state.walletBalance + amount
    }))

    addAuditEvent({
      entityType: 'TRANSACTION',
      entityId: transaction.transactionId,
      action: 'WALLET_TOPUP',
      previousState: { balance: appState.walletBalance },
      newState: { balance: appState.walletBalance + amount },
      actorId: currentUser.id,
      metadata: { amount, currency: 'USD' }
    })

    toast.success(`Wallet topped up with $${amount.toFixed(2)}`)
    setShowTopUpDialog(false)
    setTopUpAmount('')
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Usage & Billing</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Mock wallet balance and transaction history
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-xs md:text-sm">
              <Wallet size={16} className="text-accent md:w-[18px] md:h-[18px]" />
              Wallet Balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold mb-4">
              ${appState.walletBalance.toFixed(2)}
            </div>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setShowTopUpDialog(true)}
            >
              <CreditCard size={18} className="mr-2" />
              Add Funds
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Transaction Summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Top-ups:</span>
              <span className="font-semibold">
                ${userTransactions
                  .filter(t => t.type === 'TOPUP')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Charges:</span>
              <span className="font-semibold">
                ${userTransactions
                  .filter(t => t.type === 'CHARGE')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Refunds:</span>
              <span className="font-semibold">
                ${userTransactions
                  .filter(t => t.type === 'REFUND')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>All wallet transactions and module charges</CardDescription>
        </CardHeader>
        <CardContent>
          {userTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No transactions yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userTransactions.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell className="monospace text-xs">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell>
                      <span className={
                        transaction.type === 'TOPUP' 
                          ? 'text-success' 
                          : transaction.type === 'CHARGE'
                          ? 'text-destructive'
                          : 'text-warning'
                      }>
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {transaction.type === 'TOPUP' ? '+' : '-'}
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transaction.reference}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(transaction.atUtc).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
            <DialogDescription>
              Mock payment to top up your wallet balance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100.00"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="bg-muted/30 p-3 rounded text-sm text-muted-foreground">
              This is a mock payment. No real charges will be processed.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTopUpDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleTopUp} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Complete Top-Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
