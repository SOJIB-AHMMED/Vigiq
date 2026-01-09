import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Buildings, Storefront, Wallet, TrendUp, Bank, Crown, ArrowLeft, ArrowRight, CheckCircle, Clock, User, MapPin, Briefcase, Lightning, CreditCard, ShoppingBag, Money, ChartLine, Globe } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type MasterCategory = 
  | 'COMPANY FORMATION'
  | 'BUSINESS BANKS'
  | 'MARKETPLACE ACCOUNTS'
  | 'VIRTUAL BANKS'
  | 'CRYPTO WALLET & EXCHANGE'
  | 'TRADING ACCOUNTS'
  | 'BETTING ACCOUNTS'
  | 'PAYMENT PROCESSORS'
  | 'E-COMMERCE PLATFORMS'
  | 'FINTECH SERVICES'
  | 'COMPLIANCE & KYC'

type ServiceFamily = {
  id: string
  name: string
  category: MasterCategory
  description: string
}

type ServiceVariant = {
  id: string
  familyId: string
  name: string
  scope: string
  deliverySpeed: string
  priceFrom: number
}

const masterCategories: { 
  name: MasterCategory
  icon: React.ComponentType<any>
  hoverColor: string
  hoverBorderColor: string
  hoverShadowColor: string
  hoverDuration: number
}[] = [
  { 
    name: 'COMPANY FORMATION', 
    icon: Buildings,
    hoverColor: 'oklch(0.18 0.05 245)',
    hoverBorderColor: 'oklch(0.60 0.22 245 / 0.6)',
    hoverShadowColor: 'oklch(0.60 0.22 245 / 0.3)',
    hoverDuration: 0.28
  },
  { 
    name: 'BUSINESS BANKS', 
    icon: Bank,
    hoverColor: 'oklch(0.18 0.05 200)',
    hoverBorderColor: 'oklch(0.70 0.18 200 / 0.6)',
    hoverShadowColor: 'oklch(0.70 0.18 200 / 0.3)',
    hoverDuration: 0.32
  },
  { 
    name: 'MARKETPLACE ACCOUNTS', 
    icon: Storefront,
    hoverColor: 'oklch(0.18 0.05 35)',
    hoverBorderColor: 'oklch(0.75 0.20 35 / 0.6)',
    hoverShadowColor: 'oklch(0.75 0.20 35 / 0.3)',
    hoverDuration: 0.26
  },
  { 
    name: 'VIRTUAL BANKS', 
    icon: Wallet,
    hoverColor: 'oklch(0.18 0.05 165)',
    hoverBorderColor: 'oklch(0.65 0.20 165 / 0.6)',
    hoverShadowColor: 'oklch(0.65 0.20 165 / 0.3)',
    hoverDuration: 0.3
  },
  { 
    name: 'CRYPTO WALLET & EXCHANGE', 
    icon: Money,
    hoverColor: 'oklch(0.18 0.05 70)',
    hoverBorderColor: 'oklch(0.78 0.18 70 / 0.6)',
    hoverShadowColor: 'oklch(0.78 0.18 70 / 0.3)',
    hoverDuration: 0.27
  },
  { 
    name: 'TRADING ACCOUNTS', 
    icon: ChartLine,
    hoverColor: 'oklch(0.18 0.05 290)',
    hoverBorderColor: 'oklch(0.65 0.25 290 / 0.6)',
    hoverShadowColor: 'oklch(0.65 0.25 290 / 0.3)',
    hoverDuration: 0.29
  },
  { 
    name: 'BETTING ACCOUNTS', 
    icon: TrendUp,
    hoverColor: 'oklch(0.19 0.05 15)',
    hoverBorderColor: 'oklch(0.62 0.24 15 / 0.6)',
    hoverShadowColor: 'oklch(0.62 0.24 15 / 0.3)',
    hoverDuration: 0.31
  },
  { 
    name: 'PAYMENT PROCESSORS', 
    icon: CreditCard,
    hoverColor: 'oklch(0.18 0.05 330)',
    hoverBorderColor: 'oklch(0.72 0.22 330 / 0.6)',
    hoverShadowColor: 'oklch(0.72 0.22 330 / 0.3)',
    hoverDuration: 0.25
  },
  { 
    name: 'E-COMMERCE PLATFORMS', 
    icon: ShoppingBag,
    hoverColor: 'oklch(0.18 0.05 135)',
    hoverBorderColor: 'oklch(0.68 0.21 135 / 0.6)',
    hoverShadowColor: 'oklch(0.68 0.21 135 / 0.3)',
    hoverDuration: 0.33
  },
  { 
    name: 'FINTECH SERVICES', 
    icon: Bank,
    hoverColor: 'oklch(0.18 0.05 180)',
    hoverBorderColor: 'oklch(0.67 0.19 180 / 0.6)',
    hoverShadowColor: 'oklch(0.67 0.19 180 / 0.3)',
    hoverDuration: 0.28
  },
  { 
    name: 'COMPLIANCE & KYC', 
    icon: Globe,
    hoverColor: 'oklch(0.18 0.05 270)',
    hoverBorderColor: 'oklch(0.63 0.23 270 / 0.6)',
    hoverShadowColor: 'oklch(0.63 0.23 270 / 0.3)',
    hoverDuration: 0.3
  }
]

const serviceFamilies: ServiceFamily[] = [
  { id: 'uk-company', name: 'UK Company Formation', category: 'COMPANY FORMATION', description: 'British entity registration with full compliance' },
  { id: 'usa-company', name: 'USA Company Formation', category: 'COMPANY FORMATION', description: 'US-based LLC or C-Corp setup' },
  { id: 'eu-company', name: 'EU Company Formation', category: 'COMPANY FORMATION', description: 'European Union entity establishment' },
  { id: 'singapore-company', name: 'Singapore Company Formation', category: 'COMPANY FORMATION', description: 'Asia-Pacific entity setup' },
  { id: 'dubai-company', name: 'Dubai Company Formation', category: 'COMPANY FORMATION', description: 'UAE free zone entity' },
  { id: 'hong-kong-company', name: 'Hong Kong Company', category: 'COMPANY FORMATION', description: 'International trading entity' },
  
  { id: 'business-bank', name: 'Business Bank Account', category: 'BUSINESS BANKS', description: 'Operational business banking access' },
  { id: 'stripe-ready-bank', name: 'Stripe-Ready Business Bank', category: 'BUSINESS BANKS', description: 'Payment processor integrated banking' },
  { id: 'paypal-ready-bank', name: 'PayPal-Ready Bank', category: 'BUSINESS BANKS', description: 'PayPal compatible banking' },
  { id: 'multi-currency-bank', name: 'Multi-Currency Bank', category: 'BUSINESS BANKS', description: 'Global currency support' },
  
  { id: 'amazon-seller', name: 'Amazon Seller', category: 'MARKETPLACE ACCOUNTS', description: 'Professional Amazon marketplace access' },
  { id: 'ebay-seller', name: 'eBay Seller', category: 'MARKETPLACE ACCOUNTS', description: 'Verified eBay seller account' },
  { id: 'etsy-shop', name: 'Etsy Shop', category: 'MARKETPLACE ACCOUNTS', description: 'Etsy marketplace store setup' },
  { id: 'walmart-seller', name: 'Walmart Seller', category: 'MARKETPLACE ACCOUNTS', description: 'Walmart marketplace onboarding' },
  { id: 'shopify-store', name: 'Shopify Store', category: 'MARKETPLACE ACCOUNTS', description: 'E-commerce platform configuration' },
  { id: 'alibaba-seller', name: 'Alibaba Seller', category: 'MARKETPLACE ACCOUNTS', description: 'B2B marketplace access' },
  { id: 'aliexpress-seller', name: 'AliExpress Seller', category: 'MARKETPLACE ACCOUNTS', description: 'Global dropshipping platform' },
  
  { id: 'wise-account', name: 'Wise Account', category: 'VIRTUAL BANKS', description: 'Multi-currency digital banking' },
  { id: 'n26-account', name: 'N26 Account', category: 'VIRTUAL BANKS', description: 'European digital bank access' },
  { id: 'revolut-account', name: 'Revolut Account', category: 'VIRTUAL BANKS', description: 'Global digital banking platform' },
  { id: 'payoneer-account', name: 'Payoneer Account', category: 'VIRTUAL BANKS', description: 'International payment platform' },
  { id: 'mercury-account', name: 'Mercury Account', category: 'VIRTUAL BANKS', description: 'US startup banking' },
  { id: 'brex-account', name: 'Brex Account', category: 'VIRTUAL BANKS', description: 'Corporate card platform' },
  
  { id: 'binance-account', name: 'Binance Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'Crypto exchange platform access' },
  { id: 'coinbase-account', name: 'Coinbase Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'US-based crypto exchange' },
  { id: 'kraken-account', name: 'Kraken Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'Institutional crypto trading' },
  { id: 'corporate-wallet', name: 'Corporate Crypto Wallet', category: 'CRYPTO WALLET & EXCHANGE', description: 'Secure business wallet setup' },
  { id: 'gemini-account', name: 'Gemini Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'Regulated US crypto exchange' },
  { id: 'bybit-account', name: 'Bybit Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'Derivatives trading platform' },
  { id: 'okx-account', name: 'OKX Account', category: 'CRYPTO WALLET & EXCHANGE', description: 'Global crypto exchange' },
  
  { id: 'ibkr-account', name: 'IBKR Account', category: 'TRADING ACCOUNTS', description: 'Interactive Brokers trading platform' },
  { id: 'trading-platform', name: 'Trading Platform Account', category: 'TRADING ACCOUNTS', description: 'Standard brokerage access' },
  { id: 'etoro-account', name: 'eToro Account', category: 'TRADING ACCOUNTS', description: 'Social trading platform' },
  { id: 'td-ameritrade', name: 'TD Ameritrade', category: 'TRADING ACCOUNTS', description: 'US trading platform' },
  { id: 'webull-account', name: 'Webull Account', category: 'TRADING ACCOUNTS', description: 'Commission-free trading' },
  { id: 'fidelity-account', name: 'Fidelity Account', category: 'TRADING ACCOUNTS', description: 'Full-service brokerage' },
  
  { id: 'bet365-account', name: 'Bet365 Account', category: 'BETTING ACCOUNTS', description: 'High-limit bookmaker access' },
  { id: 'betfair-account', name: 'Betfair Account', category: 'BETTING ACCOUNTS', description: 'Premium betting exchange' },
  { id: 'unibet-account', name: 'Unibet Account', category: 'BETTING ACCOUNTS', description: 'Sports betting platform' },
  { id: 'william-hill', name: 'William Hill', category: 'BETTING ACCOUNTS', description: 'Established bookmaker' },
  { id: 'draftkings', name: 'DraftKings', category: 'BETTING ACCOUNTS', description: 'US sports betting' },
  
  { id: 'stripe-account', name: 'Stripe Account', category: 'PAYMENT PROCESSORS', description: 'Global payment processing' },
  { id: 'paypal-business', name: 'PayPal Business', category: 'PAYMENT PROCESSORS', description: 'Business payment account' },
  { id: 'square-account', name: 'Square Account', category: 'PAYMENT PROCESSORS', description: 'Point-of-sale payments' },
  { id: 'adyen-account', name: 'Adyen Account', category: 'PAYMENT PROCESSORS', description: 'Enterprise payment platform' },
  { id: 'checkout-com', name: 'Checkout.com', category: 'PAYMENT PROCESSORS', description: 'Payment gateway solution' },
  { id: 'authorize-net', name: 'Authorize.Net', category: 'PAYMENT PROCESSORS', description: 'Payment gateway service' },
  
  { id: 'woocommerce-setup', name: 'WooCommerce Setup', category: 'E-COMMERCE PLATFORMS', description: 'WordPress e-commerce' },
  { id: 'bigcommerce', name: 'BigCommerce', category: 'E-COMMERCE PLATFORMS', description: 'Enterprise e-commerce' },
  { id: 'magento-setup', name: 'Magento Setup', category: 'E-COMMERCE PLATFORMS', description: 'Custom e-commerce platform' },
  { id: 'prestashop', name: 'PrestaShop', category: 'E-COMMERCE PLATFORMS', description: 'Open-source e-commerce' },
  { id: 'wix-store', name: 'Wix Store', category: 'E-COMMERCE PLATFORMS', description: 'Website builder commerce' },
  
  { id: 'klarna-merchant', name: 'Klarna Merchant', category: 'FINTECH SERVICES', description: 'Buy now pay later' },
  { id: 'afterpay-merchant', name: 'Afterpay Merchant', category: 'FINTECH SERVICES', description: 'Installment payments' },
  { id: 'plaid-integration', name: 'Plaid Integration', category: 'FINTECH SERVICES', description: 'Banking API access' },
  { id: 'dwolla-account', name: 'Dwolla Account', category: 'FINTECH SERVICES', description: 'ACH payment platform' },
  
  { id: 'kyc-verification', name: 'KYC Verification', category: 'COMPLIANCE & KYC', description: 'Identity verification setup' },
  { id: 'aml-compliance', name: 'AML Compliance Package', category: 'COMPLIANCE & KYC', description: 'Anti-money laundering setup' },
  { id: 'kyb-business', name: 'KYB Business Verification', category: 'COMPLIANCE & KYC', description: 'Business entity verification' },
  { id: 'compliance-audit', name: 'Compliance Audit', category: 'COMPLIANCE & KYC', description: 'Regulatory compliance review' }
]

const serviceVariants: ServiceVariant[] = [
  { id: 'uk-std', familyId: 'uk-company', name: 'Standard', scope: 'Basic company registration', deliverySpeed: '7-10 days', priceFrom: 390 },
  { id: 'uk-bank', familyId: 'uk-company', name: 'Banking Ready', scope: 'Company + bank preparation', deliverySpeed: '10-14 days', priceFrom: 650 },
  { id: 'uk-full', familyId: 'uk-company', name: 'Banking + Payments Ready', scope: 'Full payment processor readiness', deliverySpeed: '14-21 days', priceFrom: 950 },
  
  { id: 'usa-std', familyId: 'usa-company', name: 'Standard LLC', scope: 'Basic LLC formation', deliverySpeed: '7-14 days', priceFrom: 450 },
  { id: 'usa-corp', familyId: 'usa-company', name: 'C-Corp Formation', scope: 'Delaware C-Corp setup', deliverySpeed: '10-14 days', priceFrom: 750 },
  
  { id: 'eu-std', familyId: 'eu-company', name: 'Standard', scope: 'EU entity formation', deliverySpeed: '14-21 days', priceFrom: 650 },
  { id: 'singapore-std', familyId: 'singapore-company', name: 'Standard', scope: 'Singapore Pte Ltd', deliverySpeed: '10-14 days', priceFrom: 890 },
  { id: 'dubai-std', familyId: 'dubai-company', name: 'Free Zone', scope: 'UAE free zone entity', deliverySpeed: '14-21 days', priceFrom: 1200 },
  { id: 'hong-kong-std', familyId: 'hong-kong-company', name: 'Standard', scope: 'Hong Kong Ltd', deliverySpeed: '10-14 days', priceFrom: 950 },
  
  { id: 'bank-std', familyId: 'business-bank', name: 'Standard', scope: 'Business banking account', deliverySpeed: '7-14 days', priceFrom: 450 },
  { id: 'stripe-bank', familyId: 'stripe-ready-bank', name: 'Stripe Ready', scope: 'Payment-ready banking', deliverySpeed: '10-14 days', priceFrom: 650 },
  { id: 'paypal-bank', familyId: 'paypal-ready-bank', name: 'PayPal Compatible', scope: 'PayPal-ready account', deliverySpeed: '7-10 days', priceFrom: 580 },
  { id: 'multi-curr-bank', familyId: 'multi-currency-bank', name: 'Global Account', scope: 'Multi-currency support', deliverySpeed: '10-14 days', priceFrom: 720 },
  
  { id: 'amazon-std', familyId: 'amazon-seller', name: 'Professional Seller', scope: 'Full marketplace access', deliverySpeed: '5-7 days', priceFrom: 455 },
  { id: 'ebay-std', familyId: 'ebay-seller', name: 'Verified Seller', scope: 'Seller account setup', deliverySpeed: '3-5 days', priceFrom: 320 },
  { id: 'etsy-std', familyId: 'etsy-shop', name: 'Shop Setup', scope: 'Store + verification', deliverySpeed: '3-5 days', priceFrom: 295 },
  { id: 'walmart-std', familyId: 'walmart-seller', name: 'Marketplace Access', scope: 'Seller onboarding', deliverySpeed: '7-10 days', priceFrom: 520 },
  { id: 'shopify-std', familyId: 'shopify-store', name: 'Store Setup', scope: 'E-commerce platform', deliverySpeed: '5-7 days', priceFrom: 420 },
  { id: 'alibaba-std', familyId: 'alibaba-seller', name: 'Gold Supplier', scope: 'B2B marketplace access', deliverySpeed: '7-14 days', priceFrom: 680 },
  { id: 'aliexpress-std', familyId: 'aliexpress-seller', name: 'Seller Account', scope: 'Global dropshipping', deliverySpeed: '5-7 days', priceFrom: 380 },
  
  { id: 'wise-std', familyId: 'wise-account', name: 'Multi-Currency', scope: 'Business account access', deliverySpeed: '3-5 days', priceFrom: 300 },
  { id: 'n26-std', familyId: 'n26-account', name: 'Business Account', scope: 'European digital bank', deliverySpeed: '5-7 days', priceFrom: 380 },
  { id: 'revolut-std', familyId: 'revolut-account', name: 'Business Account', scope: 'Digital banking access', deliverySpeed: '5-7 days', priceFrom: 350 },
  { id: 'payoneer-std', familyId: 'payoneer-account', name: 'Business Account', scope: 'International payments', deliverySpeed: '5-7 days', priceFrom: 320 },
  { id: 'mercury-std', familyId: 'mercury-account', name: 'Startup Account', scope: 'US startup banking', deliverySpeed: '7-10 days', priceFrom: 450 },
  { id: 'brex-std', familyId: 'brex-account', name: 'Corporate Card', scope: 'Business credit access', deliverySpeed: '7-10 days', priceFrom: 520 },
  
  { id: 'binance-std', familyId: 'binance-account', name: 'Verified Account', scope: 'Exchange access', deliverySpeed: '5-7 days', priceFrom: 450 },
  { id: 'coinbase-std', familyId: 'coinbase-account', name: 'Verified Account', scope: 'US crypto exchange', deliverySpeed: '5-7 days', priceFrom: 420 },
  { id: 'kraken-std', familyId: 'kraken-account', name: 'Verified Account', scope: 'Institutional trading', deliverySpeed: '7-10 days', priceFrom: 550 },
  { id: 'wallet-std', familyId: 'corporate-wallet', name: 'Corporate Wallet', scope: 'Secure wallet setup', deliverySpeed: '3-5 days', priceFrom: 250 },
  { id: 'gemini-std', familyId: 'gemini-account', name: 'Verified Account', scope: 'Regulated exchange', deliverySpeed: '5-7 days', priceFrom: 480 },
  { id: 'bybit-std', familyId: 'bybit-account', name: 'Trading Account', scope: 'Derivatives platform', deliverySpeed: '3-5 days', priceFrom: 380 },
  { id: 'okx-std', familyId: 'okx-account', name: 'Verified Account', scope: 'Global exchange', deliverySpeed: '5-7 days', priceFrom: 420 },
  
  { id: 'ibkr-std', familyId: 'ibkr-account', name: 'Verified Account', scope: 'Institutional trading', deliverySpeed: '7-10 days', priceFrom: 700 },
  { id: 'trading-std', familyId: 'trading-platform', name: 'Standard Account', scope: 'Broker access', deliverySpeed: '5-7 days', priceFrom: 350 },
  { id: 'etoro-std', familyId: 'etoro-account', name: 'Trading Account', scope: 'Social trading', deliverySpeed: '5-7 days', priceFrom: 400 },
  { id: 'td-std', familyId: 'td-ameritrade', name: 'Trading Account', scope: 'US platform access', deliverySpeed: '7-10 days', priceFrom: 520 },
  { id: 'webull-std', familyId: 'webull-account', name: 'Trading Account', scope: 'Commission-free', deliverySpeed: '3-5 days', priceFrom: 280 },
  { id: 'fidelity-std', familyId: 'fidelity-account', name: 'Brokerage Account', scope: 'Full-service access', deliverySpeed: '7-10 days', priceFrom: 580 },
  
  { id: 'bet365-std', familyId: 'bet365-account', name: 'Verified Account', scope: 'High-limit access', deliverySpeed: '5-7 days', priceFrom: 450 },
  { id: 'betfair-std', familyId: 'betfair-account', name: 'Exchange Access', scope: 'Premium betting', deliverySpeed: '5-7 days', priceFrom: 480 },
  { id: 'unibet-std', familyId: 'unibet-account', name: 'Sports Betting', scope: 'Platform access', deliverySpeed: '3-5 days', priceFrom: 380 },
  { id: 'william-std', familyId: 'william-hill', name: 'Bookmaker Account', scope: 'Established platform', deliverySpeed: '5-7 days', priceFrom: 420 },
  { id: 'draftkings-std', familyId: 'draftkings', name: 'Sportsbook Account', scope: 'US sports betting', deliverySpeed: '5-7 days', priceFrom: 450 },
  
  { id: 'stripe-std', familyId: 'stripe-account', name: 'Business Account', scope: 'Global payments', deliverySpeed: '7-10 days', priceFrom: 485 },
  { id: 'paypal-biz-std', familyId: 'paypal-business', name: 'Business Account', scope: 'Payment processing', deliverySpeed: '5-7 days', priceFrom: 380 },
  { id: 'square-std', familyId: 'square-account', name: 'Business Account', scope: 'POS payments', deliverySpeed: '5-7 days', priceFrom: 350 },
  { id: 'adyen-std', familyId: 'adyen-account', name: 'Merchant Account', scope: 'Enterprise platform', deliverySpeed: '10-14 days', priceFrom: 890 },
  { id: 'checkout-std', familyId: 'checkout-com', name: 'Gateway Account', scope: 'Payment solution', deliverySpeed: '7-10 days', priceFrom: 580 },
  { id: 'authorize-std', familyId: 'authorize-net', name: 'Gateway Account', scope: 'Payment gateway', deliverySpeed: '5-7 days', priceFrom: 420 },
  
  { id: 'woo-std', familyId: 'woocommerce-setup', name: 'Store Setup', scope: 'WordPress commerce', deliverySpeed: '5-7 days', priceFrom: 380 },
  { id: 'bigc-std', familyId: 'bigcommerce', name: 'Enterprise Setup', scope: 'Full platform', deliverySpeed: '7-14 days', priceFrom: 680 },
  { id: 'magento-std', familyId: 'magento-setup', name: 'Custom Platform', scope: 'E-commerce setup', deliverySpeed: '14-21 days', priceFrom: 1200 },
  { id: 'presta-std', familyId: 'prestashop', name: 'Store Setup', scope: 'Open-source platform', deliverySpeed: '7-10 days', priceFrom: 520 },
  { id: 'wix-std', familyId: 'wix-store', name: 'Store Builder', scope: 'Website commerce', deliverySpeed: '3-5 days', priceFrom: 280 },
  
  { id: 'klarna-std', familyId: 'klarna-merchant', name: 'Merchant Account', scope: 'BNPL integration', deliverySpeed: '7-10 days', priceFrom: 450 },
  { id: 'afterpay-std', familyId: 'afterpay-merchant', name: 'Merchant Account', scope: 'Installment payments', deliverySpeed: '7-10 days', priceFrom: 420 },
  { id: 'plaid-std', familyId: 'plaid-integration', name: 'API Integration', scope: 'Banking API access', deliverySpeed: '5-7 days', priceFrom: 580 },
  { id: 'dwolla-std', familyId: 'dwolla-account', name: 'ACH Platform', scope: 'Payment platform', deliverySpeed: '7-10 days', priceFrom: 520 },
  
  { id: 'kyc-std', familyId: 'kyc-verification', name: 'Standard KYC', scope: 'Identity verification', deliverySpeed: '3-5 days', priceFrom: 310 },
  { id: 'aml-std', familyId: 'aml-compliance', name: 'AML Package', scope: 'Compliance setup', deliverySpeed: '7-10 days', priceFrom: 450 },
  { id: 'kyb-std', familyId: 'kyb-business', name: 'Business KYB', scope: 'Entity verification', deliverySpeed: '5-7 days', priceFrom: 380 },
  { id: 'audit-std', familyId: 'compliance-audit', name: 'Compliance Review', scope: 'Regulatory audit', deliverySpeed: '10-14 days', priceFrom: 680 }
]

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

export function OfferTemplate() {
  const [currentStep, setCurrentStep] = useState<Step>(0)
  const [selectedCategory, setSelectedCategory] = useState<MasterCategory | null>(null)
  const [selectedFamily, setSelectedFamily] = useState<ServiceFamily | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant | null>(null)
  const [intendedUse, setIntendedUse] = useState('')
  const [jurisdiction, setJurisdiction] = useState('')
  const [entityType, setEntityType] = useState('')
  const [urgency, setUrgency] = useState('')
  const [notes, setNotes] = useState('')
  const [requestId, setRequestId] = useState('')

  const handleCategorySelect = (category: MasterCategory) => {
    setSelectedCategory(category)
    setCurrentStep(2)
  }

  const handleFamilySelect = (family: ServiceFamily) => {
    setSelectedFamily(family)
    setCurrentStep(3)
  }

  const handleVariantSelect = (variant: ServiceVariant) => {
    setSelectedVariant(variant)
    setCurrentStep(4)
  }

  const handleRequestEnablement = () => {
    setCurrentStep(5)
  }

  const handleSubmitIntake = () => {
    if (!intendedUse.trim() || !jurisdiction) {
      toast.error('Please fill all required fields')
      return
    }

    const generatedId = `REQ-${Date.now().toString(36).toUpperCase()}`
    setRequestId(generatedId)
    setCurrentStep(6)
    
    toast.success('Request submitted successfully', {
      description: `Request ID: ${generatedId}`
    })
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSelectedCategory(null)
    setSelectedFamily(null)
    setSelectedVariant(null)
    setIntendedUse('')
    setJurisdiction('')
    setEntityType('')
    setUrgency('')
    setNotes('')
    setRequestId('')
  }

  const filteredFamilies = selectedCategory 
    ? serviceFamilies.filter(f => f.category === selectedCategory)
    : []

  const filteredVariants = selectedFamily
    ? serviceVariants.filter(v => v.familyId === selectedFamily.id)
    : []

  return (
    <div className="w-full py-16 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1.5 text-xs font-semibold tracking-wider">
            ACCESS MARKET
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight">
            ACCESS.<br />
            SETUP.<br />
            ENABLEMENT.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed mb-2">
            Premium infrastructure for your digital business.
          </p>
          <p className="text-sm md:text-base text-accent/90 max-w-2xl mx-auto px-4">
            Call or WhatsApp us now for ready-made service.
          </p>
        </motion.div>

        {currentStep > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 px-4 py-2">
              Step {currentStep} of 7
            </Badge>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4"
            >
              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome to ACCESS MARKET</CardTitle>
                  <CardDescription>
                    All services require step-by-step validation and intake
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => setCurrentStep(1)}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Browse Services
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(0)}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
              </div>
              
              <h3 className="text-2xl font-semibold mb-6 text-center">Select Master Category</h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {masterCategories.map((cat) => {
                  const IconComponent = cat.icon
                  return (
                    <motion.div
                      key={cat.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: cat.hoverDuration }}
                    >
                      <Card
                        className="cursor-pointer border-border/50 transition-all"
                        style={{
                          transitionDuration: `${cat.hoverDuration}s`
                        }}
                        onMouseEnter={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = cat.hoverBorderColor
                          card.style.backgroundColor = cat.hoverColor
                          card.style.boxShadow = `0 20px 60px -15px ${cat.hoverShadowColor}, 0 0 30px ${cat.hoverShadowColor}`
                        }}
                        onMouseLeave={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = ''
                          card.style.backgroundColor = ''
                          card.style.boxShadow = ''
                        }}
                        onClick={() => handleCategorySelect(cat.name)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div 
                              className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20"
                              whileHover={{ 
                                rotate: [0, -5, 5, -3, 0],
                                scale: 1.1
                              }}
                              transition={{ duration: 0.4 }}
                            >
                              <IconComponent size={24} className="text-accent" />
                            </motion.div>
                            <h4 className="font-semibold text-sm">★ {cat.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && selectedCategory && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentStep(1)
                    setSelectedCategory(null)
                  }}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Categories
                </Button>
              </div>

              <h3 className="text-2xl font-semibold mb-2 text-center">{selectedCategory}</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Select Service Family</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFamilies.map((family, familyIndex) => {
                  const categoryData = masterCategories.find(c => c.name === selectedCategory)
                  const IconComponent = categoryData?.icon
                  const hoverColor = categoryData?.hoverColor || 'oklch(0.18 0.05 245)'
                  const hoverBorderColor = categoryData?.hoverBorderColor || 'oklch(0.60 0.22 245 / 0.6)'
                  const hoverShadowColor = categoryData?.hoverShadowColor || 'oklch(0.60 0.22 245 / 0.3)'
                  const hoverDuration = categoryData?.hoverDuration || 0.3
                  
                  const iconAnimations: Record<MasterCategory, any> = {
                    'COMPANY FORMATION': { 
                      rotate: [0, -8, 8, -5, 5, 0],
                      scale: [1, 1.1, 1.05, 1.1, 1]
                    },
                    'BUSINESS BANKS': {
                      y: [0, -3, 0, -2, 0],
                      rotate: [0, 5, -5, 0]
                    },
                    'MARKETPLACE ACCOUNTS': {
                      scale: [1, 1.15, 1.05, 1.15, 1],
                      rotate: [0, 10, -10, 0]
                    },
                    'VIRTUAL BANKS': {
                      x: [0, -3, 3, -2, 2, 0],
                      rotate: [0, -5, 5, 0]
                    },
                    'CRYPTO WALLET & EXCHANGE': {
                      rotate: [0, 15, -15, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    },
                    'TRADING ACCOUNTS': {
                      y: [0, -4, 0],
                      x: [0, 2, -2, 0],
                      rotate: [0, 5, -5, 0]
                    },
                    'BETTING ACCOUNTS': {
                      scale: [1, 1.2, 1.1, 1.2, 1],
                      y: [0, -2, 0]
                    },
                    'PAYMENT PROCESSORS': {
                      rotate: [0, -10, 10, -5, 0],
                      x: [0, 3, -3, 0]
                    },
                    'E-COMMERCE PLATFORMS': {
                      scale: [1, 1.15, 1],
                      rotate: [0, 8, -8, 0]
                    },
                    'FINTECH SERVICES': {
                      y: [0, -3, 3, 0],
                      rotate: [0, 6, -6, 0]
                    },
                    'COMPLIANCE & KYC': {
                      rotate: [0, -12, 12, -6, 6, 0],
                      scale: [1, 1.08, 1]
                    }
                  }
                  
                  return (
                    <motion.div
                      key={family.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: familyIndex * 0.08 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer border-border/50 transition-all group relative overflow-hidden h-full"
                        style={{
                          transitionDuration: `${hoverDuration}s`
                        }}
                        onMouseEnter={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = hoverBorderColor
                          card.style.backgroundColor = hoverColor
                          card.style.boxShadow = `0 25px 70px -20px ${hoverShadowColor}, 0 0 40px ${hoverShadowColor}`
                        }}
                        onMouseLeave={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = ''
                          card.style.backgroundColor = ''
                          card.style.boxShadow = ''
                        }}
                        onClick={() => handleFamilySelect(family)}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3 mb-3">
                            {IconComponent && (
                              <motion.div 
                                className="p-2.5 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 shrink-0"
                                whileHover={iconAnimations[selectedCategory]}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                              >
                                <IconComponent size={20} className="text-accent" />
                              </motion.div>
                            )}
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg group-hover:text-accent transition-colors mb-1" style={{ transitionDuration: `${hoverDuration}s` }}>
                                {family.name}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {family.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && selectedFamily && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto px-4"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentStep(2)
                    setSelectedFamily(null)
                  }}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Service Families
                </Button>
              </div>

              <h3 className="text-2xl font-semibold mb-2 text-center">{selectedFamily.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Select Service Variant</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVariants.map((variant, variantIndex) => {
                  const categoryData = masterCategories.find(c => c.name === selectedCategory)
                  const hoverColor = categoryData?.hoverColor || 'oklch(0.18 0.05 245)'
                  const hoverBorderColor = categoryData?.hoverBorderColor || 'oklch(0.60 0.22 245 / 0.6)'
                  const hoverShadowColor = categoryData?.hoverShadowColor || 'oklch(0.60 0.22 245 / 0.3)'
                  const hoverDuration = categoryData?.hoverDuration || 0.3
                  
                  return (
                    <motion.div
                      key={variant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: variantIndex * 0.08 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer border-border/50 transition-all group relative overflow-hidden h-full"
                        style={{
                          transitionDuration: `${hoverDuration}s`
                        }}
                        onMouseEnter={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = hoverBorderColor
                          card.style.backgroundColor = hoverColor
                          card.style.boxShadow = `0 25px 70px -20px ${hoverShadowColor}, 0 0 40px ${hoverShadowColor}`
                        }}
                        onMouseLeave={(e) => {
                          const card = e.currentTarget
                          card.style.borderColor = ''
                          card.style.backgroundColor = ''
                          card.style.boxShadow = ''
                        }}
                        onClick={() => handleVariantSelect(variant)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <CardTitle className="text-lg group-hover:text-accent transition-colors" style={{ transitionDuration: `${hoverDuration}s` }}>
                              {variant.name}
                            </CardTitle>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px] whitespace-nowrap">
                                <Crown size={12} weight="fill" className="mr-1" />
                                Premium
                              </Badge>
                            </motion.div>
                          </div>
                          <CardDescription className="text-sm mb-3">
                            {variant.scope}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Separator className="opacity-30 group-hover:opacity-50 transition-opacity" style={{ transitionDuration: `${hoverDuration}s` }} />
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock size={14} />
                              <span className="text-xs">{variant.deliverySpeed}</span>
                            </div>
                            <motion.span 
                              className="text-lg font-bold group-hover:text-accent transition-colors"
                              style={{ transitionDuration: `${hoverDuration}s` }}
                              whileHover={{ scale: 1.05 }}
                            >
                              From ${variant.priceFrom}
                            </motion.span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && selectedVariant && selectedFamily && selectedCategory && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto px-4"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentStep(3)
                    setSelectedVariant(null)
                  }}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Variants
                </Button>
              </div>

              <Card className="border-border/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Service Summary</CardTitle>
                  <CardDescription>Review your selection before proceeding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span className="text-sm font-medium text-right">{selectedCategory}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Service Family</span>
                      <span className="text-sm font-medium text-right">{selectedFamily.name}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Variant</span>
                      <span className="text-sm font-medium text-right">{selectedVariant.name}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Delivery Speed</span>
                      <span className="text-sm font-medium text-right">{selectedVariant.deliverySpeed}</span>
                    </div>
                    <div className="flex justify-between items-start p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Price Range</span>
                      <span className="text-lg font-bold text-right">From ${selectedVariant.priceFrom}</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      onClick={handleRequestEnablement}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Request Enablement
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto px-4"
            >
              <div className="mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(4)}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Summary
                </Button>
              </div>

              <Card className="border-amber-500/30 bg-card">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <Crown size={32} weight="fill" className="text-amber-400" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Intake Form</CardTitle>
                  <CardDescription>This gate is mandatory. No bypass allowed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="intended-use" className="text-sm font-medium flex items-center gap-2">
                      <Briefcase size={16} className="text-accent" />
                      Intended Use *
                    </Label>
                    <Textarea
                      id="intended-use"
                      placeholder="Describe your business use case"
                      value={intendedUse}
                      onChange={(e) => setIntendedUse(e.target.value)}
                      className="min-h-[100px] resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction" className="text-sm font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      Jurisdiction / Country *
                    </Label>
                    <Select value={jurisdiction} onValueChange={setJurisdiction} required>
                      <SelectTrigger id="jurisdiction">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="eea">European Economic Area</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="uae">United Arab Emirates</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCategory === 'COMPANY FORMATION' && (
                    <div className="space-y-2">
                      <Label htmlFor="entity-type" className="text-sm font-medium flex items-center gap-2">
                        <Buildings size={16} className="text-accent" />
                        Entity Type
                      </Label>
                      <Select value={entityType} onValueChange={setEntityType}>
                        <SelectTrigger id="entity-type">
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ltd">Limited Company (LTD)</SelectItem>
                          <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                          <SelectItem value="corp">Corporation (C-Corp)</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="sole">Sole Proprietorship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-sm font-medium flex items-center gap-2">
                      <Lightning size={16} className="text-accent" />
                      Urgency *
                    </Label>
                    <Select value={urgency} onValueChange={setUrgency} required>
                      <SelectTrigger id="urgency">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium">
                      Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional information"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  <Separator className="my-6" />

                  <Button
                    size="lg"
                    onClick={handleSubmitIntake}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Submit for Review
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 6 && requestId && selectedVariant && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-4"
            >
              <Card className="border-accent/30 bg-card">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-accent/10 border-2 border-accent/30">
                      <CheckCircle size={48} weight="fill" className="text-accent" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Request Under Review</CardTitle>
                  <CardDescription>Your request has been submitted successfully</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border border-border/30">
                      <span className="text-sm text-muted-foreground">Request ID</span>
                      <code className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded border border-accent/20">{requestId}</code>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border border-border/30">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">UNDER REVIEW</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border border-border/30">
                      <span className="text-sm text-muted-foreground">Estimated Timeline</span>
                      <span className="text-sm font-medium">{selectedVariant.deliverySpeed}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle size={18} weight="fill" className="text-accent" />
                      Next Steps
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Internal operator has been assigned to your request</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>You will be contacted via WhatsApp within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Final pricing will be calculated after validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Payment and enablement details will follow approval</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      onClick={handleReset}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Browse More Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
