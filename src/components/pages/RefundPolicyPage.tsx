export function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Refund Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Refund Eligibility</h2>
          <p>
            Refunds are available within 14 days of initial payment for services not yet activated or provisioned.
            Once entitlements are issued, refunds are subject to review.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Processing Time</h2>
          <p>
            Approved refunds are processed within 5-7 business days to the original payment method.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Non-Refundable Items</h2>
          <p>
            Validation fees, compliance processing charges, and consumed entitlement credits are non-refundable.
          </p>
        </section>
      </div>
    </div>
  )
}
