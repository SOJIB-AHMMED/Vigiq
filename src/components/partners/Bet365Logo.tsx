import { motion } from 'framer-motion'

interface Bet365LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function Bet365Logo({ size = 'md', className = '', animated = false }: Bet365LogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, fontSize: 11 },
    md: { width: 64, height: 64, fontSize: 18 },
    lg: { width: 96, height: 96, fontSize: 26 }
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
      <rect width="100" height="100" rx="20" fill="#1C3A29"/>
      <path
        d="M20 35C20 32.2386 22.2386 30 25 30H40C45.5228 30 50 34.4772 50 40C50 42.5 48.8 44.7 47 46.2C49.3 47.7 51 50.2 51 53C51 58.5228 46.5228 63 41 63H25C22.2386 63 20 60.7614 20 58V35Z"
        fill="#FFCC00"
      />
      <text x="52" y="52" fontSize={fontSize} fill="#FFCC00" fontWeight="bold" fontFamily="Arial, sans-serif">365</text>
      <path
        d="M28 37V43H40C41.6569 43 43 41.6569 43 40C43 38.3431 41.6569 37 40 37H28Z"
        fill="#1C3A29"
      />
      <path
        d="M28 48V56H41C42.6569 56 44 54.6569 44 53C44 51.3431 42.6569 50 41 50H28V48Z"
        fill="#1C3A29"
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
