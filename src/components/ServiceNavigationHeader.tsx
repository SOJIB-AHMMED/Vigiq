import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SimCard, DeviceMobile, ShareNetwork, ChartLine, Storefront, CurrencyCircleDollar, LockKey, Globe } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

type ServiceNav = {
  id: string
  label: string
  icon: React.ComponentType<any>
  color: string
}

const services: ServiceNav[] = [
  { id: 'numsync', label: 'Virtual SIM', icon: SimCard, color: 'oklch(0.65 0.20 165)' },
  { id: 'syncplayer', label: 'Emulator', icon: DeviceMobile, color: 'oklch(0.60 0.22 245)' },
  { id: 'sync-ip', label: 'Proxy & VPN', icon: ShareNetwork, color: 'oklch(0.78 0.18 70)' },
  { id: 'trading', label: 'Trading', icon: ChartLine, color: 'oklch(0.65 0.25 290)' },
  { id: 'business', label: 'Business', icon: Storefront, color: 'oklch(0.70 0.18 200)' },
  { id: 'crypto', label: 'Crypto', icon: CurrencyCircleDollar, color: 'oklch(0.75 0.20 35)' },
  { id: 'security', label: 'Security', icon: LockKey, color: 'oklch(0.62 0.24 15)' },
  { id: 'regions', label: 'Regional', icon: Globe, color: 'oklch(0.72 0.22 330)' }
]

export function ServiceNavigationHeader() {
  const navigate = useNavigate()
  const { domain } = useParams<{ domain: string }>()

  const handleNavigate = (serviceId: string) => {
    if (serviceId === domain) return
    navigate(`/service/${serviceId}`, { state: { prevDomain: domain } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 overflow-x-auto pb-2"
    >
      <div className="flex gap-2 min-w-max">
        {services.map((service, index) => {
          const Icon = service.icon
          const isActive = service.id === domain
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleNavigate(service.id)}
                className={cn(
                  'gap-2 transition-all duration-300',
                  isActive 
                    ? 'bg-accent text-accent-foreground shadow-lg' 
                    : 'border-border/50 hover:border-accent/50 hover:bg-accent/10'
                )}
                style={
                  isActive 
                    ? { 
                        boxShadow: `0 4px 20px ${service.color}40` 
                      }
                    : undefined
                }
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon 
                    size={16} 
                    weight={isActive ? 'fill' : 'regular'}
                    style={{ color: isActive ? undefined : service.color }}
                  />
                </motion.div>
                <span className="text-xs font-medium whitespace-nowrap">
                  {service.label}
                </span>
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
