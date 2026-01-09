import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Quotes, CheckCircle, TrendUp, Shield, Bank, Buildings, ChartLine, ArrowRight, Icon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState, createElement, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { WiseLogo, RevolutLogo, Bet365Logo, BinanceLogo, N26Logo, BetfairLogo } from '@/components/partners'

interface CaseStudy {
  company: string
  industry: string
  logo: React.ComponentType<{ size?: 'sm' | 'md' | 'lg' }> | Icon
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  testimonial: string
  author: string
  role: string
  avatar: string
  services: string[]
  color: string
  icon: Icon
}

const caseStudies: CaseStudy[] = [
  {
    company: 'Global FinTech Solutions',
    industry: 'Financial Technology',
    logo: WiseLogo,
    challenge: 'Required multi-jurisdiction banking infrastructure with real-time compliance validation for 50+ international clients. Manual verification processes caused 5-7 day delays and compliance gaps.',
    solution: 'Implemented VIFIQ ACCOUNTS with Virtual Banking module and NUMSYNC for phone verification. Automated endpoint validation reduced onboarding time by 85% with complete audit trails.',
    results: [
      { metric: 'Onboarding Time', value: '18 hours', description: 'From 5-7 days to under 24 hours' },
      { metric: 'Compliance Score', value: '100%', description: 'Zero audit findings in 6 months' },
      { metric: 'Cost Reduction', value: '72%', description: 'Operational overhead decreased' }
    ],
    testimonial: 'VIFIQ ACCOUNTS transformed our banking infrastructure deployment. The endpoint validation framework eliminated manual verification bottlenecks while maintaining regulatory compliance. We can now onboard enterprise clients in hours, not days.',
    author: 'Sarah Chen',
    role: 'Chief Compliance Officer',
    avatar: '👩',
    services: ['Virtual Banking', 'NUMSYNC', 'Audit Logging'],
    color: 'success',
    icon: Bank
  },
  {
    company: 'SportsBet Global',
    industry: 'Online Betting & Gaming',
    logo: Bet365Logo,
    challenge: 'Managing betting accounts across 12 jurisdictions with varying KYC requirements. Needed granular control over account access with instant revocation capabilities for regulatory compliance.',
    solution: 'Deployed VIFIQ ACCOUNTS Betting module with time-bound licensing and SYNC-IP for geographic validation. Real-time endpoint verification ensured jurisdiction-specific compliance.',
    results: [
      { metric: 'Regulatory Violations', value: '0', description: 'Perfect compliance record' },
      { metric: 'Account Provisioning', value: '95% faster', description: 'Automated validation process' },
      { metric: 'Audit Confidence', value: '100%', description: 'Complete transaction traceability' }
    ],
    testimonial: 'The endpoint validation system is phenomenal. We have complete visibility into every account interaction with instant revocation when needed. The audit trail has made regulatory inspections seamless and given our board complete confidence in our compliance posture.',
    author: 'Marcus Rodriguez',
    role: 'VP of Regulatory Affairs',
    avatar: '👨',
    services: ['Betting Accounts', 'SYNC-IP', 'Instant Revocation'],
    color: 'destructive',
    icon: ChartLine
  },
  {
    company: 'VentureLaunch Partners',
    industry: 'Corporate Services',
    logo: Buildings,
    challenge: 'Forming 100+ entities annually across UK, US, and EU jurisdictions. Inconsistent documentation, extended timelines, and lack of audit trails created operational risk and client dissatisfaction.',
    solution: 'Integrated Company Formation module with automated jurisdiction validation and document verification. VIFIQ governance framework provided complete audit transparency for all entity registrations.',
    results: [
      { metric: 'Formation Speed', value: '3-5 days', description: 'From 4-6 weeks average' },
      { metric: 'Documentation Errors', value: '98% reduction', description: 'Automated validation eliminated manual mistakes' },
      { metric: 'Client Satisfaction', value: '4.9/5.0', description: 'Up from 3.2/5.0 rating' }
    ],
    testimonial: 'VIFIQ ACCOUNTS has revolutionized how we handle entity formation. The endpoint validation ensures every document meets jurisdiction requirements before submission. Our clients now receive banking-ready entities in days with complete documentation transparency.',
    author: 'Diana Kowalski',
    role: 'Managing Director',
    avatar: '👩',
    services: ['Company Formation', 'Document Validation', 'Multi-Jurisdiction'],
    color: 'accent',
    icon: Buildings
  },
  {
    company: 'TradePro Analytics',
    industry: 'Trading & Investment',
    logo: BinanceLogo,
    challenge: 'Required secure trading account infrastructure with real-time endpoint verification for algorithmic trading. Needed microsecond-level access validation without compromising security posture.',
    solution: 'Implemented trading infrastructure with SYNCPLAYER for isolated testing environments and real-time endpoint validation. Time-bound licensing ensured automatic access expiration for enhanced security.',
    results: [
      { metric: 'Security Incidents', value: '0', description: 'Zero breaches in 18 months' },
      { metric: 'Access Validation', value: '<100ms', description: 'Real-time verification latency' },
      { metric: 'Development Velocity', value: '3x faster', description: 'Isolated test environments' }
    ],
    testimonial: 'The combination of endpoint validation with SYNCPLAYER isolated environments has been game-changing. We can test algorithmic strategies without risking production credentials, and the audit trail gives our compliance team complete confidence in our security controls.',
    author: 'James Patterson',
    role: 'Head of Infrastructure',
    avatar: '👨',
    services: ['Trading Accounts', 'SYNCPLAYER', 'Time-Bound Licensing'],
    color: 'warning',
    icon: TrendUp
  }
]

export function PartnerTestimonials() {
  const [selectedCase, setSelectedCase] = useState<number>(0)
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setExpandedCards({})
  }, [selectedCase])

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="space-y-16">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
        >
          <Shield size={18} className="text-accent" weight="bold" />
          <span className="text-sm font-bold text-accent tracking-wider">INSTITUTIONAL VALIDATION CASE STUDIES</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent"
        >
          Enterprise Endpoint Validation Outcomes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Institutional organizations achieving regulatory compliance perfection and operational optimization through governed endpoint validation frameworks
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {caseStudies.map((study, index) => {
          const IconComponent = study.icon
          return (
            <motion.button
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCase(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedCase === index
                  ? `border-${study.color}/70 bg-${study.color}/10 shadow-lg shadow-${study.color}/20`
                  : 'border-border/50 bg-card/30 hover:border-accent/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0">
                  <study.logo size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{study.company}</div>
                  <div className="text-xs text-muted-foreground truncate">{study.industry}</div>
                </div>
              </div>
              {selectedCase === index && (
                <div className="flex items-center gap-1 text-accent text-xs mt-2">
                  <ArrowRight size={14} weight="bold" />
                  <span className="font-medium">Selected</span>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      <motion.div
        key={selectedCase}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Card className="border-2 border-border/50 shadow-2xl overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${caseStudies[selectedCase].color}/60 via-${caseStudies[selectedCase].color} to-${caseStudies[selectedCase].color}/60`} />
          
          <CardHeader className="pb-6 pt-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className={`p-4 rounded-2xl bg-gradient-to-br from-${caseStudies[selectedCase].color}/20 to-${caseStudies[selectedCase].color}/10 border-2 border-${caseStudies[selectedCase].color}/30 shadow-lg`}>
                  {createElement(caseStudies[selectedCase].logo, { size: 'md' })}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-3xl">{caseStudies[selectedCase].company}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(selectedCase)}
                        className="text-xs font-medium text-accent hover:text-accent/80 h-auto py-1 px-2"
                      >
                        {expandedCards[selectedCase] ? 'Less' : 'More'}
                      </Button>
                    </div>
                    {expandedCards[selectedCase] && (
                      <p className="text-sm font-bold text-muted-foreground tracking-wider uppercase mt-2">
                        {caseStudies[selectedCase].industry}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl bg-${caseStudies[selectedCase].color}/10 border border-${caseStudies[selectedCase].color}/30`}>
                    {(() => {
                      const Icon = caseStudies[selectedCase].icon
                      return <Icon size={28} className={`text-${caseStudies[selectedCase].color}`} weight="bold" />
                    })()}
                  </div>
                </div>
                
                {expandedCards[selectedCase] && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {caseStudies[selectedCase].services.map((service) => (
                      <div
                        key={service}
                        className={`px-3 py-1.5 rounded-lg bg-${caseStudies[selectedCase].color}/10 border border-${caseStudies[selectedCase].color}/30 text-xs font-medium`}
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center`}>
                    <span className="text-destructive text-lg font-bold">!</span>
                  </div>
                  <h3 className="text-lg font-bold">Challenge</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                  {caseStudies[selectedCase].challenge}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center`}>
                    <CheckCircle size={18} className="text-success" weight="fill" />
                  </div>
                  <h3 className="text-lg font-bold">Solution</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-10">
                  {caseStudies[selectedCase].solution}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendUp size={20} className={`text-${caseStudies[selectedCase].color}`} weight="bold" />
                Measurable Results
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies[selectedCase].results.map((result, idx) => (
                  <motion.div
                    key={result.metric}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-5 rounded-xl bg-gradient-to-br from-${caseStudies[selectedCase].color}/10 to-transparent border border-${caseStudies[selectedCase].color}/30 hover:shadow-lg hover:shadow-${caseStudies[selectedCase].color}/20 transition-all duration-300`}
                  >
                    <div className={`text-3xl md:text-4xl font-bold text-${caseStudies[selectedCase].color} mb-2`}>
                      {result.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {result.metric}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {result.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            <div className={`p-6 rounded-2xl bg-gradient-to-br from-${caseStudies[selectedCase].color}/10 via-${caseStudies[selectedCase].color}/5 to-transparent border-2 border-${caseStudies[selectedCase].color}/30 relative`}>
              <Quotes size={48} className={`absolute top-4 right-4 text-${caseStudies[selectedCase].color}/20`} weight="fill" />
              <div className="relative z-10">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 italic">
                  "{caseStudies[selectedCase].testimonial}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${caseStudies[selectedCase].color}/30 to-${caseStudies[selectedCase].color}/10 border-2 border-${caseStudies[selectedCase].color}/40 flex items-center justify-center text-2xl`}>
                    {caseStudies[selectedCase].avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{caseStudies[selectedCase].author}</div>
                    <div className="text-sm text-muted-foreground">{caseStudies[selectedCase].role}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl bg-accent/5 border border-accent/20`}>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-accent mt-0.5" weight="fill" />
                <div className="flex-1">
                  <h4 className="font-bold mb-2 text-sm">Enterprise Endpoint Validation Framework Benefits</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This institution achieved complete operational transparency through VIFIQ's enterprise endpoint validation infrastructure. 
                    Real-time verification protocols, automated compliance enforcement mechanisms, and immutable audit capture eliminated manual validation processes 
                    while maintaining absolute regulatory alignment and institutional oversight.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Average Compliance Score', value: '99.8%', subtext: 'Across all partners' },
          { label: 'Audit Findings', value: '0.2 avg', subtext: 'Per annual audit' },
          { label: 'Deployment Time', value: '67% faster', subtext: 'Than manual processes' },
          { label: 'Cost Reduction', value: '58% avg', subtext: 'Operational overhead' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.subtext}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30"
      >
        <Shield size={40} className="text-accent mx-auto mb-4" weight="bold" />
        <h3 className="text-2xl font-bold mb-3">Transform Your Institutional Compliance Framework</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join these institutional leaders in implementing comprehensive endpoint validation with immutable audit transparency and regulatory perfection
        </p>
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300"
        >
          <Shield className="mr-2" size={20} weight="bold" />
          Request Enterprise Case Study Consultation
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </motion.div>
    </div>
  )
}
