import { useState, useEffect } from 'react'
import { Bank, CreditCard, TrendUp, ChartLine, Storefront, CurrencyCircleDollar, Globe, SimCard, DeviceMobile, ShareNetwork, LockKey } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ServiceCard } from '@/components/ServiceCard'

type ServiceDomain = {
  id: string
  domain: string
  title: string
  description: string
  icon: React.ComponentType<any>
  services: string[]
  color: string
  whatsappNumber: string
  hoverColor: string
  hoverBorderColor: string
  hoverShadowColor: string
  hoverDuration: number
  additionalDetails?: {
    pricing: string
    deliveryTime: string
    features: string[]
  }
  stats?: {
    activeUsers?: number
    completedOrders?: number
    avgDeliveryHours?: number
  }
}

const serviceDomains: ServiceDomain[] = [
  {
    id: 'numsync',
    domain: 'NUMSYNC.VIFIQ.COM',
    title: 'Numsync',
    description: 'VIRTUAL SIM Access - Global virtual number infrastructure for verification and business communications.',
    icon: SimCard,
    color: 'from-emerald-500/30 to-teal-500/10',
    whatsappNumber: '+447700000001',
    hoverColor: 'oklch(0.16 0.08 165)',
    hoverBorderColor: 'oklch(0.70 0.24 165 / 0.65)',
    hoverShadowColor: 'oklch(0.70 0.24 165 / 0.45)',
    hoverDuration: 0.25,
    services: [
      'Virtual Number - US',
      'Virtual Number - UK',
      'Virtual Number - EU',
      'Global Number Bundle',
      'Business Number Suite',
      'API Access Plan'
    ],
    additionalDetails: {
      pricing: 'From $12/month',
      deliveryTime: 'Instant',
      features: [
        'Global number coverage',
        'SMS & call verification',
        'API integration available',
        'Real-time forwarding',
        '24/7 technical support'
      ]
    },
    stats: {
      activeUsers: 3420,
      completedOrders: 8750,
      avgDeliveryHours: 0
    }
  },
  {
    id: 'syncplayer',
    domain: 'SYNCPLAYER.VIFIQ.COM',
    title: 'Syncplayer',
    description: 'Emulator Environment - Advanced device emulation infrastructure for testing and development.',
    icon: DeviceMobile,
    color: 'from-blue-500/30 to-indigo-500/10',
    whatsappNumber: '+447700000002',
    hoverColor: 'oklch(0.16 0.08 250)',
    hoverBorderColor: 'oklch(0.65 0.26 250 / 0.65)',
    hoverShadowColor: 'oklch(0.65 0.26 250 / 0.45)',
    hoverDuration: 0.3,
    services: [
      'Android Emulator - Standard',
      'iOS Emulator - Standard',
      'Multi-Device Bundle',
      'Enterprise Emulator Suite',
      'CI/CD Integration',
      'Custom Environment Setup'
    ],
    additionalDetails: {
      pricing: 'From $45/month',
      deliveryTime: 'Instant',
      features: [
        'Android & iOS emulation',
        'Multiple OS versions',
        'Cloud-based infrastructure',
        'CI/CD integration',
        'Advanced debugging tools'
      ]
    },
    stats: {
      activeUsers: 2150,
      completedOrders: 5820,
      avgDeliveryHours: 1
    }
  },
  {
    id: 'sync-ip',
    domain: 'SYNC-IP.VIFIQ.COM',
    title: 'Sync-IP',
    description: 'Proxy & VPN Access - Secure network infrastructure for privacy and geo-routing.',
    icon: ShareNetwork,
    color: 'from-amber-500/30 to-yellow-500/10',
    whatsappNumber: '+447700000003',
    hoverColor: 'oklch(0.16 0.08 75)',
    hoverBorderColor: 'oklch(0.82 0.22 75 / 0.65)',
    hoverShadowColor: 'oklch(0.82 0.22 75 / 0.45)',
    hoverDuration: 0.35,
    services: [
      'Residential Proxy - US',
      'Residential Proxy - EU',
      'Datacenter Proxy Pool',
      'VPN Service - Global',
      'Enterprise Proxy Suite',
      'Custom IP Solution'
    ],
    additionalDetails: {
      pricing: 'From $45/month',
      deliveryTime: 'Instant',
      features: [
        'Residential & datacenter IPs',
        '150+ country coverage',
        'Military-grade encryption',
        'Unlimited bandwidth',
        '99.9% uptime guarantee'
      ]
    },
    stats: {
      activeUsers: 4680,
      completedOrders: 12400,
      avgDeliveryHours: 0
    }
  },
  {
    id: 'trading',
    domain: 'TRADING.VIFIQ.COM',
    title: 'Trading Infrastructure',
    description: 'Professional trading infrastructure for Forex, CFD, and Stock platforms.',
    icon: ChartLine,
    color: 'from-purple-500/30 to-violet-500/10',
    whatsappNumber: '+447700000004',
    hoverColor: 'oklch(0.16 0.08 285)',
    hoverBorderColor: 'oklch(0.68 0.28 285 / 0.65)',
    hoverShadowColor: 'oklch(0.68 0.28 285 / 0.45)',
    hoverDuration: 0.28,
    services: [
      'Plus500 account',
      'eToro verified',
      'Forex broker account',
      'CFD trading account',
      'IBKR verified',
      'Trading platform access'
    ],
    additionalDetails: {
      pricing: 'From $350/account',
      deliveryTime: '3-7 business days',
      features: [
        'Institutional trading conditions',
        'Advanced charting tools',
        'High leverage options',
        'Direct market access',
        'Priority support'
      ]
    },
    stats: {
      activeUsers: 1850,
      completedOrders: 3920,
      avgDeliveryHours: 96
    }
  },
  {
    id: 'business',
    domain: 'BUSINESS.VIFIQ.COM',
    title: 'Business Solutions',
    description: 'Corporate banking solutions, LTDs, LLCs, and merchant accounts ready for immediate use.',
    icon: Storefront,
    color: 'from-cyan-500/30 to-sky-500/10',
    whatsappNumber: '+447700000005',
    hoverColor: 'oklch(0.16 0.08 205)',
    hoverBorderColor: 'oklch(0.75 0.22 205 / 0.65)',
    hoverShadowColor: 'oklch(0.75 0.22 205 / 0.45)',
    hoverDuration: 0.32,
    services: [
      'UK Business Bank',
      'Stripe-ready account',
      'PayPal Business',
      'Merchant account',
      'UK LTD company',
      'Payment gateway'
    ],
    additionalDetails: {
      pricing: 'From $380/setup',
      deliveryTime: '7-14 business days',
      features: [
        'Company formation',
        'Corporate banking',
        'Payment processor integration',
        'Merchant account setup',
        'Expert compliance guidance'
      ]
    },
    stats: {
      activeUsers: 980,
      completedOrders: 2340,
      avgDeliveryHours: 240
    }
  },
  {
    id: 'crypto',
    domain: 'CRYPTO.VIFIQ.COM',
    title: 'Crypto Access',
    description: 'Secure entry points for Web3, exchanges, and non-custodial wallets.',
    icon: CurrencyCircleDollar,
    color: 'from-orange-500/30 to-red-500/10',
    whatsappNumber: '+447700000006',
    hoverColor: 'oklch(0.16 0.08 40)',
    hoverBorderColor: 'oklch(0.78 0.24 40 / 0.65)',
    hoverShadowColor: 'oklch(0.78 0.24 40 / 0.45)',
    hoverDuration: 0.27,
    services: [
      'Binance verified',
      'Bybit account',
      'Kraken account',
      'Crypto wallet',
      'Exchange account',
      'Web3 wallet'
    ],
    additionalDetails: {
      pricing: 'From $280/account',
      deliveryTime: '3-7 business days',
      features: [
        'Verified exchange accounts',
        'Secure wallet configuration',
        'High trading limits',
        'Advanced trading features',
        'Dedicated crypto support'
      ]
    },
    stats: {
      activeUsers: 5240,
      completedOrders: 14850,
      avgDeliveryHours: 120
    }
  },
  {
    id: 'security',
    domain: 'SECURITY.VIFIQ.COM',
    title: 'Security',
    description: 'SECURITY - Enterprise security infrastructure, compliance, and identity verification services.',
    icon: LockKey,
    color: 'from-red-500/30 to-rose-500/10',
    whatsappNumber: '+447700000008',
    hoverColor: 'oklch(0.16 0.08 18)',
    hoverBorderColor: 'oklch(0.65 0.28 18 / 0.65)',
    hoverShadowColor: 'oklch(0.65 0.28 18 / 0.45)',
    hoverDuration: 0.26,
    services: [
      'Identity Verification Suite',
      'Fraud Prevention System',
      'Compliance Audit Package',
      'Security Assessment',
      'Multi-Factor Auth Setup',
      'Enterprise Security Suite'
    ],
    additionalDetails: {
      pricing: 'From $180/service',
      deliveryTime: '24 hours - 14 days',
      features: [
        'KYC/AML verification',
        'Fraud detection systems',
        'Compliance documentation',
        'Security infrastructure',
        '24/7 security monitoring'
      ]
    },
    stats: {
      activeUsers: 1250,
      completedOrders: 4180,
      avgDeliveryHours: 168
    }
  },
  {
    id: 'regions',
    domain: 'REGIONS.VIFIQ.COM',
    title: 'Regional Banking',
    description: 'Geographically specific banking solutions for the UK, EEA, and international markets.',
    icon: Globe,
    color: 'from-pink-500/30 to-fuchsia-500/10',
    whatsappNumber: '+447700000007',
    hoverColor: 'oklch(0.16 0.08 325)',
    hoverBorderColor: 'oklch(0.75 0.26 325 / 0.65)',
    hoverShadowColor: 'oklch(0.75 0.26 325 / 0.45)',
    hoverDuration: 0.29,
    services: [
      'UK banking services',
      'European fintech',
      'EEA digital banks',
      'Asian banking access',
      'Offshore accounts',
      'Cross-border payments'
    ],
    additionalDetails: {
      pricing: 'From $450/account',
      deliveryTime: '5-21 business days',
      features: [
        'Region-specific solutions',
        'Regulatory compliance',
        'Local banking infrastructure',
        'Cross-border capabilities',
        'Expert regional advisors'
      ]
    },
    stats: {
      activeUsers: 2890,
      completedOrders: 6430,
      avgDeliveryHours: 192
    }
  }
]

export function ServiceTemplate() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleContactWhatsApp = (whatsappNumber: string, title: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in ${title} services`)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
    
    toast.success('Opening WhatsApp', {
      description: 'Redirecting to WhatsApp chat...'
    })
  }

  const handleViewDetails = (id: string, currentDomain: string) => {
    navigate(`/service/${id}`, { state: { prevDomain: currentDomain } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceDomains.map((domain, index) => (
          <ServiceCard
            key={domain.domain}
            domain={domain.domain}
            title={domain.title}
            description={domain.description}
            icon={domain.icon}
            services={domain.services}
            color={domain.color}
            whatsappNumber={domain.whatsappNumber}
            hoverColor={domain.hoverColor}
            hoverBorderColor={domain.hoverBorderColor}
            hoverShadowColor={domain.hoverShadowColor}
            hoverDuration={domain.hoverDuration}
            onViewDetails={handleViewDetails}
            onContactWhatsApp={handleContactWhatsApp}
            isLoading={isLoading}
            delay={index * 0.1}
            additionalDetails={domain.additionalDetails}
            stats={domain.stats}
          />
        ))}
      </div>
    </motion.div>
  )
}
