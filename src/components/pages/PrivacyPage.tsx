export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Data Collection</h2>
          <p>
            VIFIQ collects identity verification data, access logs, and operational telemetry necessary for
            validation workflows and audit trail generation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Data Usage</h2>
          <p>
            Collected data is used exclusively for validation, entitlement issuance, audit logging, and platform
            security. Data is not sold or shared with third parties except as required for compliance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Data Protection</h2>
          <p>
            All data is encrypted at rest and in transit using 256-bit encryption. Access logs are immutable and
            stored in compliance with SOC 2 Type II and GDPR requirements.
          </p>
        </section>
      </div>
    </div>
  )
}
