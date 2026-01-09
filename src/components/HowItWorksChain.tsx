import { motion } from 'framer-motion'
import { UserCircle, Vault, ShieldCheck, CreditCard, Eye, CheckCircle, Network, Circle, ArrowRight } from '@phosphor-icons/react'

const steps = [
  { 
    num: 1, 
    title: 'Register', 
    desc: 'Identity verification', 
    icon: UserCircle,
    endpoint: 'AUTH',
    color: 'accent'
  },
  { 
    num: 2, 
    title: 'Select', 
    desc: 'Choose module', 
    icon: Vault,
    endpoint: 'CATALOG',
    color: 'success'
  },
  { 
    num: 3, 
    title: 'Validate', 
    desc: 'Team review', 
    icon: ShieldCheck,
    endpoint: 'VERIFY',
    color: 'warning'
  },
  { 
    num: 4, 
    title: 'Payment', 
    desc: 'Secure checkout', 
    icon: CreditCard,
    endpoint: 'PAYMENT',
    color: 'destructive'
  },
  { 
    num: 5, 
    title: 'Track', 
    desc: 'Monitor status', 
    icon: Eye,
    endpoint: 'STATUS',
    color: 'accent'
  },
  { 
    num: 6, 
    title: 'Delivery', 
    desc: 'Credentials sent', 
    icon: CheckCircle,
    endpoint: 'COMPLETE',
    color: 'success'
  }
]

const colorMap = {
  accent: {
    bg: 'oklch(0.75 0.18 195)',
    bgTransparent: 'oklch(0.75 0.18 195 / 0.1)',
    border: 'oklch(0.75 0.18 195 / 0.3)',
    text: 'text-accent'
  },
  success: {
    bg: 'oklch(0.68 0.20 155)',
    bgTransparent: 'oklch(0.68 0.20 155 / 0.1)',
    border: 'oklch(0.68 0.20 155 / 0.3)',
    text: 'text-success'
  },
  warning: {
    bg: 'oklch(0.78 0.18 75)',
    bgTransparent: 'oklch(0.78 0.18 75 / 0.1)',
    border: 'oklch(0.78 0.18 75 / 0.3)',
    text: 'text-warning'
  },
  destructive: {
    bg: 'oklch(0.58 0.24 15)',
    bgTransparent: 'oklch(0.58 0.24 15 / 0.1)',
    border: 'oklch(0.58 0.24 15 / 0.3)',
    text: 'text-destructive'
  }
}

export function HowItWorksChain() {
  return (
    <div className="relative w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {steps.map((step, i) => {
            const IconComponent = step.icon
            const colors = colorMap[step.color as keyof typeof colorMap]
            
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative h-full"
                >
                  <div 
                    className="relative p-4 rounded-2xl border-2 bg-card/40 backdrop-blur-sm transition-all duration-300 h-full flex flex-col"
                    style={{
                      borderColor: colors.border,
                      boxShadow: `0 4px 20px -4px ${colors.bgTransparent}, inset 0 1px 0 oklch(1 0 0 / 0.05)`
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${colors.bgTransparent}, transparent 70%)`
                      }}
                    />

                    <div 
                      className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${colors.bg}, transparent)`
                      }}
                    />
                    
                    <div className="relative z-10 flex flex-col items-center gap-3 flex-1">
                      <motion.div 
                        className="relative"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div 
                          className="absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                          style={{ backgroundColor: colors.bg }}
                        />
                        <div 
                          className="relative p-3 rounded-xl border"
                          style={{
                            background: `linear-gradient(135deg, ${colors.bgTransparent}, transparent)`,
                            borderColor: colors.border
                          }}
                        >
                          <IconComponent size={24} className={colors.text} weight="bold" />
                        </div>
                      </motion.div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="text-[0.6875rem] font-black tracking-wider px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: colors.bgTransparent,
                              color: colors.bg
                            }}
                          >
                            {step.num}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-foreground tracking-tight leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[0.6875rem] text-muted-foreground leading-tight">
                          {step.desc}
                        </p>
                      </div>
                      
                      <div 
                        className="w-full px-2.5 py-1.5 rounded-lg border text-center"
                        style={{
                          backgroundColor: colors.bgTransparent,
                          borderColor: colors.border
                        }}
                      >
                        <span 
                          className="text-[0.625rem] font-mono font-black tracking-[0.08em]"
                          style={{ color: colors.bg }}
                        >
                          {step.endpoint}
                        </span>
                      </div>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-[18px] top-1/2 -translate-y-1/2 z-20">
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight 
                            size={16} 
                            weight="bold"
                            style={{ color: colors.bg }}
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-accent/10 via-success/10 to-warning/10 border-2 border-accent/30 shadow-lg">
            <Network size={18} className="text-accent" weight="bold" />
            <span className="text-sm font-bold tracking-tight">
              6-Stage Validation Chain
            </span>
            <div className="h-4 w-px bg-border/50" />
            <span className="text-xs font-mono text-muted-foreground">
              24-48hr Delivery
            </span>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Circle size={8} className="text-success" weight="fill" />
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-accent border-2 border-accent/50 shadow-lg"
                animate={{ boxShadow: ['0 0 0 0 oklch(0.75 0.18 195 / 0.4)', '0 0 0 6px oklch(0.75 0.18 195 / 0)', '0 0 0 0 oklch(0.75 0.18 195 / 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono font-bold text-muted-foreground tracking-wider">START</span>
            </div>
            
            <div className="relative h-px w-24 bg-gradient-to-r from-accent via-success to-warning overflow-hidden">
              <motion.div
                className="absolute inset-0 w-8 h-full bg-gradient-to-r from-transparent via-foreground to-transparent"
                animate={{ x: [-32, 96] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-success border-2 border-success/50 shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono font-bold text-muted-foreground tracking-wider">END</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
