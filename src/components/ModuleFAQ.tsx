import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface FAQItem {
  question: string
  answer: string
  module: string
}

const faqData: FAQItem[] = [
  {
    module: 'NUMSYNC',
    question: 'How does NUMSYNC assist with endpoint validation?',
    answer: 'NUMSYNC orchestrates virtual SIM lifecycle handling to support partner telephony infrastructure during SMS verification and multi-factor authentication workflows. The module observes usage patterns, tags jurisdictional compliance requirements, and signals validation events across approved communication flows—enabling controlled endpoint verification while maintaining institutional audit standards.'
  },
  {
    module: 'NUMSYNC',
    question: 'What role does NUMSYNC serve in the control layer?',
    answer: 'NUMSYNC operates as a support layer within the VIFIQ control architecture. It assists operators by coordinating virtual SIM assignments, observing usage metrics, and enforcing compliance checkpoints across partner telephony providers. NUMSYNC does not provision infrastructure independently—it exists to facilitate governance, auditability, and lifecycle management for communication endpoints provisioned by external partners.'
  },
  {
    module: 'SYNCPLAYER',
    question: 'How does SYNCPLAYER assist with endpoint validation?',
    answer: 'SYNCPLAYER supports controlled emulator environment workflows for secure endpoint validation and testing operations. The module assists by tracking dependencies, observing test execution, capturing audit data, and enforcing access controls—enabling organizations to validate mobile-specific endpoint functionality within governed testing environments prior to production deployment.'
  },
  {
    module: 'SYNCPLAYER',
    question: 'What role does SYNCPLAYER serve in the control layer?',
    answer: 'SYNCPLAYER operates as an execution assistance module within the VIFIQ control layer. It coordinates with partner emulator infrastructure to support testing workflows, enforce time-bound access policies, and maintain comprehensive activity logs. SYNCPLAYER does not provide infrastructure—it exists to assist operators in managing, observing, and governing virtualized testing environments provisioned by partner systems.'
  },
  {
    module: 'SYNC-IP',
    question: 'How does SYNC-IP assist with endpoint validation?',
    answer: 'SYNC-IP coordinates network routing across partner proxy and VPN infrastructure to support geographic endpoint validation and region-restricted access verification. The module assists by enforcing routing policies, verifying compliance requirements, observing traffic patterns, and maintaining audit trails—enabling controlled validation of jurisdiction-specific endpoint behavior within institutional governance frameworks.'
  },
  {
    module: 'SYNC-IP',
    question: 'What role does SYNC-IP serve in the control layer?',
    answer: 'SYNC-IP operates as a routing assistance module within the VIFIQ control layer. It coordinates with partner network infrastructure to support geographic routing requirements, enforce compliance verification mechanisms, and capture routing decisions for audit purposes. SYNC-IP does not own network infrastructure—it exists to assist operators in managing, monitoring, and governing network access provisioned by external partner systems.'
  }
]

export function ModuleFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'NUMSYNC':
        return {
          border: 'border-accent/30 hover:border-accent/60',
          bg: 'bg-accent/5',
          text: 'text-accent',
          badge: 'bg-accent/20 border-accent/40'
        }
      case 'SYNCPLAYER':
        return {
          border: 'border-warning/30 hover:border-warning/60',
          bg: 'bg-warning/5',
          text: 'text-warning',
          badge: 'bg-warning/20 border-warning/40'
        }
      case 'SYNC-IP':
        return {
          border: 'border-success/30 hover:border-success/60',
          bg: 'bg-success/5',
          text: 'text-success',
          badge: 'bg-success/20 border-success/40'
        }
      default:
        return {
          border: 'border-border/30 hover:border-border/60',
          bg: 'bg-card/5',
          text: 'text-foreground',
          badge: 'bg-card/20 border-border/40'
        }
    }
  }

  return (
    <div className="space-y-3">
      {faqData.map((item, index) => {
        const colors = getModuleColor(item.module)
        const isOpen = openIndex === index

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div
              className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${colors.border} ${isOpen ? colors.bg : 'bg-card/30'}`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left group"
              >
                <div className="flex-1 flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-[0.6875rem] leading-tight font-black border ${colors.badge} ${colors.text} tracking-[0.04em]`}>
                    {item.module}
                  </span>
                  <span className="text-[0.8125rem] md:text-[0.9375rem] leading-[1.5] font-bold text-foreground group-hover:text-accent transition-colors tracking-[-0.01em]">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <CaretDown size={20} className={`${colors.text} transition-colors`} weight="bold" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <div className="pl-2 border-l-2 border-accent/30">
                        <p className="text-[0.8125rem] leading-[1.65] text-muted-foreground/90 tracking-[-0.005em]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
