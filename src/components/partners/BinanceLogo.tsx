import { motion } from 'framer-motion'

interface BinanceLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function BinanceLogo({ size = 'md', className = '', animated = false }: BinanceLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 }
  }
  
  const { width, height } = sizes[size]
  
  const LogoContent = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="20" fill="#F3BA2F"/>
      <path
        d="M50 25L58 33L50 41L42 33L50 25Z"
        fill="#1E2026"
      />
      <path
        d="M30 45L38 53L30 61L22 53L30 45Z"
        fill="#1E2026"
      />
      <path
        d="M70 45L78 53L70 61L62 53L70 45Z"
        fill="#1E2026"
      />
      <path
        d="M50 65L58 73L50 81L42 73L50 65Z"
        fill="#1E2026"
      />
      <path
        d="M42 53H58V53L50 61L42 53Z"
        fill="#1E2026"
      />
      <path
        d="M50 45L58 53H42L50 45Z"
        fill="#1E2026"
      />
    </svg>
  )
  
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {LogoContent}
      </motion.div>
    )
  }
  
  return LogoContent
}
