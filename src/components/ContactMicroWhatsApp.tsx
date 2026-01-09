import { motion } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'

interface ContactMicroWhatsAppProps {
  index: number
}

export function ContactMicroWhatsApp({ index }: ContactMicroWhatsAppProps) {
  return (
    <motion.a
      href="https://wa.me/+447577332028"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp for instant support"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        y: -6
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 border border-border hover:border-success/50 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.68 0.20 155 / 0.2), inset 0 1px 0 oklch(0.68 0.20 155 / 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.6), 0 16px 48px -8px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.68 0.20 155 / 0.4), inset 0 2px 4px oklch(0.68 0.20 155 / 0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.68 0.20 155 / 0.2), inset 0 1px 0 oklch(0.68 0.20 155 / 0.15)'
      }}
    >
      <motion.div
        className="relative"
      >
        <div className="absolute inset-0 bg-success/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-14 h-14 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center group-hover:bg-success/20 transition-colors duration-300">
          <WhatsappLogo className="w-7 h-7 text-success" weight="fill" />
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-bold text-success tracking-wider">WHATSAPP</span>
        <span className="text-[0.65rem] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          Instant Support
        </span>
      </div>

      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-success to-transparent"
      />
    </motion.a>
  )
}
