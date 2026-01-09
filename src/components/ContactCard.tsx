import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EnvelopeSimple, Phone, MapPin, TwitterLogo, LinkedinLogo, GithubLogo, TelegramLogo, DiscordLogo, Globe } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ContactCardProps {
  className?: string
}

export function ContactCard({ className = '' }: ContactCardProps) {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: TwitterLogo,
      url: 'https://twitter.com/vifiq',
      color: 'hover:text-[#1DA1F2]',
      bgColor: 'hover:bg-[#1DA1F2]/10'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      url: 'https://linkedin.com/company/vifiq',
      color: 'hover:text-[#0A66C2]',
      bgColor: 'hover:bg-[#0A66C2]/10'
    },
    {
      name: 'GitHub',
      icon: GithubLogo,
      url: 'https://github.com/vifiq',
      color: 'hover:text-accent',
      bgColor: 'hover:bg-accent/10'
    },
    {
      name: 'Telegram',
      icon: TelegramLogo,
      url: 'https://t.me/vifiq',
      color: 'hover:text-[#0088cc]',
      bgColor: 'hover:bg-[#0088cc]/10'
    },
    {
      name: 'Discord',
      icon: DiscordLogo,
      url: 'https://discord.gg/vifiq',
      color: 'hover:text-[#5865F2]',
      bgColor: 'hover:bg-[#5865F2]/10'
    }
  ]

  const contactMethods = [
    {
      icon: EnvelopeSimple,
      label: 'Email',
      value: 'enterprise@vifiq.com',
      href: 'mailto:enterprise@vifiq.com',
      color: 'text-accent'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-success'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Enterprise Tower, Financial District',
      href: null,
      color: 'text-warning'
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'www.vifiq.com',
      href: 'https://www.vifiq.com',
      color: 'text-accent'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="relative overflow-hidden border-2 border-accent/20 bg-gradient-to-br from-card/90 via-card/70 to-card/50 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.75_0.18_195_/_0.12),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.68_0.20_155_/_0.12),transparent_50%)] pointer-events-none" />
        
        <CardHeader className="relative z-10 pb-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4">
              <EnvelopeSimple size={16} className="text-accent" weight="bold" />
              <span className="text-xs font-bold text-accent tracking-widest">GET IN TOUCH</span>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Contact VIFIQ
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Connect with our enterprise team for governance solutions
            </p>
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4"
          >
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group"
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border/50 hover:border-accent/40 hover:bg-background/60 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className={`p-3 rounded-xl bg-card/50 border-2 border-accent/20 group-hover:border-accent/40 transition-all duration-300 ${method.color}`}>
                        <IconComponent size={20} weight="bold" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-muted-foreground/70 tracking-wider uppercase mb-1">
                          {method.label}
                        </div>
                        <div className="text-sm font-medium text-foreground/90 group-hover:text-accent transition-colors">
                          {method.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border/50">
                      <div className={`p-3 rounded-xl bg-card/50 border-2 border-accent/20 ${method.color}`}>
                        <IconComponent size={20} weight="bold" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-muted-foreground/70 tracking-wider uppercase mb-1">
                          {method.label}
                        </div>
                        <div className="text-sm font-medium text-foreground/90">
                          {method.value}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          <Separator className="my-6 opacity-30" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-center mb-4">
              <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">
                Follow Us
              </h4>
              <p className="text-xs text-muted-foreground/70">
                Stay updated with our latest developments
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + (index * 0.1),
                      type: 'spring',
                      stiffness: 200
                    }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className={`relative group overflow-hidden border-2 border-border/50 hover:border-accent/50 bg-background/40 hover:bg-background/60 transition-all duration-300 hover:scale-110 ${social.bgColor}`}
                      onClick={() => window.open(social.url, '_blank')}
                      title={social.name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-accent/5 transition-all duration-300" />
                      <IconComponent 
                        size={20} 
                        weight="bold" 
                        className={`relative z-10 text-muted-foreground transition-colors duration-300 ${social.color}`}
                      />
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="pt-6 border-t border-border/30"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 group"
                onClick={() => window.open('mailto:enterprise@vifiq.com', '_blank')}
              >
                <EnvelopeSimple size={18} weight="bold" className="mr-2 group-hover:animate-bounce-x" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-accent/30 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
                onClick={() => window.open('tel:+15551234567', '_blank')}
              >
                <Phone size={18} weight="bold" className="mr-2 group-hover:animate-pulse" />
                Call Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center pt-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">
                Available 24/7 for Enterprise Support
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
