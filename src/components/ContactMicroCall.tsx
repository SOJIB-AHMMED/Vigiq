import { motion } from 'framer-motion'
import { Phone } from '@phosphor-icons/react'

interface ContactMicroCallProps {
  className?: string
  index?: number
}

export function ContactMicroCall({ className = '', index = 0 }: ContactMicroCallProps) {
  return (
    <motion.a
      href="tel:+12563670341"
      aria-label="Call us at +1 256 367 0341"
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
      className={`group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 border-2 border-success/30 hover:border-success/60 transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.68 0.20 155 / 0.2), inset 0 1px 0 oklch(0.68 0.20 155 / 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.6), 0 16px 48px -8px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.68 0.20 155 / 0.4), inset 0 2px 4px oklch(0.68 0.20 155 / 0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.68 0.20 155 / 0.2), inset 0 1px 0 oklch(0.68 0.20 155 / 0.15)'
      }}
      title="Call Us"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/0 group-hover:from-success/20 group-hover:to-success/10 rounded-2xl transition-all duration-300" />
      <Phone 
        size={32} 
        weight="bold" 
        className="relative z-10 text-success transition-colors duration-300"
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card/90 border border-success/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <span className="text-[0.6875rem] font-bold text-success tracking-wider">CALL</span>
      </div>
    </motion.a>
  )
}
