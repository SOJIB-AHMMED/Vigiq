import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Bank, CreditCard, TrendUp, ChartLine, Storefront, CurrencyCircleDollar, Globe, Check, X, ArrowRight, Scales } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type ComparisonService = {
  id: string
  domain: string
  title: string
  icon: React.ComponentType<any>
  color: string
  pricing: {
    setup: string
    monthly?: string
  }
  features: {
    name: string
    included: boolean
  }[]
  deliveryTime: string
  support: string
  region: string[]
}

const services: ComparisonService[] = [
  {
    id: 'wise',
    domain: 'WISE.VIFIQ.COM',
    title: 'Wise Banking',
    icon: Bank,
    color: 'from-emerald-500/20 to-emerald-500/5',
    pricing: {
      setup: '$300-450',
      monthly: 'Pay as you go'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: true },
      { name: 'Debit card', included: true },
      { name: 'Crypto trading', included: false },
      { name: 'Stock trading', included: false },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '24-48 hours',
    support: '24/7 Email & Chat',
    region: ['UK', 'EU', 'US', 'Global']
  },
  {
    id: 'revolut',
    domain: 'REVOLUT.VIFIQ.COM',
    title: 'Revolut Ecosystem',
    icon: CreditCard,
    color: 'from-blue-500/20 to-blue-500/5',
    pricing: {
      setup: '$320-580',
      monthly: 'From $0'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: true },
      { name: 'Debit card', included: true },
      { name: 'Crypto trading', included: true },
      { name: 'Stock trading', included: true },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '24-48 hours',
    support: '24/7 Chat & Phone',
    region: ['UK', 'EU', 'Global']
  },
  {
    id: 'betting',
    domain: 'BETTING.VIFIQ.COM',
    title: 'Betting Platforms',
    icon: TrendUp,
    color: 'from-amber-500/20 to-amber-500/5',
    pricing: {
      setup: '$420-680'
    },
    features: [
      { name: 'Multi-currency accounts', included: false },
      { name: 'International transfers', included: false },
      { name: 'Local bank details', included: false },
      { name: 'Debit card', included: false },
      { name: 'Crypto trading', included: false },
      { name: 'Stock trading', included: false },
      { name: 'Business accounts', included: false },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '3-7 business days',
    support: 'Email & WhatsApp',
    region: ['UK', 'EU']
  },
  {
    id: 'trading',
    domain: 'TRADING.VIFIQ.COM',
    title: 'Trading Infrastructure',
    icon: ChartLine,
    color: 'from-purple-500/20 to-purple-500/5',
    pricing: {
      setup: '$380-720'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: false },
      { name: 'Debit card', included: false },
      { name: 'Crypto trading', included: true },
      { name: 'Stock trading', included: true },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '3-10 business days',
    support: '24/7 Trading Desk',
    region: ['Global']
  },
  {
    id: 'business',
    domain: 'BUSINESS.VIFIQ.COM',
    title: 'Business Solutions',
    icon: Storefront,
    color: 'from-cyan-500/20 to-cyan-500/5',
    pricing: {
      setup: '$390-650'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: true },
      { name: 'Debit card', included: true },
      { name: 'Crypto trading', included: false },
      { name: 'Stock trading', included: false },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '5-14 business days',
    support: 'Dedicated Manager',
    region: ['UK', 'EU', 'US']
  },
  {
    id: 'crypto',
    domain: 'CRYPTO.VIFIQ.COM',
    title: 'Crypto Access',
    icon: CurrencyCircleDollar,
    color: 'from-orange-500/20 to-orange-500/5',
    pricing: {
      setup: '$250-900'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: false },
      { name: 'Debit card', included: false },
      { name: 'Crypto trading', included: true },
      { name: 'Stock trading', included: false },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: true }
    ],
    deliveryTime: '24-72 hours',
    support: '24/7 Crypto Support',
    region: ['Global']
  },
  {
    id: 'regions',
    domain: 'REGIONS.VIFIQ.COM',
    title: 'Regional Banking',
    icon: Globe,
    color: 'from-pink-500/20 to-pink-500/5',
    pricing: {
      setup: '$300-650'
    },
    features: [
      { name: 'Multi-currency accounts', included: true },
      { name: 'International transfers', included: true },
      { name: 'Local bank details', included: true },
      { name: 'Debit card', included: true },
      { name: 'Crypto trading', included: false },
      { name: 'Stock trading', included: false },
      { name: 'Business accounts', included: true },
      { name: 'API integration', included: false }
    ],
    deliveryTime: '3-7 business days',
    support: 'Regional Support',
    region: ['UK', 'EU', 'Asia']
  }
]

export function ServiceComparison() {
  const navigate = useNavigate()
  const [selectedServices, setSelectedServices] = useState<string[]>(['wise', 'revolut'])

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id))
      } else {
        toast.error('At least one service must be selected')
      }
    } else {
      if (selectedServices.length < 4) {
        setSelectedServices([...selectedServices, id])
      } else {
        toast.error('Maximum 4 services can be compared')
      }
    }
  }

  const selectedServiceData = services.filter(s => selectedServices.includes(s.id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Scales size={32} className="text-accent" weight="bold" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold">Service Comparison</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare features, pricing, and delivery times across our service domains to find the perfect solution for your needs
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Select Services to Compare</CardTitle>
          <CardDescription>Choose 2-4 services to see a detailed comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {services.map((service) => {
              const IconComponent = service.icon
              const isSelected = selectedServices.includes(service.id)
              
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border/50 hover:border-accent/30 hover:bg-accent/5'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${service.color} border border-accent/10`}>
                      <IconComponent size={20} className="text-accent" />
                    </div>
                    <span className="text-xs font-medium line-clamp-2">{service.title}</span>
                    <div className="mt-1">
                      <Checkbox checked={isSelected} className="pointer-events-none" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {selectedServiceData.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <Card className="border-border/50 overflow-x-auto">
              <CardContent className="p-0">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-semibold sticky left-0 bg-card z-10">Feature</th>
                      {selectedServiceData.map((service) => {
                        const IconComponent = service.icon
                        return (
                          <th key={service.id} className="p-4 min-w-[200px]">
                            <div className="flex flex-col items-center gap-3">
                              <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} border border-accent/10`}>
                                <IconComponent size={24} className="text-accent" />
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-sm mb-1">{service.title}</div>
                                <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">
                                  {service.domain}
                                </Badge>
                              </div>
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <td className="p-4 font-medium sticky left-0 bg-muted/30 z-10">Setup Price</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4 text-center">
                          <span className="font-semibold text-accent">{service.pricing.setup}</span>
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="border-b border-border/50">
                      <td className="p-4 font-medium sticky left-0 bg-card z-10">Monthly Fee</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4 text-center text-sm text-muted-foreground">
                          {service.pricing.monthly || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border/50 bg-muted/30">
                      <td className="p-4 font-medium sticky left-0 bg-muted/30 z-10">Delivery Time</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4 text-center text-sm">
                          {service.deliveryTime}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border/50">
                      <td className="p-4 font-medium sticky left-0 bg-card z-10">Support</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4 text-center text-sm text-muted-foreground">
                          {service.support}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border/50 bg-muted/30">
                      <td className="p-4 font-medium sticky left-0 bg-muted/30 z-10">Regions</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4 text-center text-sm">
                          {service.region.join(', ')}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border/50 bg-accent/5">
                      <td colSpan={selectedServiceData.length + 1} className="p-3 font-semibold text-sm">
                        Features
                      </td>
                    </tr>

                    {selectedServiceData[0]?.features.map((_, featureIndex) => (
                      <tr key={featureIndex} className={`border-b border-border/50 ${featureIndex % 2 === 0 ? 'bg-muted/30' : ''}`}>
                        <td className={`p-4 font-medium text-sm sticky left-0 ${featureIndex % 2 === 0 ? 'bg-muted/30' : 'bg-card'} z-10`}>
                          {selectedServiceData[0].features[featureIndex].name}
                        </td>
                        {selectedServiceData.map((service) => (
                          <td key={service.id} className="p-4 text-center">
                            {service.features[featureIndex].included ? (
                              <Check size={20} className="text-accent mx-auto" weight="bold" />
                            ) : (
                              <X size={20} className="text-muted-foreground/40 mx-auto" weight="bold" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    <tr className="bg-accent/5">
                      <td className="p-4 font-medium sticky left-0 bg-accent/5 z-10">Action</td>
                      {selectedServiceData.map((service) => (
                        <td key={service.id} className="p-4">
                          <Button
                            size="sm"
                            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={() => navigate(`/service/${service.id}`)}
                          >
                            View Details
                            <ArrowRight size={14} className="ml-1" />
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
