import { motion } from 'framer-motion'

interface NumsyncLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function NumsyncLogo({ size = 'md', className = '', animated = false }: NumsyncLogoProps) {
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
        r="54" 
        stroke="url(#numsync-gradient-1)" 
        strokeWidth="3"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      <motion.path 
        d="M40 45 L60 75 L80 45" 
        stroke="url(#numsync-gradient-2)" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      />
      
      <motion.circle 
        cx="40" 
        cy="45" 
        r="5" 
        fill="url(#numsync-gradient-3)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="75" 
        r="5" 
        fill="url(#numsync-gradient-3)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1, ease: "backOut" }}
      />
      
      <motion.circle 
        cx="80" 
        cy="45" 
        r="5" 
        fill="url(#numsync-gradient-3)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9, ease: "backOut" }}
      />
      
      <motion.path 
        d="M30 85 L90 85" 
        stroke="url(#numsync-gradient-2)" 
        strokeWidth="3" 
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      />
      
      <motion.text 
        x="60" 
        y="105" 
        textAnchor="middle" 
        fill="currentColor" 
        fontSize="12" 
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        NS
      </motion.text>
      
      <defs>
        <linearGradient id="numsync-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.75 0.18 195)" />
          <stop offset="100%" stopColor="oklch(0.65 0.20 210)" />
        </linearGradient>
        <linearGradient id="numsync-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.75 0.18 195)" />
          <stop offset="50%" stopColor="oklch(0.68 0.20 200)" />
          <stop offset="100%" stopColor="oklch(0.75 0.18 195)" />
        </linearGradient>
        <radialGradient id="numsync-gradient-3">
          <stop offset="0%" stopColor="oklch(0.85 0.18 195)" />
          <stop offset="100%" stopColor="oklch(0.75 0.18 195)" />
        </radialGradient>
      </defs>
    </svg>
  )
  
  return LogoSVG
}
