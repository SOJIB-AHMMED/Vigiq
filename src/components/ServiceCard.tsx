import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, WhatsappLogo, Users, CheckCircle, Clock } from '@phosphor-icons/react'
import { ParticleBackground } from '@/components/ParticleBackground'
import { useCounter } from '@/hooks/use-counter'

type ServiceCardProps = {
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
  onViewDetails: (id: string, currentDomain: string) => void
  onContactWhatsApp: (whatsappNumber: string, title: string) => void
  isLoading?: boolean
  delay?: number
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

type Particle = {
  id: number
  x: number
  y: number
  life: number
}

export function ServiceCard({
  domain,
  title,
  description,
  icon: IconComponent,
  services,
  color,
  whatsappNumber,
  hoverColor,
  hoverBorderColor,
  hoverShadowColor,
  hoverDuration,
  onViewDetails,
  onContactWhatsApp,
  isLoading = false,
  delay = 0,
  additionalDetails,
  stats
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const cardRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const activeUsersCounter = useCounter({ 
    end: stats?.activeUsers || 0, 
    duration: 2500, 
    separator: ',',
    suffix: '+',
    delay: delay * 1000 + 200
  })
  
  const completedOrdersCounter = useCounter({ 
    end: stats?.completedOrders || 0, 
    duration: 2500, 
    separator: ',',
    suffix: '+',
    delay: delay * 1000 + 400
  })
  
  const deliveryHoursCounter = useCounter({ 
    end: stats?.avgDeliveryHours || 0, 
    duration: 2000,
    decimals: 0,
    delay: delay * 1000 + 600
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, life: p.life - 0.016 }))
          .filter(p => p.life > 0)
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top
    
    mouseX.set(relativeX)
    mouseY.set(relativeY)

    if (Math.random() > 0.75) {
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: relativeX,
        y: relativeY,
        life: 1.5
      }
      setParticles(prev => [...prev, newParticle])
    }
  }

  const handleMouseLeave = () => {
    setParticles([])
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <Card className="h-full border-border/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-3 mb-3">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.3, type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.97 }}
      className="perspective-1000"
      style={{ perspective: '1500px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: hoverBorderColor,
                boxShadow: `0 0 15px ${hoverBorderColor}, 0 0 30px ${hoverBorderColor}`,
                zIndex: 50
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1.2, 0.8, 0],
                opacity: [1, 0.9, 0.5, 0],
                x: [(Math.random() - 0.5) * 60],
                y: [(Math.random() - 0.5) * 60],
                rotate: [0, 180, 360]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: particle.life * 1.2, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Front of card */}
        <Card 
          className="absolute inset-0 h-full border-border/50 transition-all group overflow-hidden cursor-pointer"
          style={{
            transitionDuration: `${hoverDuration}s`,
            backfaceVisibility: 'hidden'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget
            card.style.borderColor = hoverBorderColor
            card.style.backgroundColor = hoverColor
            card.style.boxShadow = `0 20px 60px -15px ${hoverShadowColor}, 0 0 40px ${hoverShadowColor}, inset 0 0 60px ${hoverShadowColor}20`
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget
            card.style.borderColor = ''
            card.style.backgroundColor = ''
            card.style.boxShadow = ''
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <ParticleBackground color={hoverBorderColor} particleCount={30} speed={0.2} />
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <motion.div 
                className={`p-3 rounded-xl bg-gradient-to-br ${color} border border-accent/10`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut'
                  }}
                >
                  <IconComponent size={28} className="text-accent" />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="outline" className="text-[10px] border-accent/30 text-accent shrink-0">
                  {domain}
                </Badge>
              </motion.div>
            </div>
            <CardTitle className="text-lg group-hover:text-accent transition-colors" style={{ transitionDuration: `${hoverDuration}s` }}>
              {title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {stats && (stats.activeUsers || stats.completedOrders || stats.avgDeliveryHours) ? (
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-accent/10">
                {stats.activeUsers ? (
                  <motion.div 
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.2 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Users size={16} className="text-accent" weight="bold" />
                    <span 
                      ref={activeUsersCounter.ref as any}
                      className="text-lg font-bold text-accent tabular-nums"
                    >
                      {activeUsersCounter.value}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide">Users</span>
                  </motion.div>
                ) : null}
                {stats.completedOrders ? (
                  <motion.div 
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <CheckCircle size={16} className="text-success" weight="bold" />
                    <span 
                      ref={completedOrdersCounter.ref as any}
                      className="text-lg font-bold text-success tabular-nums"
                    >
                      {completedOrdersCounter.value}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide">Orders</span>
                  </motion.div>
                ) : null}
                {stats.avgDeliveryHours ? (
                  <motion.div 
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.6 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Clock size={16} className="text-warning" weight="bold" />
                    <span 
                      ref={deliveryHoursCounter.ref as any}
                      className="text-lg font-bold text-warning tabular-nums"
                    >
                      {deliveryHoursCounter.value}h
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wide">Delivery</span>
                  </motion.div>
                ) : null}
              </div>
            ) : null}
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.span 
                    className="text-accent mt-0.5 shrink-0"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: idx * 0.2,
                      ease: 'easeInOut'
                    }}
                  >
                    •
                  </motion.span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors" style={{ transitionDuration: `${hoverDuration}s` }}>
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all gap-2"
                  style={{ transitionDuration: `${hoverDuration}s` }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewDetails(domain.split('.')[0].toLowerCase(), domain)
                  }}
                >
                  View Details
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-accent/30 hover:bg-accent/10 hover:border-accent transition-all gap-2"
                  style={{ transitionDuration: `${hoverDuration}s` }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onContactWhatsApp(whatsappNumber, title)
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <WhatsappLogo size={14} weight="fill" />
                  </motion.div>
                  WhatsApp
                </Button>
              </motion.div>
            </div>
          </CardContent>
          
          <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50 z-10">
            Click to flip
          </div>
        </Card>

        {/* Back of card */}
        {additionalDetails && (
          <Card 
            className="absolute inset-0 h-full border-border/50 transition-all overflow-hidden cursor-pointer"
            style={{
              transitionDuration: `${hoverDuration}s`,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget
              card.style.borderColor = hoverBorderColor
              card.style.backgroundColor = hoverColor
              card.style.boxShadow = `0 20px 60px -15px ${hoverShadowColor}, 0 0 40px ${hoverShadowColor}, inset 0 0 60px ${hoverShadowColor}20`
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget
              card.style.borderColor = ''
              card.style.backgroundColor = ''
              card.style.boxShadow = ''
            }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <ParticleBackground color={hoverBorderColor} particleCount={30} speed={0.2} />
            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between gap-3 mb-3">
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${color} border border-accent/10`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut'
                    }}
                  >
                    <IconComponent size={28} className="text-accent" />
                  </motion.div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="outline" className="text-[10px] border-accent/30 text-accent shrink-0">
                    Details
                  </Badge>
                </motion.div>
              </div>
              <CardTitle className="text-lg text-accent">
                {title}
              </CardTitle>
              <CardDescription className="text-sm">
                Additional Information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-3">
                <motion.div 
                  className="flex justify-between items-center p-2 rounded-lg bg-muted/20"
                  whileHover={{ scale: 1.02, x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs text-muted-foreground">Pricing</span>
                  <span className="text-sm font-bold text-accent">{additionalDetails.pricing}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center p-2 rounded-lg bg-muted/20"
                  whileHover={{ scale: 1.02, x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs text-muted-foreground">Delivery</span>
                  <span className="text-sm font-medium">{additionalDetails.deliveryTime}</span>
                </motion.div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-accent">Key Features</h4>
                <ul className="space-y-1.5">
                  {additionalDetails.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-2 text-xs"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <motion.span 
                        className="text-accent mt-0.5 shrink-0"
                        animate={{ 
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          delay: idx * 0.2,
                          ease: 'easeInOut'
                        }}
                      >
                        ✓
                      </motion.span>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      onContactWhatsApp(whatsappNumber, title)
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <WhatsappLogo size={14} weight="fill" />
                    </motion.div>
                    Contact Now
                  </Button>
                </motion.div>
              </div>
            </CardContent>

            <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50 z-10">
              Click to flip back
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  )
}
