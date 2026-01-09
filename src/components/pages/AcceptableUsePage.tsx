export function AcceptableUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Acceptable Use Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Permitted Use</h2>
          <p>
            The platform may only be used for lawful business operations within the operator's jurisdiction.
            All activity must comply with applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Prohibited Activities</h2>
          <p>
            The platform must not be used for fraudulent activity, money laundering, unauthorized access,
            or any activity that violates local, national, or international law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Enforcement</h2>
          <p>
            Violations result in immediate entitlement revocation and account suspension. Serious violations
            are reported to relevant authorities.
          </p>
        </section>
      </div>
    </div>
  )
}
