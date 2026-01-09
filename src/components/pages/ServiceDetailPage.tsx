import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bank, CreditCard, TrendUp, ChartLine, Storefront, CurrencyCircleDollar, Globe, ArrowLeft, ArrowRight, WhatsappLogo, Phone, EnvelopeSimple, CheckCircle, Clock, Shield, Star, Quotes, SimCard, DeviceMobile, ShareNetwork, LockKey, Buildings, ChatCircleDots } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { ServiceNavigationHeader } from '@/components/ServiceNavigationHeader'
import { ServiceDetailSkeleton } from '@/components/ServiceDetailSkeleton'
import { LoadingProgress } from '@/components/LoadingProgress'
import { ChatBot } from '@/components/ChatBot'

type ServiceDomain = {
  domain: string
  title: string
  description: string
  fullDescription: string
  icon: Icon
  services: { name: string; description: string; price?: string; deliveryTime?: string }[]
  color: string
  whatsappNumber: string
  email: string
  features: string[]
  benefits: string[]
}

const serviceDomains: Record<string, ServiceDomain> = {
  'virtual-banks': {
    domain: 'VIRTUAL-BANKS.VIFIQ.COM',
    title: 'Virtual Banking',
    description: 'Digital banking infrastructure with full compliance and multi-currency support.',
    fullDescription: 'Access premium virtual banking solutions from verified providers including Wise, Revolut, and N26. Complete multi-currency support, instant transfers, and business banking infrastructure for global operations.',
    icon: Bank,
    color: 'from-green-500/20 to-emerald-500/20',
    whatsappNumber: '+447700000010',
    email: 'banking@vifiq.com',
    features: [
      'Multi-currency account support',
      'Instant international transfers',
      'SEPA and SWIFT enabled',
      'Virtual and physical card issuance',
      'Business banking infrastructure',
      'Real-time exchange rates'
    ],
    benefits: [
      'Fast account activation',
      'Competitive FX rates',
      'No hidden fees',
      'Mobile-first banking',
      'Full regulatory compliance',
      'Dedicated account managers'
    ],
    services: [
      { 
        name: 'Wise Multi-Currency', 
        description: 'Multi-currency borderless account',
        price: '$280',
        deliveryTime: '24-48 hours'
      },
      { 
        name: 'Revolut Digital Bank', 
        description: 'Digital banking platform',
        price: '$320',
        deliveryTime: '24-48 hours'
      },
      { 
        name: 'N26 EU Banking', 
        description: 'European banking access',
        price: '$380',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Business Accounts', 
        description: 'Corporate banking solution',
        price: '$520',
        deliveryTime: '5-7 business days'
      }
    ]
  },
  'betting-accounts': {
    domain: 'BETTING.VIFIQ.COM',
    title: 'Betting Accounts',
    description: 'Governed access to regulated betting platforms with verified accounts.',
    fullDescription: 'Professional betting infrastructure with verified accounts on major platforms including Bet365, Betfair, and high-limit bookmakers. Access premium betting markets with institutional limits.',
    icon: ChartLine,
    color: 'from-red-500/20 to-orange-500/20',
    whatsappNumber: '+447700000011',
    email: 'betting@vifiq.com',
    features: [
      'Verified betting accounts',
      'High betting limits',
      'Exchange betting access',
      'Live in-play markets',
      'Multiple bookmaker access',
      'Professional trading tools'
    ],
    benefits: [
      'Skip verification delays',
      'Enhanced betting limits',
      'Premium market access',
      'Better odds and spreads',
      'Priority customer support',
      'Account management assistance'
    ],
    services: [
      { 
        name: 'Bet365 Verified', 
        description: 'Leading sports betting platform',
        price: '$420',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Betfair Exchange', 
        description: 'Peer-to-peer betting exchange',
        price: '$480',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'High-Limit Access', 
        description: 'Premium betting limits',
        price: '$680',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Multi-Bookmaker', 
        description: 'Multiple platform access',
        price: '$850',
        deliveryTime: '7-10 business days'
      }
    ]
  },
  'company-formation': {
    domain: 'COMPANY.VIFIQ.COM',
    title: 'Company Formation',
    description: 'Structured entity registration with jurisdiction selection and banking integration.',
    fullDescription: 'Complete company formation services across multiple jurisdictions including UK, USA, and EU. Full support for entity setup, director services, registered address, and banking-ready configurations.',
    icon: Buildings,
    color: 'from-blue-500/20 to-cyan-500/20',
    whatsappNumber: '+447700000012',
    email: 'company@vifiq.com',
    features: [
      'Multi-jurisdiction company formation',
      'Director and secretary services',
      'Registered office address',
      'Banking-ready setup',
      'Compliance documentation',
      'Ongoing corporate support'
    ],
    benefits: [
      'Fast company registration',
      'Expert jurisdiction advice',
      'Full legal compliance',
      'Bank account assistance',
      'Nominee services available',
      'Annual filing support'
    ],
    services: [
      { 
        name: 'UK LTD Setup', 
        description: 'UK limited company formation',
        price: '$450',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'USA LLC / C-Corp', 
        description: 'US entity formation',
        price: '$680',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'EU Entities', 
        description: 'European company formation',
        price: '$580',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Banking Ready', 
        description: 'Company with bank account',
        price: '$950',
        deliveryTime: '14-21 business days'
      }
    ]
  },
  numsync: {
    domain: 'NUMSYNC.VIFIQ.COM',
    title: 'Numsync',
    description: 'VIRTUAL SIM Access - Premier virtual number infrastructure for business and verification needs.',
    fullDescription: 'Numsync provides comprehensive virtual SIM access with global number coverage, instant provisioning, and enterprise-grade reliability. Access virtual numbers for verification, business communications, and multi-region operations with full control and monitoring.',
    icon: SimCard,
    color: 'from-emerald-500/20 to-emerald-500/5',
    whatsappNumber: '+447700000001',
    email: 'numsync@vifiq.com',
    features: [
      'Global virtual numbers in 100+ countries',
      'Instant SMS and call verification access',
      'Temporary and long-term number rentals',
      'API integration for automated provisioning',
      'Real-time message forwarding',
      'Multi-number management dashboard'
    ],
    benefits: [
      'Instant activation - seconds not hours',
      'Pay-per-use or subscription models',
      'No physical SIM cards required',
      'Complete privacy and anonymity',
      'Dedicated account management',
      '24/7 technical support'
    ],
    services: [
      { 
        name: 'Virtual Number - US', 
        description: 'US-based virtual phone number',
        price: '$15',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Virtual Number - UK', 
        description: 'UK virtual phone number',
        price: '$12',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Virtual Number - EU', 
        description: 'European virtual numbers',
        price: '$18',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Global Number Bundle', 
        description: 'Multi-region number package',
        price: '$120',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Business Number Suite', 
        description: 'Enterprise virtual number solution',
        price: '$380',
        deliveryTime: '24 hours'
      },
      { 
        name: 'API Access Plan', 
        description: 'Developer API integration',
        price: '$250',
        deliveryTime: '24 hours'
      }
    ]
  },
  syncplayer: {
    domain: 'SYNCPLAYER.VIFIQ.COM',
    title: 'Syncplayer',
    description: 'Emulator Environment - Advanced device emulation infrastructure for testing and development.',
    fullDescription: 'Syncplayer delivers enterprise-grade emulator environments with comprehensive device profiles, OS versions, and testing capabilities. Perfect for app developers, QA teams, and businesses requiring scalable device emulation without physical hardware.',
    icon: DeviceMobile,
    color: 'from-blue-500/20 to-blue-500/5',
    whatsappNumber: '+447700000002',
    email: 'syncplayer@vifiq.com',
    features: [
      'Android and iOS emulator environments',
      'Multiple OS versions and device profiles',
      'Cloud-based emulation infrastructure',
      'Automated testing integration',
      'Screen recording and debugging tools',
      'API access for CI/CD pipelines'
    ],
    benefits: [
      'No hardware costs or maintenance',
      'Instant environment provisioning',
      'Scalable testing capacity',
      'Multiple concurrent sessions',
      'Advanced debugging capabilities',
      'Secure isolated environments'
    ],
    services: [
      { 
        name: 'Android Emulator - Standard', 
        description: 'Cloud Android device emulation',
        price: '$45',
        deliveryTime: 'Instant'
      },
      { 
        name: 'iOS Emulator - Standard', 
        description: 'Cloud iOS device emulation',
        price: '$65',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Multi-Device Bundle', 
        description: 'Android + iOS emulation',
        price: '$95',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Enterprise Emulator Suite', 
        description: 'Unlimited device profiles',
        price: '$450',
        deliveryTime: '24 hours'
      },
      { 
        name: 'CI/CD Integration', 
        description: 'Automated testing pipeline',
        price: '$280',
        deliveryTime: '24-48 hours'
      },
      { 
        name: 'Custom Environment Setup', 
        description: 'Tailored emulation environment',
        price: '$580',
        deliveryTime: '3-5 business days'
      }
    ]
  },
  'sync-ip': {
    domain: 'SYNC-IP.VIFIQ.COM',
    title: 'Sync-IP',
    description: 'Proxy & VPN Access - Secure network infrastructure for privacy and geo-routing.',
    fullDescription: 'Sync-IP provides enterprise-grade proxy and VPN infrastructure with global IP coverage, high-speed connections, and complete privacy. Ideal for businesses requiring secure multi-region access, web scraping, ad verification, and privacy-focused operations.',
    icon: ShareNetwork,
    color: 'from-amber-500/20 to-amber-500/5',
    whatsappNumber: '+447700000003',
    email: 'sync-ip@vifiq.com',
    features: [
      'Residential and datacenter proxy pools',
      'Global IP coverage in 150+ countries',
      'High-speed VPN connections',
      'Rotating and static IP options',
      'SOCKS5 and HTTP/HTTPS protocols',
      'API integration for automation'
    ],
    benefits: [
      'Military-grade encryption',
      'Unlimited bandwidth options',
      'Zero logging policy',
      '99.9% uptime guarantee',
      'Concurrent session support',
      '24/7 technical support'
    ],
    services: [
      { 
        name: 'Residential Proxy - US', 
        description: 'US residential IP pool',
        price: '$85',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Residential Proxy - EU', 
        description: 'European residential IPs',
        price: '$95',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Datacenter Proxy Pool', 
        description: 'High-speed datacenter IPs',
        price: '$65',
        deliveryTime: 'Instant'
      },
      { 
        name: 'VPN Service - Global', 
        description: 'Multi-region VPN access',
        price: '$45',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Enterprise Proxy Suite', 
        description: 'Unlimited proxy infrastructure',
        price: '$680',
        deliveryTime: '24 hours'
      },
      { 
        name: 'Custom IP Solution', 
        description: 'Tailored proxy configuration',
        price: '$550',
        deliveryTime: '3-5 business days'
      }
    ]
  },
  trading: {
    domain: 'TRADING.VIFIQ.COM',
    title: 'Trading Infrastructure',
    description: 'Professional trading infrastructure for Forex, CFD, and Stock platforms.',
    fullDescription: 'Access institutional-grade trading platforms with verified accounts, advanced tools, and competitive spreads. Perfect for day traders, scalpers, and professional investors.',
    icon: ChartLine,
    color: 'from-purple-500/20 to-purple-500/5',
    whatsappNumber: '+447700000004',
    email: 'trading@vifiq.com',
    features: [
      'Access to major trading platforms',
      'Tight spreads and low commissions',
      'Advanced charting and analytics',
      'Algorithmic trading support',
      'Multiple asset class access',
      'Professional-grade execution'
    ],
    benefits: [
      'Institutional trading conditions',
      'Fast account activation',
      'High leverage options available',
      'Direct market access',
      'Priority execution',
      '24/7 trading support'
    ],
    services: [
      { 
        name: 'Plus500 Account', 
        description: 'CFD trading platform',
        price: '$380',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'eToro Verified', 
        description: 'Social trading platform',
        price: '$420',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Forex Broker Account', 
        description: 'Currency trading access',
        price: '$450',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'CFD Trading Account', 
        description: 'Contract for difference trading',
        price: '$480',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'IBKR Verified', 
        description: 'Interactive Brokers access',
        price: '$720',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Trading Platform Access', 
        description: 'Multi-asset trading platform',
        price: '$550',
        deliveryTime: '5-7 business days'
      }
    ]
  },
  business: {
    domain: 'BUSINESS.VIFIQ.COM',
    title: 'Business Solutions',
    description: 'Corporate banking solutions, LTDs, LLCs, and merchant accounts ready for immediate use.',
    fullDescription: 'Complete business infrastructure setup including company formation, corporate banking, and payment processing integration. Streamline your business launch with ready-to-use solutions.',
    icon: Storefront,
    color: 'from-cyan-500/20 to-cyan-500/5',
    whatsappNumber: '+447700000005',
    email: 'business@vifiq.com',
    features: [
      'Complete company formation services',
      'Corporate bank account setup',
      'Payment processor integration',
      'Merchant account provisioning',
      'Business compliance documentation',
      'Ongoing corporate support'
    ],
    benefits: [
      'Fast-track business setup',
      'All-in-one business solutions',
      'Payment-ready infrastructure',
      'Global jurisdiction options',
      'Expert compliance guidance',
      'Dedicated business advisors'
    ],
    services: [
      { 
        name: 'UK Business Bank', 
        description: 'Corporate banking account',
        price: '$580',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Stripe-Ready Account', 
        description: 'Payment processing enabled',
        price: '$680',
        deliveryTime: '10-14 business days'
      },
      { 
        name: 'PayPal Business', 
        description: 'Business payment account',
        price: '$420',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'Merchant Account', 
        description: 'Card payment processing',
        price: '$750',
        deliveryTime: '10-14 business days'
      },
      { 
        name: 'UK LTD Company', 
        description: 'UK company formation',
        price: '$450',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Payment Gateway', 
        description: 'Online payment integration',
        price: '$520',
        deliveryTime: '7-10 business days'
      }
    ]
  },
  crypto: {
    domain: 'CRYPTO.VIFIQ.COM',
    title: 'Crypto Access',
    description: 'Secure entry points for Web3, exchanges, and non-custodial wallets.',
    fullDescription: 'Access the cryptocurrency ecosystem with verified exchange accounts, secure wallet solutions, and Web3 infrastructure. Perfect for traders, investors, and blockchain businesses.',
    icon: CurrencyCircleDollar,
    color: 'from-orange-500/20 to-orange-500/5',
    whatsappNumber: '+447700000006',
    email: 'crypto@vifiq.com',
    features: [
      'Verified exchange accounts',
      'Secure wallet configuration',
      'High trading limits',
      'Advanced trading features',
      'DeFi protocol access',
      'Web3 infrastructure support'
    ],
    benefits: [
      'Skip exchange verification delays',
      'Institutional trading limits',
      'Enhanced security features',
      'Priority withdrawal processing',
      'Advanced trading tools',
      'Dedicated crypto support'
    ],
    services: [
      { 
        name: 'Binance Verified', 
        description: 'Leading crypto exchange',
        price: '$480',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'Bybit Account', 
        description: 'Derivatives trading platform',
        price: '$420',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Kraken Account', 
        description: 'Institutional exchange access',
        price: '$550',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'Crypto Wallet', 
        description: 'Secure wallet setup',
        price: '$280',
        deliveryTime: '24-48 hours'
      },
      { 
        name: 'Exchange Account', 
        description: 'Multi-exchange access',
        price: '$520',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'Web3 Wallet', 
        description: 'DeFi and NFT access',
        price: '$320',
        deliveryTime: '24-48 hours'
      }
    ]
  },
  security: {
    domain: 'SECURITY.VIFIQ.COM',
    title: 'Security',
    description: 'SECURITY - Enterprise security infrastructure, compliance, and identity verification services.',
    fullDescription: 'Comprehensive security and compliance infrastructure for businesses requiring identity verification, KYC/AML processes, fraud prevention, and regulatory compliance. Professional-grade security solutions for enterprise operations.',
    icon: LockKey,
    color: 'from-red-500/20 to-red-500/5',
    whatsappNumber: '+447700000008',
    email: 'security@vifiq.com',
    features: [
      'Identity verification and KYC/AML services',
      'Fraud detection and prevention systems',
      'Compliance documentation and auditing',
      'Secure data encryption and storage',
      'Multi-factor authentication infrastructure',
      'Security assessment and penetration testing'
    ],
    benefits: [
      'Enterprise-grade security protocols',
      'Full regulatory compliance support',
      'Reduced fraud risk',
      'Streamlined verification processes',
      'Expert security consultation',
      '24/7 security monitoring'
    ],
    services: [
      { 
        name: 'Identity Verification Suite', 
        description: 'KYC/AML identity verification',
        price: '$180',
        deliveryTime: '24-48 hours'
      },
      { 
        name: 'Fraud Prevention System', 
        description: 'Real-time fraud detection',
        price: '$320',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Compliance Audit Package', 
        description: 'Full compliance review',
        price: '$650',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Security Assessment', 
        description: 'Infrastructure security audit',
        price: '$580',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'Multi-Factor Auth Setup', 
        description: 'MFA infrastructure deployment',
        price: '$280',
        deliveryTime: '48-72 hours'
      },
      { 
        name: 'Enterprise Security Suite', 
        description: 'Complete security infrastructure',
        price: '$1,200',
        deliveryTime: '14-21 business days'
      }
    ]
  },
  regions: {
    domain: 'REGIONS.VIFIQ.COM',
    title: 'Regional Banking',
    description: 'Geographically specific banking solutions for the UK, EEA, and international markets.',
    fullDescription: 'Access region-specific banking and fintech solutions tailored to your jurisdiction. Navigate complex regulatory requirements with pre-configured, compliant banking access.',
    icon: Globe,
    color: 'from-pink-500/20 to-pink-500/5',
    whatsappNumber: '+447700000007',
    email: 'regions@vifiq.com',
    features: [
      'Jurisdiction-specific solutions',
      'Regulatory compliance built-in',
      'Local banking infrastructure',
      'Regional fintech access',
      'Cross-border capabilities',
      'Multi-region support'
    ],
    benefits: [
      'Simplified regional compliance',
      'Local market expertise',
      'Faster onboarding',
      'Reduced regulatory friction',
      'Multi-jurisdiction coverage',
      'Expert regional advisors'
    ],
    services: [
      { 
        name: 'UK Banking Services', 
        description: 'UK financial infrastructure',
        price: '$450',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'European Fintech', 
        description: 'EU digital banking',
        price: '$480',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'EEA Digital Banks', 
        description: 'European Economic Area access',
        price: '$520',
        deliveryTime: '7-10 business days'
      },
      { 
        name: 'Asian Banking Access', 
        description: 'Asia-Pacific banking',
        price: '$680',
        deliveryTime: '10-14 business days'
      },
      { 
        name: 'Offshore Accounts', 
        description: 'Offshore banking solutions',
        price: '$850',
        deliveryTime: '14-21 business days'
      },
      { 
        name: 'Cross-Border Payments', 
        description: 'International payment infrastructure',
        price: '$580',
        deliveryTime: '7-10 business days'
      }
    ]
  },
  chatbot: {
    domain: 'CHATBOT.VIFIQ.COM',
    title: 'ChatBot',
    description: 'AI-powered conversational assistance for platform navigation, compliance guidance, and operational support.',
    fullDescription: 'Intelligent conversational assistant providing real-time guidance, workflow navigation, query resolution, and contextual support across all VIFIQ platform operations. Streamline user experience with instant AI-powered assistance tailored to your specific needs.',
    icon: ChatCircleDots,
    color: 'from-purple-500/20 to-violet-500/20',
    whatsappNumber: '+447700000009',
    email: 'chatbot@vifiq.com',
    features: [
      'AI-powered contextual guidance',
      'Real-time workflow navigation',
      'Intelligent query resolution',
      'Multi-language support',
      '24/7 automated assistance',
      'Integration with all platform modules'
    ],
    benefits: [
      'Instant response to user queries',
      'Reduced support ticket volume',
      'Streamlined user onboarding',
      'Contextual compliance guidance',
      'Continuous learning and improvement',
      'Seamless platform integration'
    ],
    services: [
      { 
        name: 'Basic ChatBot', 
        description: 'Essential conversational assistance',
        price: '$120',
        deliveryTime: 'Instant'
      },
      { 
        name: 'Advanced ChatBot', 
        description: 'Enhanced AI with compliance integration',
        price: '$280',
        deliveryTime: '24 hours'
      },
      { 
        name: 'Enterprise ChatBot Suite', 
        description: 'Full AI assistant with custom training',
        price: '$580',
        deliveryTime: '3-5 business days'
      },
      { 
        name: 'Multi-Language ChatBot', 
        description: 'Global language support',
        price: '$450',
        deliveryTime: '48-72 hours'
      },
      { 
        name: 'Custom Integration', 
        description: 'Tailored ChatBot for specific workflows',
        price: '$720',
        deliveryTime: '5-7 business days'
      },
      { 
        name: 'API Access Plan', 
        description: 'Developer API for ChatBot integration',
        price: '$380',
        deliveryTime: '24-48 hours'
      }
    ]
  }
}

const serviceReviews: Record<string, Array<{
  author: { name: string; initials: string; jurisdiction: string }
  rating: number
  title: string
  content: string
  date: string
}>> = {
  'virtual-banks': [
    {
      author: { name: 'Sarah Mitchell', initials: 'SM', jurisdiction: 'UK' },
      rating: 5,
      title: 'Excellent multi-currency banking',
      content: 'The Wise account was activated within 24 hours and the multi-currency features are perfect for our international business. Support team was incredibly helpful throughout the process.',
      date: '2024-01-20'
    },
    {
      author: { name: 'Michael Torres', initials: 'MT', jurisdiction: 'EU' },
      rating: 5,
      title: 'Revolut setup was seamless',
      content: 'Got my Revolut business account fully verified and operational in less than 48 hours. The metal card and premium features are excellent for business travel.',
      date: '2024-01-18'
    }
  ],
  'betting-accounts': [
    {
      author: { name: 'David Williams', initials: 'DW', jurisdiction: 'UK' },
      rating: 5,
      title: 'Professional betting infrastructure',
      content: 'The Bet365 verified account came with enhanced limits and full access to all markets. Perfect for professional betting operations. Delivery was exactly as promised.',
      date: '2024-01-22'
    },
    {
      author: { name: 'Robert Chen', initials: 'RC', jurisdiction: 'International' },
      rating: 5,
      title: 'Betfair Exchange access',
      content: 'Finally got access to Betfair Exchange with proper verification. The account limits are excellent and support helped with the initial setup. Highly recommended.',
      date: '2024-01-15'
    }
  ],
  'company-formation': [
    {
      author: { name: 'Jennifer Adams', initials: 'JA', jurisdiction: 'UK' },
      rating: 5,
      title: 'UK LTD formation perfection',
      content: 'Complete UK LTD setup including registered office and director services. Everything was handled professionally and the banking-ready configuration saved weeks of work.',
      date: '2024-01-25'
    },
    {
      author: { name: 'Alexander Brown', initials: 'AB', jurisdiction: 'US' },
      rating: 5,
      title: 'USA LLC formation excellence',
      content: 'The Delaware LLC formation was completed in record time. All documentation was perfect and the EIN was provided. Professional service from start to finish.',
      date: '2024-01-19'
    }
  ],
  numsync: [
    {
      author: { name: 'James Mitchell', initials: 'JM', jurisdiction: 'UK' },
      rating: 5,
      title: 'Perfect virtual number solution',
      content: 'Numsync provided instant access to virtual numbers across multiple countries. The setup was seamless and numbers were activated within seconds. Essential for our multi-region verification needs.',
      date: '2024-01-15'
    },
    {
      author: { name: 'Tom Anderson', initials: 'TA', jurisdiction: 'US' },
      rating: 5,
      title: 'Essential for developers',
      content: 'The API integration made it incredibly easy to automate our verification workflows. Reliable service with excellent uptime and responsive support team.',
      date: '2024-01-01'
    }
  ],
  syncplayer: [
    {
      author: { name: 'Sofia Rodriguez', initials: 'SR', jurisdiction: 'EU' },
      rating: 5,
      title: 'Perfect for QA automation',
      content: 'Syncplayer emulator environments transformed our testing workflow. Instant provisioning of Android and iOS devices with multiple OS versions. The CI/CD integration was seamless.',
      date: '2024-01-12'
    }
  ],
  crypto: [
    {
      author: { name: 'Marcus Chen', initials: 'MC', jurisdiction: 'International' },
      rating: 5,
      title: 'Seamless crypto exchange access',
      content: 'Got my Binance verified account in under 72 hours. The tier 2 verification was already completed, and I could start trading immediately. Excellent service for professional traders.',
      date: '2024-01-10'
    },
    {
      author: { name: 'Oliver Schmidt', initials: 'OS', jurisdiction: 'EU' },
      rating: 5,
      title: 'Comprehensive crypto stack',
      content: 'The Crypto Stack bundle (wallet + exchange) was excellent value. Both Binance and secure wallet setup completed within 3 days. Professional onboarding process.',
      date: '2023-12-25'
    }
  ],
  business: [
    {
      author: { name: 'Emily Thompson', initials: 'ET', jurisdiction: 'UK' },
      rating: 5,
      title: 'Complete business infrastructure',
      content: 'The UK LTD formation plus business banking package saved me weeks of administrative work. Everything was handled professionally, and I had a fully operational company within 10 days.',
      date: '2024-01-08'
    },
    {
      author: { name: 'Amelia Brooks', initials: 'AB', jurisdiction: 'UK' },
      rating: 5,
      title: 'Stripe integration made easy',
      content: 'Business bank account with Stripe-ready configuration delivered in 7 days. Payment processing is now seamless, and customer support has been outstanding throughout.',
      date: '2023-12-22'
    }
  ],
  trading: [
    {
      author: { name: 'David Kumar', initials: 'DK', jurisdiction: 'EU' },
      rating: 4,
      title: 'Professional trading platform access',
      content: 'IBKR verified account setup was more complex than expected, but the final result was excellent. High-leverage options and institutional-grade execution are exactly what I needed.',
      date: '2024-01-05'
    }
  ],
  'sync-ip': [
    {
      author: { name: 'Rachel Foster', initials: 'RF', jurisdiction: 'UK' },
      rating: 5,
      title: 'Enterprise-grade proxy infrastructure',
      content: 'Sync-IP residential proxies delivered exactly what we needed for our scraping operations. Global coverage with excellent uptime and rotating IPs. Support team is highly responsive.',
      date: '2024-01-03'
    }
  ],
  security: [
    {
      author: { name: 'Michael Chen', initials: 'MC', jurisdiction: 'International' },
      rating: 5,
      title: 'Comprehensive security infrastructure',
      content: 'The Enterprise Security Suite provided everything our fintech startup needed. Identity verification, fraud prevention, and compliance auditing all in one package. Professional implementation.',
      date: '2024-01-14'
    }
  ],
  regions: [
    {
      author: { name: 'Isabella Rossi', initials: 'IR', jurisdiction: 'EU' },
      rating: 4,
      title: 'Great regional banking options',
      content: 'The EEA digital banking solution provided exactly what I needed for cross-border operations. Setup took about 5 days, which was reasonable given the compliance requirements.',
      date: '2023-12-28'
    }
  ],
  chatbot: [
    {
      author: { name: 'Marcus Thompson', initials: 'MT', jurisdiction: 'UK' },
      rating: 5,
      title: 'Exceptional AI assistance',
      content: 'The ChatBot integration has dramatically reduced our support overhead. Users get instant, accurate answers to complex compliance questions. The contextual awareness is impressive.',
      date: '2024-02-15'
    },
    {
      author: { name: 'Elena Rodriguez', initials: 'ER', jurisdiction: 'EU' },
      rating: 5,
      title: 'Game-changer for onboarding',
      content: 'Our new users navigate the platform effortlessly now. The multi-language support is fantastic, and the workflow guidance is spot-on. Best investment we made this quarter.',
      date: '2024-02-10'
    },
    {
      author: { name: 'James Park', initials: 'JP', jurisdiction: 'International' },
      rating: 5,
      title: 'Intelligent and reliable',
      content: 'The advanced ChatBot with compliance integration knows our processes better than some of our team members. 24/7 availability means we never miss a customer query.',
      date: '2024-02-05'
    }
  ]
}

export function ServiceDetailPage() {
  const { domain } = useParams<{ domain: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const service = domain ? serviceDomains[domain] : null

  useEffect(() => {
    setIsLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    const prevDomain = location.state?.prevDomain
    if (prevDomain && domain) {
      const domains = Object.keys(serviceDomains)
      const prevIndex = domains.indexOf(prevDomain)
      const currentIndex = domains.indexOf(domain)
      setDirection(currentIndex > prevIndex ? 1 : -1)
    }

    const loadTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(loadTimeout)
  }, [domain, location.state])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const nav = getNavigationLinks()
        if (e.key === 'ArrowLeft' && nav.prev) {
          handleNavigateToService(nav.prev.key)
        } else if (e.key === 'ArrowRight' && nav.next) {
          handleNavigateToService(nav.next.key)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [domain])

  const getNavigationLinks = () => {
    const domainKeys = Object.keys(serviceDomains)
    const currentIndex = domainKeys.indexOf(domain || '')
    
    if (currentIndex === -1) return { prev: null, next: null }
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : domainKeys.length - 1
    const nextIndex = currentIndex < domainKeys.length - 1 ? currentIndex + 1 : 0
    
    return {
      prev: {
        key: domainKeys[prevIndex],
        service: serviceDomains[domainKeys[prevIndex]]
      },
      next: {
        key: domainKeys[nextIndex],
        service: serviceDomains[domainKeys[nextIndex]]
      }
    }
  }

  const handleNavigateToService = (serviceKey: string) => {
    setIsLoading(true)
    setDirection(Object.keys(serviceDomains).indexOf(serviceKey) > Object.keys(serviceDomains).indexOf(domain || '') ? 1 : -1)
    navigate(`/service/${serviceKey}`, { state: { prevDomain: domain } })
  }

  if (isLoading) {
    return <ServiceDetailSkeleton />
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Service Not Found</CardTitle>
            <CardDescription>The requested service domain could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="mr-2" size={16} />
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const IconComponent = service.icon
  const reviews = domain ? (serviceReviews[domain] || []) : []

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            weight="fill"
            className={star <= rating ? 'text-accent' : 'text-muted-foreground/30'}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${service.title} services from ${service.domain}`)
    const whatsappUrl = `https://wa.me/${service.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
    
    toast.success('Opening WhatsApp', {
      description: 'Redirecting to WhatsApp chat...'
    })
  }

  const handlePhoneContact = () => {
    window.location.href = `tel:${service.whatsappNumber}`
    toast.info('Calling', {
      description: service.whatsappNumber
    })
  }

  const handleEmailContact = () => {
    window.location.href = `mailto:${service.email}?subject=Inquiry about ${service.title}`
    toast.info('Opening email client', {
      description: service.email
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingProgress isLoading={isLoading} duration={800} />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.25_0.04_250),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.18_0.05_195),transparent_50%)] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Back to Homepage
            </Button>
            
            <motion.div 
              className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <kbd className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono">←</kbd>
              <kbd className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono">→</kbd>
              <span>Navigate services</span>
            </motion.div>
          </div>
          
          <ServiceNavigationHeader />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={domain}
            initial={{ 
              opacity: 0, 
              x: direction * 100,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              x: direction * -100,
              scale: 0.95
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
          <Card className="mb-8 border-border/50 overflow-hidden">
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${service.color} opacity-30 blur-3xl pointer-events-none`} />
            
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} border border-accent/20`}>
                  <IconComponent size={48} className="text-accent" />
                </div>
                <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                  {service.domain}
                </Badge>
              </div>
              <CardTitle className="text-4xl mb-3">{service.title}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                {service.fullDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 relative">
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={handleWhatsAppContact}
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Contact on WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handlePhoneContact}
                  className="gap-2 border-accent/30 hover:bg-accent/10"
                >
                  <Phone size={20} />
                  Call Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleEmailContact}
                  className="gap-2 border-accent/30 hover:bg-accent/10"
                >
                  <EnvelopeSimple size={20} />
                  Email
                </Button>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle size={24} className="text-accent" weight="fill" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield size={24} className="text-accent" weight="fill" />
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 shrink-0">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.h2 
            className="text-3xl font-semibold mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Available Services
          </motion.h2>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {service.services.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.97 }}
              >
                <Card className="h-full border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors duration-300">{item.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {item.price && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <motion.span 
                          className="text-lg font-bold text-accent"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.price}
                        </motion.span>
                      </div>
                    )}
                    {item.deliveryTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Delivery</span>
                        <span className="text-xs font-medium">{item.deliveryTime}</span>
                      </div>
                    )}
                    <Separator className="my-3 group-hover:opacity-50 transition-opacity duration-300" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleWhatsAppContact}
                      className="w-full border-accent/30 hover:bg-accent/10 gap-2 transition-all duration-300"
                    >
                      <WhatsappLogo size={16} />
                      Contact
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="mt-8 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.75_0.18_195_/_0.1),transparent_70%)] pointer-events-none" />
              <CardHeader className="text-center relative">
                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-base">
                  Contact us now to discuss your requirements and get started within 24-48 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={handleWhatsAppContact}
                    className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 shadow-lg"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    Message Us on WhatsApp
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handlePhoneContact}
                    className="gap-2 border-accent/30 hover:bg-accent/10"
                  >
                    <Phone size={20} />
                    {service.whatsappNumber}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {(() => {
            const nav = getNavigationLinks()
            if (!nav.prev || !nav.next) return null
            const PrevIcon = nav.prev.service.icon
            const NextIcon = nav.next.service.icon
            
            return (
              <motion.div 
                className="mt-12 grid sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="h-full border-border/50 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                    onClick={() => handleNavigateToService(nav.prev!.key)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <ArrowLeft size={20} className="text-accent group-hover:animate-[bounce-x_1s_ease-in-out_infinite]" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Previous Service</span>
                      </div>
                      <div className="flex items-start gap-3 mt-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${nav.prev.service.color} border border-accent/10`}>
                          <PrevIcon size={24} className="text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-base group-hover:text-accent transition-colors duration-300">
                            {nav.prev.service.title}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1 line-clamp-2">
                            {nav.prev.service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="h-full border-border/50 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                    onClick={() => handleNavigateToService(nav.next!.key)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Next Service</span>
                        <ArrowRight size={20} className="text-accent group-hover:animate-[bounce-x_1s_ease-in-out_infinite]" />
                      </div>
                      <div className="flex items-start gap-3 mt-3 flex-row-reverse text-right">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${nav.next.service.color} border border-accent/10`}>
                          <NextIcon size={24} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base group-hover:text-accent transition-colors duration-300">
                            {nav.next.service.title}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1 line-clamp-2">
                            {nav.next.service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })()}
        </motion.div>
      </AnimatePresence>
      </div>
      
      <ChatBot variant="floating" />
    </div>
  )
}
