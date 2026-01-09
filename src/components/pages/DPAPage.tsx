export function DPAPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Data Processing Addendum</h1>
        <p className="text-muted-foreground">Last updated: January 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Data Processing Terms</h2>
          <p>
            This addendum governs the processing of personal data by VIFIQ on behalf of operators
            in compliance with GDPR and applicable data protection regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Data Controller Responsibilities</h2>
          <p>
            Operators act as data controllers. VIFIQ acts as data processor, processing data only
            as instructed and necessary for platform operations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Security Measures</h2>
          <p>
            Technical and organizational measures include encryption, access controls, audit logging,
            and regular security assessments to protect processed data.
          </p>
        </section>
      </div>
    </div>
  )
}
