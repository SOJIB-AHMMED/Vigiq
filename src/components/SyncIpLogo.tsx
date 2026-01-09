import { motion } from 'framer-motion'

interface SyncIpLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function SyncIpLogo({ size = 'md', className = '', animated = false }: SyncIpLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120
  }
  
  const dimension = sizeMap[size]
  
  const LogoSVG = (
    <svg width={dimension} height={dimension} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.circle 
        cx="60" 
        cy="60" 
        r="45" 
        stroke="url(#syncip-gradient-1)" 
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="60" 
        r="35" 
        stroke="url(#syncip-gradient-2)" 
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.3, delay: 0.2, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="60" 
        r="25" 
        stroke="url(#syncip-gradient-3)" 
        strokeWidth="2"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="60" 
        r="8" 
        fill="url(#syncip-gradient-4)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9, ease: "backOut" }}
      />
      
      <motion.path 
        d="M60 15 L60 25 M60 95 L60 105 M15 60 L25 60 M95 60 L105 60" 
        stroke="url(#syncip-gradient-2)" 
        strokeWidth="3" 
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="15" 
        r="3" 
        fill="url(#syncip-gradient-4)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.2, ease: "backOut" }}
      />
      <motion.circle 
        cx="60" 
        cy="105" 
        r="3" 
        fill="url(#syncip-gradient-4)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.3, ease: "backOut" }}
      />
      <motion.circle 
        cx="15" 
        cy="60" 
        r="3" 
        fill="url(#syncip-gradient-4)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.4, ease: "backOut" }}
      />
      <motion.circle 
        cx="105" 
        cy="60" 
        r="3" 
        fill="url(#syncip-gradient-4)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.5, ease: "backOut" }}
      />
      
      <motion.text 
        x="60" 
        y="107" 
        textAnchor="middle" 
        fill="currentColor" 
        fontSize="12" 
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        SI
      </motion.text>
      
      <defs>
        <linearGradient id="syncip-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.68 0.20 155)" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 165)" />
        </linearGradient>
        <linearGradient id="syncip-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.75 0.18 155)" />
          <stop offset="100%" stopColor="oklch(0.68 0.20 165)" />
        </linearGradient>
        <linearGradient id="syncip-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.80 0.16 155)" />
          <stop offset="100%" stopColor="oklch(0.75 0.18 165)" />
        </linearGradient>
        <radialGradient id="syncip-gradient-4">
          <stop offset="0%" stopColor="oklch(0.85 0.18 155)" />
          <stop offset="100%" stopColor="oklch(0.68 0.20 155)" />
        </radialGradient>
      </defs>
    </svg>
  )
  
  return LogoSVG
}
