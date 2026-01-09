import { motion } from 'framer-motion'

interface ChatBotLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function ChatBotLogo({ size = 'md', className = '', animated = false }: ChatBotLogoProps) {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120
  }
  
  const dimension = sizeMap[size]
  
  const LogoSVG = (
    <svg width={dimension} height={dimension} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path
        d="M60 25 C40 25 25 40 25 60 C25 80 40 95 60 95 C80 95 95 80 95 60 C95 40 80 25 60 25Z"
        fill="url(#cat-body-gradient)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
      />
      
      <motion.path
        d="M35 35 L25 15 L45 30 Z"
        fill="url(#cat-ear-gradient)"
        initial={animated ? { scale: 0, opacity: 0, x: -10, y: 10 } : {}}
        animate={animated ? { scale: 1, opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
      />
      
      <motion.path
        d="M85 35 L95 15 L75 30 Z"
        fill="url(#cat-ear-gradient)"
        initial={animated ? { scale: 0, opacity: 0, x: 10, y: 10 } : {}}
        animate={animated ? { scale: 1, opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
      />
      
      <motion.circle
        cx="48"
        cy="55"
        r="5"
        fill="url(#cat-eye-gradient)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.7, ease: "backOut" }}
      />
      
      <motion.circle
        cx="72"
        cy="55"
        r="5"
        fill="url(#cat-eye-gradient)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8, ease: "backOut" }}
      />
      
      <motion.ellipse
        cx="48"
        cy="55"
        rx="2.5"
        ry="4"
        fill="oklch(0.15 0.02 300)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { 
          scale: [1, 1, 0.1, 1], 
          opacity: [1, 1, 1, 1] 
        } : {}}
        transition={animated ? { 
          duration: 3, 
          delay: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.45, 0.5, 0.55]
        } : {}}
      />
      
      <motion.ellipse
        cx="72"
        cy="55"
        rx="2.5"
        ry="4"
        fill="oklch(0.15 0.02 300)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { 
          scale: [1, 1, 0.1, 1], 
          opacity: [1, 1, 1, 1] 
        } : {}}
        transition={animated ? { 
          duration: 3, 
          delay: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.45, 0.5, 0.55]
        } : {}}
      />
      
      <motion.circle
        cx="60"
        cy="68"
        r="4"
        fill="url(#cat-nose-gradient)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.9, ease: "backOut" }}
      />
      
      <motion.path
        d="M60 72 Q55 75 50 73"
        stroke="url(#cat-mouth-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M60 72 Q65 75 70 73"
        stroke="url(#cat-mouth-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.1, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M35 60 L20 58 M35 65 L20 67 M35 70 L20 72"
        stroke="url(#cat-whisker-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      />
      
      <motion.path
        d="M85 60 L100 58 M85 65 L100 67 M85 70 L100 72"
        stroke="url(#cat-whisker-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
      />
      
      <motion.circle
        cx="42"
        cy="50"
        r="1.5"
        fill="oklch(0.95 0.05 300)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 0.8 } : {}}
        transition={{ duration: 0.3, delay: 1.4 }}
      />
      
      <motion.circle
        cx="66"
        cy="50"
        r="1.5"
        fill="oklch(0.95 0.05 300)"
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 0.8 } : {}}
        transition={{ duration: 0.3, delay: 1.4 }}
      />
      
      <defs>
        <linearGradient id="cat-body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.70 0.25 300)" />
          <stop offset="50%" stopColor="oklch(0.65 0.25 305)" />
          <stop offset="100%" stopColor="oklch(0.60 0.26 310)" />
        </linearGradient>
        
        <linearGradient id="cat-ear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.75 0.24 300)" />
          <stop offset="100%" stopColor="oklch(0.65 0.25 310)" />
        </linearGradient>
        
        <radialGradient id="cat-eye-gradient">
          <stop offset="0%" stopColor="oklch(0.85 0.20 195)" />
          <stop offset="100%" stopColor="oklch(0.75 0.22 195)" />
        </radialGradient>
        
        <radialGradient id="cat-nose-gradient">
          <stop offset="0%" stopColor="oklch(0.60 0.15 340)" />
          <stop offset="100%" stopColor="oklch(0.50 0.18 345)" />
        </radialGradient>
        
        <linearGradient id="cat-mouth-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.55 0.20 310)" />
          <stop offset="100%" stopColor="oklch(0.60 0.18 305)" />
        </linearGradient>
        
        <linearGradient id="cat-whisker-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.80 0.15 300)" />
          <stop offset="100%" stopColor="oklch(0.70 0.18 305)" />
        </linearGradient>
      </defs>
    </svg>
  )
  
  return LogoSVG
}
