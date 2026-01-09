export function KYCPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">KYC/KYB Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Identity Verification</h2>
          <p>
            All operators must complete Know Your Customer (KYC) or Know Your Business (KYB) validation
            before access entitlements are issued.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Required Documentation</h2>
          <p>
            Individual operators: Government-issued ID, proof of address, and identity verification.
            Business operators: Corporate registration, beneficial ownership disclosure, and compliance certificates.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Ongoing Monitoring</h2>
          <p>
            Verification status is reviewed periodically. Operators must update documentation as requested
            to maintain active entitlements.
          </p>
        </section>
      </div>
    </div>
  )
}
