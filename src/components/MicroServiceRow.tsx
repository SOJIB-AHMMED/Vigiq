import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

type MicroServiceRowProps = {
  logo?: string
  icon?: React.ComponentType<any>
  label: string
  route: string
  iconColor?: string
  isMore?: boolean
  delay?: number
}

export function MicroServiceRow({ 
  logo, 
  icon: IconComponent, 
  label, 
  route, 
  iconColor = 'text-accent',
  isMore = false,
  delay = 0
}: MicroServiceRowProps) {
  const navigate = useNavigate()

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ 
        x: 4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(route)}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg 
        bg-card/30 hover:bg-card/60 
        border border-border/30 hover:border-accent/40
        transition-all duration-300 group
        ${isMore ? 'opacity-70 hover:opacity-100' : ''}
      `}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {logo && (
          <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src={logo} 
              alt={label}
              className="w-6 h-6 object-contain"
            />
          </div>
        )}
        
        {IconComponent && (
          <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/50 flex items-center justify-center flex-shrink-0">
            <IconComponent size={18} className={iconColor} weight="bold" />
          </div>
        )}
        
        <span className={`text-sm font-medium text-foreground/90 group-hover:text-accent transition-colors truncate ${isMore ? 'text-muted-foreground' : ''}`}>
          {label}
        </span>
      </div>
      
      <motion.div
        className="flex-shrink-0"
        animate={{ x: [0, 2, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ArrowRight 
          size={16} 
          className={`${isMore ? 'text-muted-foreground' : 'text-accent/70'} group-hover:text-accent transition-colors`}
          weight="bold" 
        />
      </motion.div>
    </motion.button>
  )
}
