import { motion } from 'framer-motion'

interface WiseLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function WiseLogo({ size = 'md', className = '', animated = false }: WiseLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, fontSize: 16 },
    md: { width: 64, height: 64, fontSize: 24 },
    lg: { width: 96, height: 96, fontSize: 36 }
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
      <rect width="100" height="100" rx="20" fill="#9FE870"/>
      <path
        d="M23 35L30 65H37L44 45L51 65H58L65 35H58L53 55L46 35H42L35 55L30 35H23Z"
        fill="#00B9FF"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M68 35V65H75V35H68Z"
        fill="#00B9FF"
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
