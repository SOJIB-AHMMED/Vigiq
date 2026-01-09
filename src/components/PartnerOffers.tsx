import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'

interface PartnerLanding {
  kicker: string
  title: string
  subtitle: string
  bullets: string[]
  ctaLabel: string
}

interface Partner {
  slug: string
  name: string
  topTag: string
  gridDesc: string
  landing: PartnerLanding
}

const PARTNERS: Partner[] = [
  {
    slug: "gocardless",
    name: "GoCardless",
    topTag: "Online Payment Processing Solution",
    gridDesc: "Receive a rebate on transaction fees of up to £75",
    landing: {
      kicker: "Payments Infrastructure",
      title: "GoCardless — Direct Debit at scale",
      subtitle: "Automate recurring payments with bank-to-bank collection, reduce churn, and tighten cashflow forecasting.",
      bullets: [
        "Subscription and invoice collection workflows",
        "Failed payment recovery and retry logic",
        "Multi-region payout and reconciliation support",
        "Operational visibility for finance teams"
      ],
      ctaLabel: "Explore GoCardless"
    }
  },
  {
    slug: "payoneer",
    name: "Payoneer",
    topTag: "Payoneer for Global Businesses",
    gridDesc: "Pay and Get Paid with Payoneer — a Fast, Low-Cost Solution for Your International Business",
    landing: {
      kicker: "Cross-border",
      title: "Payoneer — Global pay-ins and pay-outs",
      subtitle: "Centralize international collections and vendor payouts with a unified treasury view.",
      bullets: [
        "Multi-currency receiving accounts",
        "Mass payouts and supplier payments",
        "Marketplace and platform-friendly flows",
        "Streamlined expense and settlement operations"
      ],
      ctaLabel: "Explore Payoneer"
    }
  },
  {
    slug: "wallester",
    name: "Wallester",
    topTag: "White-label card issuer and co-brand payment.",
    gridDesc: "White-label VISA card issuing company with global payment gateway and processing",
    landing: {
      kicker: "Card Issuing",
      title: "Wallester — White-label card programs",
      subtitle: "Launch branded card products with programmatic controls, spend policies, and reporting.",
      bullets: [
        "Virtual and physical card issuance",
        "Programmatic spend limits and controls",
        "Co-brand and white-label enablement",
        "Compliance-ready reporting capabilities"
      ],
      ctaLabel: "Explore Wallester"
    }
  },
  {
    slug: "unbiased",
    name: "Unbiased",
    topTag: "Connecting clients to great advice",
    gridDesc: "Discover the freedom, empowerment, and peace of mind that comes with taking control of your finances.",
    landing: {
      kicker: "Advisory Access",
      title: "Unbiased — Find financial expertise",
      subtitle: "Match users to regulated advisers and specialists, optimized for decision confidence.",
      bullets: [
        "Advisor discovery and matching",
        "Support across key financial needs",
        "User-friendly intake and routing",
        "Lead-quality oriented journeys"
      ],
      ctaLabel: "Explore Unbiased"
    }
  },
  {
    slug: "worldpay",
    name: "worldpay",
    topTag: "Transform Your Business with Worldpay's Innovative Payment Solutions",
    gridDesc: "Experience the future of payments with Worldpay.",
    landing: {
      kicker: "Payments Acceptance",
      title: "Worldpay — Payment processing for growth",
      subtitle: "Scale acceptance across channels with robust risk controls and settlement operations.",
      bullets: [
        "Omnichannel payment acceptance",
        "Risk tooling and fraud mitigation",
        "Settlement and reconciliation workflows",
        "Enterprise-grade uptime posture"
      ],
      ctaLabel: "Explore Worldpay"
    }
  },
  {
    slug: "square",
    name: "Square",
    topTag: "Streamline Your Business with Square's Comprehensive Payment Solutions",
    gridDesc: "Empower your business with Square's cutting-edge payment solutions designed to simplify transactions",
    landing: {
      kicker: "Commerce Toolkit",
      title: "Square — Point-of-sale to online payments",
      subtitle: "Unify POS, invoicing, and online checkout while maintaining clean operational reporting.",
      bullets: [
        "POS + online checkout ecosystem",
        "Invoices, links, and subscriptions",
        "Inventory and staff tooling",
        "Analytics and reporting for operators"
      ],
      ctaLabel: "Explore Square"
    }
  },
  {
    slug: "365-financial-analyst",
    name: "365 Financial Analyst",
    topTag: "Finance Courses to Boost Your Career.",
    gridDesc: "The ultimate finance certification platform to enhance your career.",
    landing: {
      kicker: "Learning Platform",
      title: "365 Financial Analyst — Upskill fast",
      subtitle: "Structured finance learning paths for analysts, operators, and founders who need real capability.",
      bullets: [
        "Career-focused certification tracks",
        "Practical finance fundamentals and modeling",
        "Self-paced, structured curricula",
        "Progress measurement and outcomes"
      ],
      ctaLabel: "Explore 365FA"
    }
  },
  {
    slug: "revolut-business",
    name: "Revolut Business",
    topTag: "Open a Business Account Online",
    gridDesc: "Open a Revolut Business account online in minutes. A business account made for fast domestic and international money transfers.",
    landing: {
      kicker: "Business Banking",
      title: "Revolut Business — Modern business account",
      subtitle: "Operate cross-border with multi-currency rails, team cards, and controllable spend policies.",
      bullets: [
        "Multi-currency accounts and transfers",
        "Team access controls and roles",
        "Expense management and cards",
        "Operational reporting and exports"
      ],
      ctaLabel: "Explore Revolut Business"
    }
  },
  {
    slug: "wise",
    name: "WISE",
    topTag: "Unleash Your Potential with Wise: The Smart Way to Save and Spend",
    gridDesc: "Wise is the ultimate solution for those who want to take control of their finances effortlessly.",
    landing: {
      kicker: "FX + Transfers",
      title: "Wise — Global money movement",
      subtitle: "Reduce FX friction with transparent fees and multi-currency operations.",
      bullets: [
        "Multi-currency account operations",
        "Low-friction international transfers",
        "FX transparency and cost control",
        "Business-ready settlement capability"
      ],
      ctaLabel: "Explore Wise"
    }
  },
  {
    slug: "suits-me",
    name: "suits me.",
    topTag: "Your Card, Your Rewards — Suits Me® Makes Banking Effortless",
    gridDesc: "With a Suits Me® account, you can enjoy stress-free banking tailored to your needs.",
    landing: {
      kicker: "Everyday Banking",
      title: "Suits Me — Simple banking experience",
      subtitle: "A straightforward account experience with predictable access and day-to-day usability.",
      bullets: [
        "Easy account access and usability",
        "Card-based spend operations",
        "Transparent usage experience",
        "Customer-first onboarding flows"
      ],
      ctaLabel: "Explore Suits Me"
    }
  },
  {
    slug: "wirex",
    name: "wirex",
    topTag: "web3 money app",
    gridDesc: "Get up to 15% on your EURS",
    landing: {
      kicker: "Web3 Finance",
      title: "Wirex — Web3 money operations",
      subtitle: "Bridge card spend and digital assets with user-friendly rails and rewards mechanics.",
      bullets: [
        "Card + digital asset utility",
        "Rewards and benefit structures",
        "Multi-currency spend posture",
        "App-first user journeys"
      ],
      ctaLabel: "Explore Wirex"
    }
  },
  {
    slug: "airwallex",
    name: "Airwallex",
    topTag: "Your business account for global success",
    gridDesc: "Earn 10% cashback on your first $1,000 of international transactions with Airwallex*",
    landing: {
      kicker: "Global Treasury",
      title: "Airwallex — Global business account stack",
      subtitle: "Run multi-currency accounts, issue cards, and pay internationally with a consolidated ops layer.",
      bullets: [
        "Multi-currency accounts and payouts",
        "Card issuing and spend controls",
        "FX and international settlement",
        "Platform-friendly architecture"
      ],
      ctaLabel: "Explore Airwallex"
    }
  },
  {
    slug: "ampere",
    name: "AMPERE",
    topTag: "",
    gridDesc: "",
    landing: {
      kicker: "Partner",
      title: "Ampere — Dedicated landing page",
      subtitle: "This is a unique landing page stub you can expand with your exact offer details.",
      bullets: [
        "Replace this with Ampere's value proposition",
        "Add eligibility, pricing, and timelines",
        "Add CTAs and integration notes",
        "Add compliance and support boundaries"
      ],
      ctaLabel: "Explore Ampere"
    }
  },
  {
    slug: "funding-circle",
    name: "Funding Circle",
    topTag: "Funding Circle — Fast, Flexible Finance for Growing UK Businesses",
    gridDesc: "",
    landing: {
      kicker: "Business Finance",
      title: "Funding Circle — Fast access to funding",
      subtitle: "Support working capital needs with structured finance options and clear underwriting requirements.",
      bullets: [
        "Funding for growth and cashflow",
        "Clear qualification pathways",
        "Structured repayment logic",
        "UK business focus positioning"
      ],
      ctaLabel: "Explore Funding Circle"
    }
  },
  {
    slug: "iwoca",
    name: "iwoca",
    topTag: "Get fast, flexible funding on your terms",
    gridDesc: "",
    landing: {
      kicker: "SME Funding",
      title: "iwoca — Flexible finance",
      subtitle: "Shorter-cycle funding options designed around operational realities and repayment flexibility.",
      bullets: [
        "Flexible credit structures",
        "Fast decisions and disbursement paths",
        "Designed for SMEs and operators",
        "Clear terms and repayment options"
      ],
      ctaLabel: "Explore iwoca"
    }
  },
  {
    slug: "worldfirst",
    name: "WORLDFIRST",
    topTag: "International business payments made easy",
    gridDesc: "",
    landing: {
      kicker: "International Payments",
      title: "WorldFirst — Business payments, simplified",
      subtitle: "International collections and payments with an operational lens on cost, FX, and speed.",
      bullets: [
        "Cross-border payments and collections",
        "FX management and cost control",
        "Business-friendly workflows",
        "Reporting for operators"
      ],
      ctaLabel: "Explore WorldFirst"
    }
  }
]

interface PartnerCardProps {
  partner: Partner
  onClick: () => void
  index: number
}

function PartnerCard({ partner, onClick, index }: PartnerCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="h-36 bg-gradient-to-br from-muted/30 to-muted/10 flex flex-col items-center justify-center gap-2 p-4 text-center border-b border-border">
        <div className="flex items-center justify-center h-11">
          <div className="text-xl font-black tracking-tight text-foreground">
            {partner.name}
          </div>
        </div>
        {partner.topTag && (
          <div className="text-[0.6875rem] text-muted-foreground font-semibold line-clamp-2 max-w-[220px]">
            {partner.topTag}
          </div>
        )}
      </div>
      
      <div className="min-h-[96px] bg-muted/20 flex items-center justify-center p-4 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 max-w-[230px]">
          {partner.gridDesc || partner.landing.subtitle}
        </p>
      </div>
    </motion.button>
  )
}

interface PartnerLandingViewProps {
  partner: Partner
  onBack: () => void
}

function PartnerLandingView({ partner, onBack }: PartnerLandingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="border border-border rounded-3xl overflow-hidden bg-card shadow-xl"
    >
      <div className="p-6 md:p-8 border-b border-border bg-gradient-to-br from-muted/20 to-muted/5 flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-[0.6875rem] font-bold text-muted-foreground tracking-widest mb-2">
            {partner.landing.kicker}
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight">
            {partner.landing.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {partner.landing.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full border border-border bg-background hover:bg-muted/50 text-xs font-bold transition-all duration-200 hover:shadow-md flex items-center gap-2"
          >
            <ArrowLeft size={14} weight="bold" />
            Back
          </button>
          <button className="px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-bold transition-all duration-200 hover:shadow-md">
            {partner.landing.ctaLabel}
          </button>
        </div>
      </div>
      
      <div className="p-6 grid md:grid-cols-[1.25fr_0.75fr] gap-4">
        <div className="border border-border rounded-2xl overflow-hidden bg-background">
          <div className="px-4 py-3 border-b border-border bg-muted/20 text-sm font-black tracking-tight">
            Overview
          </div>
          <div className="p-4 text-sm text-muted-foreground leading-relaxed">
            <ul className="list-disc pl-4 space-y-2">
              {partner.landing.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground/80 italic">
              Partner infrastructure provider. Terms, eligibility, and pricing apply. Subject to validation workflows.
            </div>
          </div>
        </div>
        
        <div className="border border-border rounded-2xl overflow-hidden bg-background">
          <div className="px-4 py-3 border-b border-border bg-muted/20 text-sm font-black tracking-tight">
            Partner Details
          </div>
          <div className="p-4 text-sm text-muted-foreground leading-relaxed space-y-3">
            <div>
              <div className="font-bold text-foreground text-xs mb-1">Provider</div>
              <div className="text-xs">{partner.name}</div>
            </div>
            <div>
              <div className="font-bold text-foreground text-xs mb-1">Category</div>
              <div className="text-xs">{partner.landing.kicker}</div>
            </div>
            <div>
              <div className="font-bold text-foreground text-xs mb-1">Status</div>
              <div className="text-xs">Available via VIFIQ validation</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PartnerOffers() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  useEffect(() => {
    if (selectedPartner) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedPartner])

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedPartner ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PARTNERS.map((partner, i) => (
                <PartnerCard
                  key={partner.slug}
                  partner={partner}
                  onClick={() => setSelectedPartner(partner)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <PartnerLandingView
            key="landing"
            partner={selectedPartner}
            onBack={() => setSelectedPartner(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
