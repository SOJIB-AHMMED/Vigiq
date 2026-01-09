import { motion } from 'framer-motion'

interface SyncplayerLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function SyncplayerLogo({ size = 'md', className = '', animated = false }: SyncplayerLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120
  }
  
  const dimension = sizeMap[size]
  
  const LogoSVG = (
    <svg width={dimension} height={dimension} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.rect 
        x="20" 
        y="20" 
        width="80" 
        height="80" 
        rx="12" 
        stroke="url(#syncplayer-gradient-1)" 
        strokeWidth="3"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      <motion.polygon 
        points="50,45 50,75 75,60" 
        fill="url(#syncplayer-gradient-2)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
      />
      
      <motion.circle 
        cx="60" 
        cy="60" 
        r="32" 
        stroke="url(#syncplayer-gradient-3)" 
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0, rotate: 0 } : { rotate: 0 }}
        animate={animated ? { pathLength: 1, opacity: 0.6, rotate: 360 } : { rotate: 360 }}
        transition={animated ? { 
          pathLength: { duration: 1, delay: 0.8 },
          opacity: { duration: 0.5, delay: 0.8 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        } : {
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.path 
        d="M35 30 L35 35 M45 30 L45 35 M55 30 L55 35 M65 30 L65 35 M75 30 L75 35 M85 30 L85 35" 
        stroke="url(#syncplayer-gradient-2)" 
        strokeWidth="2" 
        strokeLinecap="round"
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
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
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        SP
      </motion.text>
      
      <defs>
        <linearGradient id="syncplayer-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.78 0.18 75)" />
          <stop offset="100%" stopColor="oklch(0.68 0.20 85)" />
        </linearGradient>
        <linearGradient id="syncplayer-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.85 0.18 75)" />
          <stop offset="100%" stopColor="oklch(0.75 0.18 80)" />
        </linearGradient>
        <linearGradient id="syncplayer-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.78 0.18 75)" />
          <stop offset="50%" stopColor="oklch(0.68 0.20 85)" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 75)" />
        </linearGradient>
      </defs>
    </svg>
  )
  
  return LogoSVG
}
