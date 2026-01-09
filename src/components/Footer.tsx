import { Link } from 'react-router-dom'
import { ArrowRight, Check, FileText, ShieldCheck, CurrencyCircleDollar, Scales, IdentificationCard, FileCode } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useKV } from '@github/spark/hooks'

export function Footer() {
  const [analytics, setAnalytics] = useKV<Record<string, number>>('policy-link-analytics', {})
  return (
    <footer className="relative bg-[oklch(0.08_0.015_250)] border-t border-[oklch(0.18_0.02_250)] overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.15_0.03_250),transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 py-16">
        
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 mb-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">VIFIQ</h2>
              <p className="text-base text-white/70 max-w-lg leading-relaxed">
                Governance-first access orchestration for identity validation, entitlement issuance, and audit-ready operations.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['SOC 2 Type II', 'GDPR Aligned', 'PCI DSS', '256-bit Encryption'].map((badge) => (
                <div
                  key={badge}
                  className="px-4 py-1.5 rounded-full bg-[oklch(0.12_0.02_250)] border border-[oklch(0.20_0.02_250)] text-xs font-medium text-white/60"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[oklch(0.12_0.02_250)] backdrop-blur-sm border border-[oklch(0.20_0.02_250)] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-semibold text-white">All Systems Operational</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/60 text-xs mb-1">Uptime Target</div>
                <div className="text-white font-mono">99.9%</div>
              </div>
              <div>
                <div className="text-white/60 text-xs mb-1">Audit Trail</div>
                <div className="text-white font-mono">Enabled</div>
              </div>
              <div className="col-span-2">
                <div className="text-white/60 text-xs mb-1">Release</div>
                <div className="text-white font-mono">v2.1.0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">CONTROL LAYER ARCHITECTURE</h3>
            <p className="text-sm text-white/70 max-w-3xl mx-auto">
              One-directional enforcement flow. Every decision is explicit, time-bound, and logged.
            </p>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: 'Access Intent',
                  items: ['Declared use case', 'State: DRAFT → SUBMITTED'],
                },
                {
                  title: 'Validation',
                  items: ['Identity checks', 'Policy enforcement', 'State: UNDER_REVIEW → VERIFIED'],
                },
                {
                  title: 'Entitlements',
                  items: ['Scope + Limits', 'TTL', 'State: ISSUED → EXPIRES / REVOKED'],
                },
                {
                  title: 'Module Dispatch',
                  items: ['Registry-based', 'Metered', 'Policy-guarded'],
                },
              ].map((stage, idx) => (
                <div key={stage.title} className="relative">
                  <div className="bg-[oklch(0.12_0.02_250)] backdrop-blur-sm border border-[oklch(0.20_0.02_250)] rounded-xl p-5 h-full space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-white">{stage.title}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {stage.items.map((item) => (
                        <li key={item} className="text-xs text-white/60 font-mono leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight weight="bold" className="text-white w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[oklch(0.12_0.02_250)] backdrop-blur-sm border border-white/30 rounded-xl p-5 max-w-xs mx-auto">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Check weight="bold" className="w-4 h-4" />
                Audit Subsystem
              </h4>
              <p className="text-xs text-white/60 font-mono">
                Immutable events logged on every state change
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              title: 'State Machine',
              items: ['DRAFT → SUBMITTED', '→ UNDER_REVIEW', '→ APPROVED / REJECTED', '→ REVOKED'],
            },
            {
              title: 'Validation Types',
              items: ['Identity', 'Compliance', 'Manual review', 'Automated checks'],
            },
            {
              title: 'Entitlement Rules',
              items: ['Time-bound', 'Revocable', 'Scoped', 'Metered'],
            },
            {
              title: 'Audit & Observability',
              items: ['Every state emits immutable events', 'Actor + evidence reference'],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-[oklch(0.12_0.02_250)] backdrop-blur-sm border border-[oklch(0.20_0.02_250)] rounded-xl p-5 space-y-3"
            >
              <h4 className="text-sm font-bold text-white">{card.title}</h4>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="text-xs text-white/60 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-white mt-1.5 flex-shrink-0" />
                    <span className="font-mono">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2.5">
              {['Module Marketplace', 'Validation Process', 'Entitlements & Limits', 'Audit Logs', 'API Documentation', 'Status Page'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-white/70 hover:text-white transition-colors font-mono"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">Architecture</h4>
            <ul className="space-y-2.5">
              {['Access Request Domain', 'Validation Domain', 'Entitlement Domain', 'Module Registry', 'Event Ledger', 'Telemetry & Metrics'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-white/70 hover:text-white transition-colors font-mono"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">Security</h4>
            <ul className="space-y-2.5">
              {['Security Overview', 'Encryption & Key Handling', 'Incident Response', 'Vulnerability Disclosure', 'Access Policies', 'Risk Controls'].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-white/70 hover:text-white transition-colors font-mono"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">Payments</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  'VISA',
                  'MASTERCARD',
                  'AMERICAN EXPRESS',
                  'SKRILL',
                ].map((payment) => (
                  <div
                    key={payment}
                    className="bg-[oklch(0.12_0.02_250)] border border-[oklch(0.20_0.02_250)] rounded-lg px-3 py-2 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-black text-white tracking-[0.12em] uppercase">
                      {payment}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {['NETELLER', 'CRYPTO', 'WIRE TRANSFER', 'E-WALLET'].map((method) => (
                  <div
                    key={method}
                    className="bg-[oklch(0.12_0.02_250)] border border-[oklch(0.20_0.02_250)] rounded-lg px-3 py-2 flex items-center justify-center"
                  >
                    <span className="text-xs font-black text-white/60 tracking-[0.10em] uppercase">
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[oklch(0.12_0.02_250)] backdrop-blur-sm border border-white/30 rounded-2xl p-8 mb-16 space-y-4">
          <h4 className="text-base font-bold text-white uppercase tracking-wide">Compliance-First Disclaimer</h4>
          <TooltipProvider>
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { label: 'Terms', icon: FileText, route: '/policy/terms', tooltip: 'Service agreement and access control terms' },
                { label: 'Privacy', icon: ShieldCheck, route: '/policy/privacy', tooltip: 'Data collection, usage, and protection policy' },
                { label: 'Refund Policy', icon: CurrencyCircleDollar, route: '/policy/refund', tooltip: 'Refund eligibility and processing terms' },
                { label: 'Acceptable Use', icon: Scales, route: '/policy/acceptable-use', tooltip: 'Permitted activities and usage guidelines' },
                { label: 'KYC/KYB Policy', icon: IdentificationCard, route: '/policy/kyc', tooltip: 'Identity verification requirements and procedures' },
                { label: 'Data Processing Addendum', icon: FileCode, route: '/policy/dpa', tooltip: 'GDPR-compliant data processing terms' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.route}
                        onClick={() => {
                          setAnalytics((current = {}) => ({
                            ...current,
                            [item.label]: (current[item.label] || 0) + 1,
                          }))
                        }}
                        className="group relative text-xs text-[oklch(0.75_0.18_195)] hover:text-white transition-all duration-300 underline underline-offset-4 decoration-[oklch(0.75_0.18_195)]/50 hover:decoration-white font-mono flex items-center gap-1.5 hover:gap-2 hover:translate-y-[-2px]"
                      >
                        <Icon weight="bold" className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative">
                          {item.label}
                          <span className="absolute inset-0 bg-[oklch(0.75_0.18_195)]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-[oklch(0.15_0.02_250)] border-[oklch(0.25_0.03_250)] text-white max-w-xs">
                      <p className="text-xs">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[oklch(0.18_0.02_250)]">
          <div className="text-sm text-white/70 font-mono space-y-1 text-center md:text-left">
            <div>© 2019-2026 VIFIQ ACCOUNTS. All rights reserved.</div>
            <div className="text-xs">Version 2.1.0 • Control Layer: Enabled</div>
          </div>

          <div className="flex gap-4">
            {[
              { name: 'X', icon: '𝕏', href: '#' },
              { name: 'Telegram', icon: '✈', href: 'https://t.me/StampOut' },
              { name: 'LinkedIn', icon: 'in', href: '#' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href !== '#' ? '_blank' : undefined}
                rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-lg bg-[oklch(0.12_0.02_250)] border border-[oklch(0.20_0.02_250)] hover:border-white/50 transition-colors flex items-center justify-center text-white/70 hover:text-white text-sm font-bold"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
