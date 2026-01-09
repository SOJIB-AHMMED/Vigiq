import { motion } from 'framer-motion'

interface N26LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function N26Logo({ size = 'md', className = '', animated = false }: N26LogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, fontSize: 16 },
    md: { width: 64, height: 64, fontSize: 28 },
    lg: { width: 96, height: 96, fontSize: 42 }
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
      <rect width="100" height="100" rx="20" fill="#36A18B"/>
      <text x="50" y="58" fontSize={fontSize} fill="#FFFFFF" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle" dominantBaseline="middle">N26</text>
      <circle cx="50" cy="25" r="3" fill="#FFFFFF"/>
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
