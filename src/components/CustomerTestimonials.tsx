import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quotes, CaretLeft, CaretRight, Bank, CreditCard, TrendUp, ChartLine, Storefront, CurrencyCircleDollar, Globe } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Review = {
  id: string
  author: {
    name: string
    initials: string
    avatar?: string
    jurisdiction: string
    verified: boolean
  }
  serviceDomain: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
}

const reviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'James Mitchell',
      initials: 'JM',
      jurisdiction: 'UK',
      verified: true
    },
    serviceDomain: 'wise',
    rating: 5,
    title: 'Outstanding multi-currency solution',
    content: 'The Wise account setup was incredibly smooth. Within 48 hours, I had full access to multi-currency banking with local details for UK, EU, and US. Perfect for my international business operations.',
    date: '2024-01-15',
    helpful: 24
  },
  {
    id: '2',
    author: {
      name: 'Sofia Rodriguez',
      initials: 'SR',
      jurisdiction: 'EU',
      verified: true
    },
    serviceDomain: 'revolut',
    rating: 5,
    title: 'Best digital banking experience',
    content: 'Revolut Metal tier delivered everything promised. The crypto trading integration, instant transfers, and premium support made it worth every penny. Highly recommend for active traders.',
    date: '2024-01-12',
    helpful: 31
  },
  {
    id: '3',
    author: {
      name: 'Marcus Chen',
      initials: 'MC',
      jurisdiction: 'International',
      verified: true
    },
    serviceDomain: 'crypto',
    rating: 5,
    title: 'Seamless crypto exchange access',
    content: 'Got my Binance verified account in under 72 hours. The tier 2 verification was already completed, and I could start trading immediately. Excellent service for professional traders.',
    date: '2024-01-10',
    helpful: 18
  },
  {
    id: '4',
    author: {
      name: 'Emily Thompson',
      initials: 'ET',
      jurisdiction: 'UK',
      verified: true
    },
    serviceDomain: 'business',
    rating: 5,
    title: 'Complete business infrastructure',
    content: 'The UK LTD formation plus business banking package saved me weeks of administrative work. Everything was handled professionally, and I had a fully operational company within 10 days.',
    date: '2024-01-08',
    helpful: 27
  },
  {
    id: '5',
    author: {
      name: 'David Kumar',
      initials: 'DK',
      jurisdiction: 'EU',
      verified: true
    },
    serviceDomain: 'trading',
    rating: 4,
    title: 'Professional trading platform access',
    content: 'IBKR verified account setup was more complex than expected, but the final result was excellent. High-leverage options and institutional-grade execution are exactly what I needed.',
    date: '2024-01-05',
    helpful: 15
  },
  {
    id: '6',
    author: {
      name: 'Rachel Foster',
      initials: 'RF',
      jurisdiction: 'UK',
      verified: true
    },
    serviceDomain: 'betting',
    rating: 5,
    title: 'High-limit betting accounts delivered',
    content: 'Bet365 UK account with verified status and high limits from day one. No restrictions, no delays. Perfect for professional betting operations.',
    date: '2024-01-03',
    helpful: 22
  },
  {
    id: '7',
    author: {
      name: 'Tom Anderson',
      initials: 'TA',
      jurisdiction: 'US',
      verified: true
    },
    serviceDomain: 'wise',
    rating: 5,
    title: 'Ideal for freelancers',
    content: 'As a freelancer working with international clients, Wise has been a game-changer. Low fees, fast transfers, and the ability to hold multiple currencies make invoicing seamless.',
    date: '2024-01-01',
    helpful: 19
  },
  {
    id: '8',
    author: {
      name: 'Isabella Rossi',
      initials: 'IR',
      jurisdiction: 'EU',
      verified: true
    },
    serviceDomain: 'regions',
    rating: 4,
    title: 'Great regional banking options',
    content: 'The EEA digital banking solution provided exactly what I needed for cross-border operations. Setup took about 5 days, which was reasonable given the compliance requirements.',
    date: '2023-12-28',
    helpful: 13
  },
  {
    id: '9',
    author: {
      name: 'Oliver Schmidt',
      initials: 'OS',
      jurisdiction: 'EU',
      verified: true
    },
    serviceDomain: 'crypto',
    rating: 5,
    title: 'Comprehensive crypto stack',
    content: 'The Crypto Stack bundle (wallet + exchange) was excellent value. Both Binance and secure wallet setup completed within 3 days. Professional onboarding process.',
    date: '2023-12-25',
    helpful: 25
  },
  {
    id: '10',
    author: {
      name: 'Amelia Brooks',
      initials: 'AB',
      jurisdiction: 'UK',
      verified: true
    },
    serviceDomain: 'business',
    rating: 5,
    title: 'Stripe integration made easy',
    content: 'Business bank account with Stripe-ready configuration delivered in 7 days. Payment processing is now seamless, and customer support has been outstanding throughout.',
    date: '2023-12-22',
    helpful: 20
  }
]

const serviceDomainConfig: Record<string, { label: string; icon: React.ComponentType<any>; color: string }> = {
  wise: { label: 'Wise Banking', icon: Bank, color: 'text-emerald-400' },
  revolut: { label: 'Revolut Ecosystem', icon: CreditCard, color: 'text-blue-400' },
  betting: { label: 'Betting Platforms', icon: TrendUp, color: 'text-amber-400' },
  trading: { label: 'Trading Infrastructure', icon: ChartLine, color: 'text-purple-400' },
  business: { label: 'Business Solutions', icon: Storefront, color: 'text-cyan-400' },
  crypto: { label: 'Crypto Access', icon: CurrencyCircleDollar, color: 'text-orange-400' },
  regions: { label: 'Regional Banking', icon: Globe, color: 'text-pink-400' }
}

export function CustomerTestimonials() {
  const [filter, setFilter] = useState<string>('ALL')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredReviews = filter === 'ALL' 
    ? reviews 
    : reviews.filter(r => r.serviceDomain === filter)

  const currentReview = filteredReviews[currentIndex]

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length)
  }

  const averageRating = filteredReviews.reduce((acc, r) => acc + r.rating, 0) / filteredReviews.length

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const renderStars = (rating: number, size: number = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            weight="fill"
            className={star <= rating ? 'text-accent' : 'text-muted-foreground/30'}
          />
        ))}
      </div>
    )
  }

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
          <Quotes size={32} className="text-accent" weight="fill" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold">Customer Reviews</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real feedback from verified customers across our service domains
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">{averageRating.toFixed(1)}</div>
            <div className="flex gap-0.5 mt-1">
              {renderStars(Math.round(averageRating), 14)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{filteredReviews.length} reviews</div>
          </div>
        </div>

        <Select value={filter} onValueChange={(value) => {
          setFilter(value)
          setCurrentIndex(0)
        }}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Services</SelectItem>
            {Object.entries(serviceDomainConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>{config.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {currentReview && (
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12 border-2 border-accent/20">
                        {currentReview.author.avatar ? (
                          <AvatarImage src={currentReview.author.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                          {currentReview.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{currentReview.author.name}</h3>
                          {currentReview.author.verified && (
                            <Badge variant="outline" className="border-accent/30 text-accent text-[10px]">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{currentReview.author.jurisdiction}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      {renderStars(currentReview.rating, 18)}
                      <span className="text-xs text-muted-foreground">{formatDate(currentReview.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {(() => {
                      const config = serviceDomainConfig[currentReview.serviceDomain]
                      const IconComponent = config.icon
                      return (
                        <>
                          <IconComponent size={16} className={config.color} />
                          <span className="text-sm text-muted-foreground">{config.label}</span>
                        </>
                      )
                    })()}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{currentReview.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{currentReview.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      {currentReview.helpful} people found this helpful
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevReview}
                        disabled={filteredReviews.length <= 1}
                      >
                        <CaretLeft size={16} />
                      </Button>
                      
                      <span className="text-sm text-muted-foreground px-2">
                        {currentIndex + 1} / {filteredReviews.length}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextReview}
                        disabled={filteredReviews.length <= 1}
                      >
                        <CaretRight size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.slice(0, 6).map((review, index) => {
          const config = serviceDomainConfig[review.serviceDomain]
          const IconComponent = config.icon
          
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="h-full border-border/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
                onClick={() => setCurrentIndex(filteredReviews.indexOf(review))}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border border-accent/20">
                        {review.author.avatar ? (
                          <AvatarImage src={review.author.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-accent/10 text-accent text-xs font-semibold">
                          {review.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{review.author.name}</div>
                        <div className="text-xs text-muted-foreground">{review.author.jurisdiction}</div>
                      </div>
                    </div>
                    {renderStars(review.rating, 12)}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <IconComponent size={12} className={config.color} />
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <h4 className="font-semibold text-sm mb-2 line-clamp-1">{review.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {review.content}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                    <span className="text-xs text-muted-foreground">{review.helpful} helpful</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
