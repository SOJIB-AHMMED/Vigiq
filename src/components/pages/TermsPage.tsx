export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Service Agreement</h2>
          <p>
            VIFIQ ACCOUNTS operates as a governance and orchestration layer for controlled access to infrastructure modules.
            By using this platform, you agree to operate within explicit validation and entitlement frameworks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Access Control</h2>
          <p>
            All access requests are subject to validation workflows. Entitlements are time-bound, revocable, and scoped
            according to declared use cases and compliance requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Operator Responsibilities</h2>
          <p>
            Operators must ensure lawful usage within their jurisdiction. The platform enforces governance but does not
            assume liability for end-use compliance.
          </p>
        </section>
      </div>
    </div>
  )
}
