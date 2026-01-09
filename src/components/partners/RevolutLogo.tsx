import { motion } from 'framer-motion'

interface RevolutLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function RevolutLogo({ size = 'md', className = '', animated = false }: RevolutLogoProps) {
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
      <rect width="100" height="100" rx="20" fill="#0075EB"/>
      <path
        d="M30 35C30 32.2386 32.2386 30 35 30H50C57.732 30 64 36.268 64 44C64 48.8 61.4 53 57.5 55.2L68 70H58L48.5 56H38V70H30V35Z"
        fill="white"
      />
      <path
        d="M38 37V49H50C53.866 49 57 45.866 57 42C57 38.134 53.866 35 50 35H40C38.8954 35 38 35.8954 38 37Z"
        fill="#0075EB"
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
