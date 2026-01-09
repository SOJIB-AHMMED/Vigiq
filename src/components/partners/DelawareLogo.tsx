import { motion } from 'framer-motion'

interface DelawareLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function DelawareLogo({ size = 'md', className = '', animated = false }: DelawareLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, fontSize: 14 },
    md: { width: 64, height: 64, fontSize: 22 },
    lg: { width: 96, height: 96, fontSize: 32 }
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
      <rect width="100" height="100" rx="20" fill="#002B5C"/>
      <path
        d="M25 30L50 20L75 30L75 50L50 60L25 50L25 30Z"
        fill="#E31C3D"
      />
      <path
        d="M30 35L50 27L70 35V48L50 56L30 48V35Z"
        fill="#002B5C"
      />
      <text x="50" y="52" fontSize={fontSize} fill="#FFFFFF" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle" dominantBaseline="middle">DE</text>
      <path
        d="M25 65L75 65"
        stroke="#E31C3D"
        strokeWidth="3"
      />
      <path
        d="M25 72L75 72"
        stroke="#E31C3D"
        strokeWidth="3"
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
