import { motion } from 'framer-motion'
import { UserCircle, Vault, ShieldCheck, CreditCard, Eye, CheckCircle, ArrowRight, Circle } from '@phosphor-icons/react'

const nanoSteps = [
  { icon: UserCircle, label: 'Register', endpoint: 'AUTH', color: '#75D7C4' },
  { icon: Vault, label: 'Select', endpoint: 'CATALOG', color: '#AED581' },
  { icon: ShieldCheck, label: 'Validate', endpoint: 'VERIFY', color: '#FFD54F' },
  { icon: CreditCard, label: 'Payment', endpoint: 'PAY', color: '#EF9A9A' },
  { icon: Eye, label: 'Track', endpoint: 'STATUS', color: '#75D7C4' },
  { icon: CheckCircle, label: 'Deliver', endpoint: 'DONE', color: '#AED581' }
]

export function HowItWorksNanoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-card/90 to-card/60 border-2 border-accent/30 overflow-hidden group hover:border-accent/60 transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.75_0.18_195_/_0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 mb-4"
            >
              <Circle size={8} className="text-accent animate-pulse" weight="fill" />
              <span className="text-xs font-mono font-bold tracking-widest text-accent">PARTNER WORKFLOW</span>
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              How It Works
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              6-stage validation chain connecting partners to compliant endpoint delivery
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {nanoSteps.map((step, i) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + (i * 0.08),
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="group/step"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <div 
                      className="relative p-3 rounded-xl border-2 bg-card/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center gap-2.5 h-full"
                      style={{
                        borderColor: `${step.color}40`,
                        boxShadow: `0 2px 12px -2px ${step.color}20`
                      }}
                    >
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/step:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${step.color}15, transparent 70%)`
                        }}
                      />

                      <div 
                        className="absolute top-0 left-0 w-full h-px opacity-0 group-hover/step:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`
                        }}
                      />

                      <div className="relative">
                        <div 
                          className="absolute inset-0 blur-lg rounded-full opacity-0 group-hover/step:opacity-50 transition-opacity duration-300"
                          style={{ backgroundColor: step.color }}
                        />
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.5 }}
                          className="relative p-2 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                            border: `1px solid ${step.color}40`
                          }}
                        >
                          <IconComponent 
                            size={20} 
                            weight="bold"
                            style={{ color: step.color }}
                          />
                        </motion.div>
                      </div>

                      <div className="flex flex-col items-center gap-1 text-center">
                        <span className="text-xs font-bold text-foreground leading-tight">
                          {step.label}
                        </span>
                        <div 
                          className="px-2 py-0.5 rounded text-[0.625rem] font-mono font-black tracking-wider"
                          style={{
                            backgroundColor: `${step.color}15`,
                            color: step.color
                          }}
                        >
                          {step.endpoint}
                        </div>
                      </div>

                      {i < nanoSteps.length - 1 && (
                        <div className="hidden lg:block absolute -right-[14px] top-1/2 -translate-y-1/2 z-20">
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight 
                              size={12} 
                              weight="bold"
                              style={{ color: step.color }}
                              className="drop-shadow-lg"
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
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent/10 via-success/10 to-warning/10 border-2 border-accent/20">
              <span className="text-xs font-bold tracking-tight text-foreground">
                Validation Chain
              </span>
              <div className="h-3 w-px bg-border/50" />
              <span className="text-xs font-mono text-muted-foreground">
                24-48hr
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Circle size={6} className="text-success" weight="fill" />
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <motion.div 
                  className="w-2 h-2 rounded-full border"
                  style={{ 
                    backgroundColor: nanoSteps[0].color,
                    borderColor: `${nanoSteps[0].color}80`
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 0 0 0 ${nanoSteps[0].color}40`, 
                      `0 0 0 6px ${nanoSteps[0].color}00`, 
                      `0 0 0 0 ${nanoSteps[0].color}00`
                    ] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[0.625rem] font-mono font-bold text-muted-foreground tracking-wider">
                  START
                </span>
              </div>
              
              <div className="relative h-px w-20 bg-gradient-to-r from-accent via-success to-warning overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-6 h-full bg-gradient-to-r from-transparent via-foreground/60 to-transparent"
                  animate={{ x: [-24, 80] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="flex items-center gap-1.5">
                <motion.div 
                  className="w-2 h-2 rounded-full border"
                  style={{ 
                    backgroundColor: nanoSteps[nanoSteps.length - 1].color,
                    borderColor: `${nanoSteps[nanoSteps.length - 1].color}80`
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[0.625rem] font-mono font-bold text-muted-foreground tracking-wider">
                  END
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
