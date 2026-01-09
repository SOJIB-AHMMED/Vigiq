import { motion } from 'framer-motion'

interface CompaniesHouseLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function CompaniesHouseLogo({ size = 'md', className = '', animated = false }: CompaniesHouseLogoProps) {
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
      <rect width="100" height="100" rx="20" fill="#003078"/>
      <path
        d="M50 20L75 35V65L50 80L25 65V35L50 20Z"
        fill="#FFFFFF"
      />
      <path
        d="M50 28L68 38V62L50 72L32 62V38L50 28Z"
        fill="#003078"
      />
      <path
        d="M44 42H47V50H53V42H56V58H53V53H47V58H44V42Z"
        fill="#FFFFFF"
        fontWeight="bold"
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
