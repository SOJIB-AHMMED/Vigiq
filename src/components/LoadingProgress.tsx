import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LoadingProgressProps {
  isLoading: boolean
  duration?: number
  className?: string
}

export function LoadingProgress({ isLoading, duration = 800, className }: LoadingProgressProps) {
  const progress = useMotionValue(0)
  const width = useTransform(progress, (v) => `${v}%`)
  const glowOpacity = useTransform(progress, [0, 50, 100], [0.3, 0.8, 1])
  const hasCompletedRef = useRef(false)
  const milestonesRef = useRef(new Set<number>())
  
  useEffect(() => {
    if (isLoading) {
      progress.set(0)
      hasCompletedRef.current = false
      milestonesRef.current = new Set()
      
      const controls = animate(progress, 100, {
        duration: duration / 1000,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true
          }
        }
      })
      
      return () => {
        controls.stop()
      }
    }
  }, [isLoading, duration, progress])

  if (!isLoading) return null

  return (
    <motion.div 
      className={cn('fixed top-0 left-0 right-0 z-50', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-1.5 bg-gradient-to-r from-border/30 via-border/50 to-border/30 backdrop-blur-md overflow-hidden shadow-sm">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-[oklch(0.80_0.20_195)] to-accent relative overflow-hidden"
          style={{ width, opacity: glowOpacity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[2px]"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/30 to-accent/0"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="absolute inset-0 shadow-[0_0_15px_rgba(119,217,213,0.5)]" />
        </motion.div>
        
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-sm"
          style={{ width }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      

    </motion.div>
  )
}

interface LoadingBarProps {
  isLoading: boolean
  duration?: number
}

export function LoadingBar({ isLoading, duration = 800 }: LoadingBarProps) {
  const progress = useMotionValue(0)
  const width = useTransform(progress, (v) => `${v}%`)
  const glowIntensity = useTransform(progress, [0, 50, 100], [0.4, 1, 0.6])
  const hasCompletedRef = useRef(false)
  
  useEffect(() => {
    if (isLoading) {
      progress.set(0)
      hasCompletedRef.current = false
      
      const controls = animate(progress, 100, {
        duration: duration / 1000,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true
          }
        }
      })
      
      return () => controls.stop()
    }
  }, [isLoading, duration, progress])

  if (!isLoading) return null

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-gradient-to-r from-border/20 via-border/40 to-border/20 backdrop-blur-md overflow-hidden shadow-sm"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-accent/90 via-[oklch(0.85_0.22_195)] to-accent relative overflow-hidden"
        style={{ width, opacity: glowIntensity }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          animate={{
            x: ['-150%', '150%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 shadow-[0_0_12px_rgba(119,217,213,0.6)]" />
      </motion.div>
      
      <motion.div
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-md"
        style={{ left: width }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

interface CircularProgressProps {
  isLoading: boolean
  duration?: number
  size?: number
  className?: string
}

export function CircularProgress({ 
  isLoading, 
  duration = 800, 
  size = 120,
  className 
}: CircularProgressProps) {
  const progress = useMotionValue(0)
  const hasCompletedRef = useRef(false)
  
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = useTransform(
    progress,
    (value) => circumference - (value / 100) * circumference
  )
  
  const glowOpacity = useTransform(progress, [0, 50, 100], [0.3, 1, 0.8])
  
  useEffect(() => {
    if (isLoading) {
      progress.set(0)
      hasCompletedRef.current = false
      
      const controls = animate(progress, 100, {
        duration: duration / 1000,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true
          }
        }
      })
      
      return () => controls.stop()
    }
  }, [isLoading, duration, progress])

  if (!isLoading) return null

  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/5 blur-2xl"
          style={{ opacity: glowOpacity }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <svg
          className="transform -rotate-90 relative z-10"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.75 0.18 195)" />
              <stop offset="50%" stopColor="oklch(0.85 0.22 195)" />
              <stop offset="100%" stopColor="oklch(0.75 0.18 195)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border/30"
          />
          
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
          
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent/40"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <motion.div 
              className="text-xs text-muted-foreground font-medium tracking-wider"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              LOADING
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent/20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
