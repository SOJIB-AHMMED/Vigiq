import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Calculator, ShoppingCart, Lightning, CheckCircle, Minus } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type ServiceItem = {
  id: string
  name: string
  category: string
  price: number
  description: string
  popular?: boolean
}

const services: ServiceItem[] = [
  { id: 'uk-company', name: 'UK Company Formation', category: 'Company Formation', price: 390, description: 'Legal entity setup', popular: true },
  { id: 'usa-company', name: 'USA LLC Formation', category: 'Company Formation', price: 450, description: 'US business entity' },
  { id: 'eu-company', name: 'EU Company Formation', category: 'Company Formation', price: 650, description: 'European entity' },
  
  { id: 'business-bank', name: 'Business Bank Account', category: 'Banking', price: 450, description: 'Operational banking', popular: true },
  { id: 'stripe-bank', name: 'Stripe-Ready Bank', category: 'Banking', price: 650, description: 'Payment-ready banking' },
  
  { id: 'amazon-seller', name: 'Amazon Seller Account', category: 'Marketplaces', price: 455, description: 'Professional seller', popular: true },
  { id: 'ebay-seller', name: 'eBay Seller Account', category: 'Marketplaces', price: 320, description: 'Verified seller' },
  { id: 'etsy-shop', name: 'Etsy Shop Setup', category: 'Marketplaces', price: 295, description: 'Store + verification' },
  { id: 'walmart-seller', name: 'Walmart Seller', category: 'Marketplaces', price: 520, description: 'Marketplace access' },
  
  { id: 'wise-account', name: 'Wise Account', category: 'Virtual Banking', price: 300, description: 'Multi-currency', popular: true },
  { id: 'revolut-account', name: 'Revolut Account', category: 'Virtual Banking', price: 350, description: 'Digital banking' },
  { id: 'n26-account', name: 'N26 Account', category: 'Virtual Banking', price: 380, description: 'European digital bank' },
  
  { id: 'binance-account', name: 'Binance Account', category: 'Crypto', price: 450, description: 'Exchange access' },
  { id: 'coinbase-account', name: 'Coinbase Account', category: 'Crypto', price: 420, description: 'US crypto exchange' },
  { id: 'corporate-wallet', name: 'Corporate Crypto Wallet', category: 'Crypto', price: 250, description: 'Secure wallet' },
  
  { id: 'ibkr-account', name: 'IBKR Account', category: 'Trading', price: 700, description: 'Institutional trading' },
  { id: 'trading-platform', name: 'Trading Platform', category: 'Trading', price: 350, description: 'Broker access' },
  
  { id: 'bet365-account', name: 'Bet365 Account', category: 'Betting', price: 450, description: 'High-limit bookmaker' },
  { id: 'betfair-account', name: 'Betfair Account', category: 'Betting', price: 480, description: 'Betting exchange' }
]



export function PricingCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))]

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const clearAll = () => {
    setSelectedServices([])
    toast.info('Calculator cleared')
  }

  const calculateTotal = () => {
    const selectedItems = services.filter(s => selectedServices.includes(s.id))
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0)
    const count = selectedItems.length
    const total = subtotal

    return { subtotal, total, count }
  }

  const { subtotal, total, count } = calculateTotal()

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory)

  const handleRequestQuote = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service')
      return
    }

    const selectedItems = services.filter(s => selectedServices.includes(s.id))
    const itemsList = selectedItems.map(s => `- ${s.name} ($${s.price})`).join('\n')
    
    toast.success('Quote prepared', {
      description: `${count} service${count !== 1 ? 's' : ''} • Total: $${total.toLocaleString()}`
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="pricing-calculator"
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
            <Calculator size={32} className="text-accent" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold">Service Pricing Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select multiple services to calculate total pricing for your business needs.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
          >
            {cat === 'all' ? 'All Services' : cat}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Services</h3>
            {selectedServices.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Minus size={16} className="mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {filteredServices.map(service => {
              const isSelected = selectedServices.includes(service.id)
              return (
                <motion.div
                  key={service.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10' 
                        : 'border-border/50 hover:border-accent/30'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => toggleService(service.id)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-medium text-sm leading-tight">{service.name}</h4>
                            {service.popular && (
                              <Badge variant="outline" className="text-xs border-accent/30 text-accent shrink-0">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-muted-foreground">{service.category}</span>
                            <span className="text-base font-semibold text-accent">${service.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Card className="border-accent/30 shadow-xl shadow-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart size={20} className="text-accent" />
                  Your Bundle
                </CardTitle>
                <CardDescription>
                  {count === 0 ? 'No services selected' : `${count} service${count !== 1 ? 's' : ''} selected`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {selectedServices.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {services.filter(s => selectedServices.includes(s.id)).map(service => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground/80 truncate">{service.name}</span>
                            <span className="font-mono text-accent shrink-0">${service.price}</span>
                          </motion.div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-mono">${subtotal.toLocaleString()}</span>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-2xl font-bold text-accent font-mono">${total.toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                        onClick={handleRequestQuote}
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Request Quote
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-muted-foreground"
                    >
                      <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Select services to see pricing</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {count === 0 && (
              <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-transparent">
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Lightning size={16} className="text-accent" />
                    Service Calculator
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Select services to calculate total pricing for your requirements.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
