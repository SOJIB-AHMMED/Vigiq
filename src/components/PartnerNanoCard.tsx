import { motion } from 'framer-motion'
import { Shield, ArrowRight } from '@phosphor-icons/react'
import { useState } from 'react'

interface PartnerNanoCardProps {
  name: string
  category: string
  desc: string
  logo: React.ComponentType<{ size?: 'sm' | 'md' | 'lg'; animated?: boolean }>
  color: string
  borderColor: string
  hoverBorderColor: string
  brandColor: string
  index: number
}

export function PartnerNanoCard({
  name,
  category,
  desc,
  logo: LogoComponent,
  color,
  borderColor,
  hoverBorderColor,
  brandColor,
  index
}: PartnerNanoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <motion.div
        whileHover={{ 
          y: -4,
          scale: 1.02
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className={`
          relative overflow-hidden h-full
          rounded-2xl border-2 ${borderColor} ${hoverBorderColor}
          bg-gradient-to-br from-card/95 via-card/90 to-card/80
          backdrop-blur-sm
          transition-all duration-500
          hover:shadow-2xl hover:shadow-${color}/20
          cursor-pointer
        `}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-${color}/8 via-transparent to-${color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-all duration-700"
          style={{ background: brandColor }}
        />
        
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${brandColor}15, transparent 40%)`
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className="flex-shrink-0 relative"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, -3, 3, 0] : 0
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div 
                className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                style={{ background: brandColor }}
              />
              <div className="relative">
                <LogoComponent size="sm" animated />
              </div>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className={`text-[10px] font-bold text-${color}/70 tracking-widest mb-1.5 uppercase`}>
                {category}
              </div>
              <h3 className="text-base font-bold text-foreground truncate group-hover:text-accent transition-colors duration-300">
                {name}
              </h3>
            </div>

            <motion.div
              animate={{
                x: isHovered ? 2 : 0,
                opacity: isHovered ? 1 : 0.4
              }}
              transition={{ duration: 0.3 }}
              className={`flex-shrink-0`}
            >
              <ArrowRight 
                size={16} 
                className={`text-${color} group-hover:text-accent transition-colors duration-300`}
                weight="bold"
              />
            </motion.div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 group-hover:text-foreground/70 transition-colors duration-300">
            {desc}
          </p>

          <div className={`flex items-center gap-2 pt-3 mt-3 border-t border-border/30 group-hover:border-${color}/30 transition-colors duration-300`}>
            <Shield 
              size={12} 
              className={`text-${color}/60 group-hover:text-${color} transition-colors duration-300`}
              weight="bold"
            />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Audited Infrastructure
            </span>
          </div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
          initial={false}
          animate={{
            scaleX: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}
