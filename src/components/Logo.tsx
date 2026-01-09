import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

export function Logo({ className, size = 'md', animated = false }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  }

  if (!animated) {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <svg viewBox="0 0 900 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="vifiq-logo">
            <text x="50" y="400" fontFamily="Arial, sans-serif" fontSize="280" fontWeight="bold" fill="currentColor">
              <tspan>V</tspan>
            </text>
            
            <g id="cat-head">
              <path d="M 690 188 L 760 120 L 780 188 Z" fill="currentColor"/>
              <path d="M 815 188 L 885 120 L 865 188 Z" fill="currentColor"/>
              
              <path d="M 690 188 L 690 200 L 710 200 L 710 188 Z" fill="oklch(0.10 0.015 250)"/>
              <path d="M 865 188 L 865 200 L 845 200 L 845 188 Z" fill="oklch(0.10 0.015 250)"/>
              
              <ellipse cx="787.5" cy="280" rx="130" ry="120" fill="currentColor"/>
              
              <circle cx="740" cy="260" r="12" fill="oklch(0.10 0.015 250)"/>
              <circle cx="835" cy="260" r="12" fill="oklch(0.10 0.015 250)"/>
              
              <line x1="655" y1="300" x2="700" y2="310" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <line x1="655" y1="315" x2="700" y2="320" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <line x1="655" y1="330" x2="700" y2="335" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              
              <line x1="920" y1="300" x2="875" y2="310" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <line x1="920" y1="315" x2="875" y2="320" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <line x1="920" y1="330" x2="875" y2="335" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              
              <path d="M 760 310 L 787.5 335 L 815 310" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              
              <path d="M 787.5 335 L 787.5 355" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              
              <path d="M 745 360 Q 787.5 380 830 360" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </g>
            
            <text x="50" y="640" fontFamily="Arial, sans-serif" fontSize="200" fontWeight="bold" fill="currentColor" letterSpacing="10">
              <tspan>FIQ</tspan>
            </text>
            
            <text x="50" y="750" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="normal" fill="currentColor" letterSpacing="28">
              <tspan>ACCOUNTS</tspan>
            </text>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <motion.div 
      className={cn('relative', sizeClasses[size], className)}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 900 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vifiq-logo">
          <motion.text 
            x="50" 
            y="400" 
            fontFamily="Arial, sans-serif" 
            fontSize="280" 
            fontWeight="bold" 
            fill="currentColor"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <tspan>V</tspan>
          </motion.text>
          
          <motion.g 
            id="cat-head"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: '787.5px 280px' }}
          >
            <motion.path 
              d="M 690 188 L 760 120 L 780 188 Z" 
              fill="currentColor"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
            />
            <motion.path 
              d="M 815 188 L 885 120 L 865 188 Z" 
              fill="currentColor"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
            />
            
            <path d="M 690 188 L 690 200 L 710 200 L 710 188 Z" fill="oklch(0.10 0.015 250)"/>
            <path d="M 865 188 L 865 200 L 845 200 L 845 188 Z" fill="oklch(0.10 0.015 250)"/>
            
            <ellipse cx="787.5" cy="280" rx="130" ry="120" fill="currentColor"/>
            
            <motion.circle 
              cx="740" 
              cy="260" 
              r="12" 
              fill="oklch(0.10 0.015 250)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8, ease: "backOut" }}
            />
            <motion.circle 
              cx="835" 
              cy="260" 
              r="12" 
              fill="oklch(0.10 0.015 250)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.85, ease: "backOut" }}
            />
            
            <motion.line 
              x1="655" y1="300" x2="700" y2="310" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            />
            <motion.line 
              x1="655" y1="315" x2="700" y2="320" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.95 }}
            />
            <motion.line 
              x1="655" y1="330" x2="700" y2="335" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            />
            
            <motion.line 
              x1="920" y1="300" x2="875" y2="310" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            />
            <motion.line 
              x1="920" y1="315" x2="875" y2="320" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.95 }}
            />
            <motion.line 
              x1="920" y1="330" x2="875" y2="335" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            />
            
            <motion.path 
              d="M 760 310 L 787.5 335 L 815 310" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.05 }}
            />
            
            <motion.path 
              d="M 787.5 335 L 787.5 355" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 1.15 }}
            />
            
            <motion.path 
              d="M 745 360 Q 787.5 380 830 360" 
              stroke="currentColor" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.25, ease: "easeInOut" }}
            />
          </motion.g>
          
          <motion.text 
            x="50" 
            y="640" 
            fontFamily="Arial, sans-serif" 
            fontSize="200" 
            fontWeight="bold" 
            fill="currentColor" 
            letterSpacing="10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <tspan>FIQ</tspan>
          </motion.text>
          
          <motion.text 
            x="50" 
            y="750" 
            fontFamily="Arial, sans-serif" 
            fontSize="80" 
            fontWeight="normal" 
            fill="currentColor" 
            letterSpacing="28"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <tspan>ACCOUNTS</tspan>
          </motion.text>
        </g>
      </svg>
    </motion.div>
  )
}
