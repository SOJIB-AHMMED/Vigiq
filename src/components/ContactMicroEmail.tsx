import { motion } from 'framer-motion'
import { EnvelopeSimple } from '@phosphor-icons/react'

interface ContactMicroEmailProps {
  className?: string
  index?: number
}

export function ContactMicroEmail({ className = '', index = 0 }: ContactMicroEmailProps) {
  return (
    <motion.a
      href="mailto:support@vifiq.com"
      aria-label="Email us at support@vifiq.com"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200
      }}
      whileHover={{ scale: 1.15, y: -6 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 hover:border-accent/60 transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.75 0.18 195 / 0.2), inset 0 1px 0 oklch(0.75 0.18 195 / 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.6), 0 16px 48px -8px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.75 0.18 195 / 0.4), inset 0 2px 4px oklch(0.75 0.18 195 / 0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.75 0.18 195 / 0.2), inset 0 1px 0 oklch(0.75 0.18 195 / 0.15)'
      }}
      title="Email Us"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:to-accent/10 rounded-2xl transition-all duration-300" />
      <EnvelopeSimple 
        size={32} 
        weight="bold" 
        className="relative z-10 text-accent transition-colors duration-300"
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card/90 border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <span className="text-[0.6875rem] font-bold text-accent tracking-wider">EMAIL</span>
      </div>
    </motion.a>
  )
}
