import { motion } from 'framer-motion'

interface BetfairLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function BetfairLogo({ size = 'md', className = '', animated = false }: BetfairLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, fontSize: 10 },
    md: { width: 64, height: 64, fontSize: 16 },
    lg: { width: 96, height: 96, fontSize: 24 }
  }
  
  const { width, height, fontSize } = sizes[size]
  
  const LogoContent = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="20" fill="#FFB80C"/>
      <circle cx="50" cy="35" r="12" fill="#000000"/>
      <path
        d="M35 45L50 60L65 45"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text x="50" y="82" fontSize={fontSize} fill="#000000" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">betfair</text>
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
