import { motion } from 'framer-motion'
import { ContactMicroEmail } from '@/components/ContactMicroEmail'
import { ContactMicroCall } from '@/components/ContactMicroCall'
import { ContactMicroWhatsApp } from '@/components/ContactMicroWhatsApp'

interface ContactMicroSectionProps {
  className?: string
}

export function ContactMicroSection({ className = '' }: ContactMicroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4"
        >
          <span className="text-[0.6875rem] font-black text-accent tracking-[0.14em]">CONTACT VIFIQ</span>
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Connect with our enterprise team for governance solutions
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 md:gap-12 py-8">
        <ContactMicroEmail index={0} />
        <ContactMicroCall index={1} />
        <ContactMicroWhatsApp index={2} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-success">
            Available 24/7 for Enterprise Support
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}
