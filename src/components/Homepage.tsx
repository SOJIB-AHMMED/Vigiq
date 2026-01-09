import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Shield, Lock, Eye, Database, CheckCircle, Clock, ArrowRight, UserCircle, Bank, ChartLine, Buildings, Vault, Globe, Lightning, CreditCard, Rocket, TwitterLogo, LinkedinLogo, GithubLogo, ShieldCheck, FileText, Sparkle, Briefcase, Plus, CurrencyCircleDollar, Coins, TrendUp, Phone, DeviceMobile, DownloadSimple } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { AnimatedBackground } from '@/components/AnimatedBackground'
import { ChatBot } from '@/components/ChatBot'
import { Logo } from '@/components/Logo'
import { MicroServiceRow } from '@/components/MicroServiceRow'
import { NumsyncLogo } from '@/components/NumsyncLogo'
import { SyncplayerLogo } from '@/components/SyncplayerLogo'
import { SyncIpLogo } from '@/components/SyncIpLogo'
import { ChatBotLogo } from '@/components/ChatBotLogo'
import { ModuleFAQ } from '@/components/ModuleFAQ'
import { PartnerTestimonials } from '@/components/PartnerTestimonials'
import { WiseLogo, RevolutLogo, N26Logo, Bet365Logo, BetfairLogo, CompaniesHouseLogo, DelawareLogo, BinanceLogo } from '@/components/partners'
import { HowItWorksChain } from '@/components/HowItWorksChain'
import { PartnerNanoCard } from '@/components/PartnerNanoCard'
import { ContactMicroSection } from '@/components/ContactMicroSection'
import { SkrillLogo, NetellerLogo, CardLogo, CryptoLogo, PayPalLogo, StripeLogo, WireLogo } from '@/components/payment'
import { Footer } from '@/components/Footer'
import { PartnerOffers } from '@/components/PartnerOffers'
import { useState } from 'react'

export function Homepage() {
  const navigate = useNavigate()
  const [partnersExpanded, setPartnersExpanded] = useState(false)
  const [frameworkExpanded, setFrameworkExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.25_0.04_250),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.18_0.05_195),transparent_50%)] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center pt-8 pb-12 md:pt-12 md:pb-16"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <div className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                className="absolute inset-0 bg-accent/40 blur-3xl rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse"
              />
              <div className="relative z-10">
                <Logo size="xl" className="text-accent w-48 h-40 md:w-56 md:h-48" animated />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-2"
            >
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="space-y-4 mb-10"
          >
            <p className="text-lg md:text-2xl text-foreground/95 font-semibold max-w-4xl mx-auto leading-tight px-4">
              Enterprise-grade access platform delivering governed infrastructure for virtual banking, betting, trading, and company formation
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
              Every service operates under structured validation, time-bound licensing, and full auditability—ensuring controlled access, regulatory alignment, and operational transparency for serious digital businesses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 perspective-1000">
              <motion.button 
                className="group relative flex flex-col items-center justify-center gap-5 px-8 py-10 rounded-2xl overflow-hidden cursor-pointer border-2 border-accent/30 hover:border-accent/70 transition-all duration-500 preserve-3d bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm"
                whileHover={{ scale: 1.03, y: -6, rotateX: 3, rotateY: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => navigate('/service/company-formation')}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.75 0.18 195 / 0.1), inset 0 1px 0 oklch(1 0 0 / 0.05)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-card/20 to-primary/60 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.75_0.18_195_/_0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,oklch(1_0_0_/_0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <motion.div 
                  className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-accent/25 via-accent/15 to-accent/10 border border-accent/30 group-hover:border-accent/60 shadow-xl shadow-accent/10 group-hover:shadow-accent/40 backdrop-blur-sm"
                  whileHover={{ 
                    rotateY: [0, 10, -10, 0],
                    rotateZ: [0, 3, -3, 0],
                    scale: 1.1,
                    z: 30
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Buildings size={44} className="text-accent drop-shadow-lg" weight="bold" />
                  <div className="absolute inset-0 bg-accent/15 blur-lg rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
                
                <div className="relative z-10 text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-accent transition-all duration-400 drop-shadow-sm">
                    COMPANY FORMATION
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed group-hover:text-foreground/70 transition-colors duration-400">
                    Structured entity registration with jurisdiction selection
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" 
                     style={{
                       background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.75 0.18 195 / 0.12), transparent 40%)'
                     }} 
                />
              </motion.button>

              <motion.button 
                className="group relative flex flex-col items-center justify-center gap-5 px-8 py-10 rounded-2xl overflow-hidden cursor-pointer border-2 border-destructive/30 hover:border-destructive/70 transition-all duration-500 preserve-3d bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm"
                whileHover={{ scale: 1.03, y: -6, rotateX: 3, rotateY: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => navigate('/service/betting-accounts')}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.58 0.24 15 / 0.1), inset 0 1px 0 oklch(1 0 0 / 0.05)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-card/20 to-primary/60 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tl from-destructive/20 via-transparent to-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.58_0.24_15_/_0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,oklch(1_0_0_/_0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <motion.div 
                  className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-destructive/25 via-destructive/15 to-destructive/10 border border-destructive/30 group-hover:border-destructive/60 shadow-xl shadow-destructive/10 group-hover:shadow-destructive/40 backdrop-blur-sm"
                  whileHover={{ 
                    rotateY: [0, -10, 10, 0],
                    rotateZ: [0, -3, 3, 0],
                    scale: 1.1,
                    z: 30
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <ChartLine size={44} className="text-destructive drop-shadow-lg" weight="bold" />
                  <div className="absolute inset-0 bg-destructive/15 blur-lg rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
                
                <div className="relative z-10 text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-destructive transition-all duration-400 drop-shadow-sm">
                    BETTING ACCOUNTS
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed group-hover:text-foreground/70 transition-colors duration-400">
                    Governed access to regulated betting platforms
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" 
                     style={{
                       background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.58 0.24 15 / 0.12), transparent 40%)'
                     }} 
                />
              </motion.button>

              <motion.button 
                className="group relative flex flex-col items-center justify-center gap-5 px-8 py-10 rounded-2xl overflow-hidden cursor-pointer border-2 border-success/30 hover:border-success/70 transition-all duration-500 preserve-3d bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm"
                whileHover={{ scale: 1.03, y: -6, rotateX: 3, rotateY: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => navigate('/service/virtual-banks')}
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.68 0.20 155 / 0.1), inset 0 1px 0 oklch(1 0 0 / 0.05)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-card/20 to-primary/60 opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tl from-success/20 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.68_0.20_155_/_0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,oklch(1_0_0_/_0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-success/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-success/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                <motion.div 
                  className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-success/25 via-success/15 to-success/10 border border-success/30 group-hover:border-success/60 shadow-xl shadow-success/10 group-hover:shadow-success/40 backdrop-blur-sm"
                  whileHover={{ 
                    rotateY: [0, 10, -10, 0],
                    rotateZ: [0, 3, -3, 0],
                    scale: 1.1,
                    z: 30
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Bank size={44} className="text-success drop-shadow-lg" weight="bold" />
                  <div className="absolute inset-0 bg-success/15 blur-lg rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
                
                <div className="relative z-10 text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-success transition-all duration-400 drop-shadow-sm">
                    VIRTUAL BANKS
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed group-hover:text-foreground/70 transition-colors duration-400">
                    Digital banking infrastructure with full compliance
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" 
                     style={{
                       background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.68 0.20 155 / 0.12), transparent 40%)'
                     }} 
                />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3 justify-center px-4 mb-12"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/signin')} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto px-6 py-5 text-base group shadow-xl shadow-accent/20 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
            >
              <UserCircle className="mr-2" size={22} weight="bold" />
              Access Platform
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                document.getElementById('services-overview')?.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="w-full sm:w-auto px-6 py-5 text-base border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105"
            >
              <Eye className="mr-2" size={22} />
              Explore Services
            </Button>
          </motion.div>
        </motion.header>

        <motion.section id="services-overview" className="py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Premium Infrastructure Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated selection of enterprise-grade services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card className="h-full border-2 border-success/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-success/20 to-emerald-500/20 border border-success/30">
                      <Bank size={32} className="text-success" weight="bold" />
                    </div>
                    <CardTitle className="text-xl">Virtual Banking</CardTitle>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-auto p-2 rounded-lg bg-success/20 hover:bg-success/30 border border-success/40 hover:border-success/60 transition-all duration-300 group/btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open('/service/virtual-banks', '_blank')
                      }}
                    >
                      <DownloadSimple size={16} className="text-success group-hover/btn:animate-bounce" weight="bold" />
                    </motion.button>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                  <MicroServiceRow 
                    icon={Bank}
                    label="Wise Multi-Currency"
                    route="/service/virtual-banks"
                    iconColor="text-success"
                    delay={0.1}
                  />
                  <MicroServiceRow 
                    icon={CreditCard}
                    label="Revolut Digital Bank"
                    route="/service/virtual-banks"
                    iconColor="text-success"
                    delay={0.15}
                  />
                  <MicroServiceRow 
                    icon={Vault}
                    label="N26 EU Banking"
                    route="/service/virtual-banks"
                    iconColor="text-success"
                    delay={0.2}
                  />
                  <MicroServiceRow 
                    icon={Briefcase}
                    label="Business Accounts"
                    route="/service/virtual-banks"
                    iconColor="text-success"
                    delay={0.25}
                  />
                  <MicroServiceRow 
                    icon={Plus}
                    label="More Accounts"
                    route="/service/virtual-banks"
                    iconColor="text-success"
                    isMore
                    delay={0.3}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-2 border-destructive/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-destructive/20 to-red-500/20 border border-destructive/30">
                      <ChartLine size={32} className="text-destructive" weight="bold" />
                    </div>
                    <CardTitle className="text-xl">Betting Accounts</CardTitle>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-auto p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 border border-destructive/40 hover:border-destructive/60 transition-all duration-300 group/btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open('/service/betting-accounts', '_blank')
                      }}
                    >
                      <DownloadSimple size={16} className="text-destructive group-hover/btn:animate-bounce" weight="bold" />
                    </motion.button>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                  <MicroServiceRow 
                    icon={TrendUp}
                    label="Bet365 Verified"
                    route="/service/betting-accounts"
                    iconColor="text-destructive"
                    delay={0.1}
                  />
                  <MicroServiceRow 
                    icon={ChartLine}
                    label="Betfair Exchange"
                    route="/service/betting-accounts"
                    iconColor="text-destructive"
                    delay={0.15}
                  />
                  <MicroServiceRow 
                    icon={CurrencyCircleDollar}
                    label="High-Limit Access"
                    route="/service/betting-accounts"
                    iconColor="text-destructive"
                    delay={0.2}
                  />
                  <MicroServiceRow 
                    icon={Coins}
                    label="Multi-Bookmaker"
                    route="/service/betting-accounts"
                    iconColor="text-destructive"
                    delay={0.25}
                  />
                  <MicroServiceRow 
                    icon={Plus}
                    label="More Betting Accounts"
                    route="/service/betting-accounts"
                    iconColor="text-destructive"
                    isMore
                    delay={0.3}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-accent/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-cyan-500/20 border border-accent/30">
                      <Buildings size={32} className="text-accent" weight="bold" />
                    </div>
                    <CardTitle className="text-xl">Company Formation</CardTitle>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-auto p-2 rounded-lg bg-accent/20 hover:bg-accent/30 border border-accent/40 hover:border-accent/60 transition-all duration-300 group/btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open('/service/company-formation', '_blank')
                      }}
                    >
                      <DownloadSimple size={16} className="text-accent group-hover/btn:animate-bounce" weight="bold" />
                    </motion.button>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                  <MicroServiceRow 
                    icon={Buildings}
                    label="UK LTD Setup"
                    route="/service/company-formation"
                    iconColor="text-accent"
                    delay={0.1}
                  />
                  <MicroServiceRow 
                    icon={Globe}
                    label="USA LLC / C-Corp"
                    route="/service/company-formation"
                    iconColor="text-accent"
                    delay={0.15}
                  />
                  <MicroServiceRow 
                    icon={Shield}
                    label="EU Entities"
                    route="/service/company-formation"
                    iconColor="text-accent"
                    delay={0.2}
                  />
                  <MicroServiceRow 
                    icon={Bank}
                    label="Banking Ready"
                    route="/service/company-formation"
                    iconColor="text-accent"
                    delay={0.25}
                  />
                  <MicroServiceRow 
                    icon={Plus}
                    label="More Jurisdictions"
                    route="/service/company-formation"
                    iconColor="text-accent"
                    isMore
                    delay={0.3}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-2 border-warning/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-warning/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-warning/20 to-amber-500/20 border border-warning/30">
                      <Vault size={32} className="text-warning" weight="bold" />
                    </div>
                    <CardTitle className="text-xl">Trading & Crypto</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                  <MicroServiceRow 
                    icon={Coins}
                    label="Binance Verified"
                    route="/service/crypto"
                    iconColor="text-warning"
                    delay={0.1}
                  />
                  <MicroServiceRow 
                    icon={ChartLine}
                    label="Broker Access"
                    route="/service/trading"
                    iconColor="text-warning"
                    delay={0.15}
                  />
                  <MicroServiceRow 
                    icon={Vault}
                    label="Wallet Setup"
                    route="/service/crypto"
                    iconColor="text-warning"
                    delay={0.2}
                  />
                  <MicroServiceRow 
                    icon={CurrencyCircleDollar}
                    label="Exchange Accounts"
                    route="/service/crypto"
                    iconColor="text-warning"
                    delay={0.25}
                  />
                  <MicroServiceRow 
                    icon={Plus}
                    label="More Trading Services"
                    route="/service/trading"
                    iconColor="text-warning"
                    isMore
                    delay={0.3}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>



        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent validation chain from registration to delivery
            </p>
          </div>

          <HowItWorksChain />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="modules-preview" 
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">Assist Modules</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              VIFIQ-managed operational accelerators embedded within the control layer to support execution, compliance enforcement, and lifecycle assistance across connected infrastructure and partner systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'NUMSYNC', 
                subtitle: 'Virtual SIM Assistance',
                category: 'ASSIST MODULE', 
                desc: 'Telephony orchestration support module enabling controlled virtual SIM lifecycle handling, usage observation, jurisdiction tagging, and compliance signaling across approved communication flows.',
                logo: NumsyncLogo,
                note: 'NUMSYNC assists. It does not provision independently. It does not operate as a partner.',
                features: ['Lifecycle orchestration', 'Usage observation', 'Jurisdiction tagging', 'Compliance signaling'],
                color: 'accent',
                borderColor: 'border-accent/40',
                hoverBorderColor: 'hover:border-accent/70',
                shadowColor: 'shadow-accent/30'
              },
              { 
                title: 'SYNCPLAYER', 
                subtitle: 'Emulator Assistance',
                category: 'ASSIST MODULE', 
                desc: 'Emulator environment assistance module supporting isolated testing workflows, audit observation, dependency tracking, and controlled access enforcement across institutional testing operations.',
                logo: SyncplayerLogo,
                note: 'SYNCPLAYER assists. It does not provide infrastructure. It does not operate as a partner.',
                features: ['Workflow assistance', 'Audit observation', 'Dependency tracking', 'Access enforcement'],
                color: 'warning',
                borderColor: 'border-warning/40',
                hoverBorderColor: 'hover:border-warning/70',
                shadowColor: 'shadow-warning/30'
              },
              { 
                title: 'SYNC-IP', 
                subtitle: 'Network Assistance',
                category: 'ASSIST MODULE', 
                desc: 'Network routing assistance module supporting geographic routing coordination, compliance verification, traffic observation, and policy enforcement across partner network infrastructure.',
                logo: SyncIpLogo,
                note: 'SYNC-IP assists. It does not own infrastructure. It does not operate as a partner.',
                features: ['Routing coordination', 'Compliance verification', 'Traffic observation', 'Policy enforcement'],
                color: 'success',
                borderColor: 'border-success/40',
                hoverBorderColor: 'hover:border-success/70',
                shadowColor: 'shadow-success/30'
              },
              { 
                title: 'CHATBOT', 
                subtitle: 'Conversational Assistance',
                category: 'ASSIST MODULE', 
                desc: 'AI-powered conversational assistance module providing contextual guidance, workflow navigation, query resolution, and real-time support across platform operations and compliance workflows.',
                logo: ChatBotLogo,
                note: 'CHATBOT assists. It does not make decisions independently. It does not operate as a partner.',
                features: ['Contextual guidance', 'Workflow navigation', 'Query resolution', 'Real-time support'],
                color: 'destructive',
                borderColor: 'border-purple-500/40',
                hoverBorderColor: 'hover:border-purple-500/70',
                shadowColor: 'shadow-purple-500/30'
              }
            ].map((module, i) => {
              const LogoComponent = module.logo
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className={`relative overflow-hidden h-full border-2 ${module.borderColor} ${module.hoverBorderColor} transition-all duration-500 hover:shadow-2xl hover:${module.shadowColor} group bg-gradient-to-br from-${module.color}/5 to-transparent`}>
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-${module.color}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-${module.color})_/_0.15,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-${module.color}/40 blur-2xl rounded-full`} />
                          <LogoComponent size="md" className={`text-${module.color} relative z-10`} animated />
                        </div>
                      </div>
                      <CardDescription className={`text-xs font-bold text-${module.color}/80 tracking-widest mb-2 text-center`}>
                        {module.category}
                      </CardDescription>
                      <CardTitle className="text-2xl mb-1 text-center">{module.title}</CardTitle>
                      <p className={`text-sm text-${module.color} font-medium text-center`}>{module.subtitle}</p>
                    </CardHeader>

                    <CardContent className="space-y-4 relative z-10">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.desc}
                      </p>

                      <div className="space-y-2">
                        {module.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-xs">
                            <CheckCircle size={14} className={`text-${module.color}`} weight="fill" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`pt-3 border-t border-${module.color}/20 bg-${module.color}/5 -mx-6 px-6 pb-0 -mb-6 mt-4`}>
                        <p className="text-xs text-muted-foreground/90 italic leading-relaxed">
                          {module.note}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-card/50 border-2 border-accent/20">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-accent" weight="bold" />
                <p className="text-sm text-muted-foreground font-medium">
                  <strong className="text-foreground">VIFIQ-owned and governed</strong> • Non-infrastructure • Non-sellable as standalone services • Activated contextually during workflows
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <Separator className="my-12 md:my-16 opacity-30" />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
            >
              <Shield size={16} className="text-accent" weight="bold" />
              <span className="text-xs font-bold text-accent tracking-widest">EXTERNAL INFRASTRUCTURE</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              VIFIQ Partners
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Autonomous third-party infrastructure providers operating independently. Partners own infrastructure, are audited not controlled, and integrate via contracts and compliance frameworks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                name: 'Wise',
                category: 'Virtual Banking',
                desc: 'Multi-currency digital banking infrastructure provider offering cross-border payment capabilities with regulatory compliance across 50+ jurisdictions.',
                logo: WiseLogo,
                color: 'success',
                borderColor: 'border-success/30',
                hoverBorderColor: 'hover:border-success/60',
                brandColor: '#9FE870'
              },
              {
                name: 'Revolut',
                category: 'Virtual Banking',
                desc: 'Digital banking infrastructure provider delivering business and personal account services with integrated payment processing and compliance frameworks.',
                logo: RevolutLogo,
                color: 'success',
                borderColor: 'border-success/30',
                hoverBorderColor: 'hover:border-success/60',
                brandColor: '#0075EB'
              },
              {
                name: 'N26',
                category: 'Virtual Banking',
                desc: 'European digital banking infrastructure provider offering mobile-first banking solutions with seamless integration and regulatory compliance across EU markets.',
                logo: N26Logo,
                color: 'success',
                borderColor: 'border-success/30',
                hoverBorderColor: 'hover:border-success/60',
                brandColor: '#36A18B'
              },
              {
                name: 'Bet365',
                category: 'Betting Platform',
                desc: 'Licensed betting infrastructure provider operating regulated platforms with jurisdictional compliance and institutional-grade security controls.',
                logo: Bet365Logo,
                color: 'destructive',
                borderColor: 'border-destructive/30',
                hoverBorderColor: 'hover:border-destructive/60',
                brandColor: '#1C3A29'
              },
              {
                name: 'Betfair',
                category: 'Betting Exchange',
                desc: 'Peer-to-peer betting exchange infrastructure provider delivering advanced trading capabilities with comprehensive regulatory oversight and compliance frameworks.',
                logo: BetfairLogo,
                color: 'destructive',
                borderColor: 'border-destructive/30',
                hoverBorderColor: 'hover:border-destructive/60',
                brandColor: '#FFB80C'
              },
              {
                name: 'Companies House UK',
                category: 'Company Formation',
                desc: 'Official UK company registration authority providing entity formation infrastructure with complete regulatory oversight and compliance verification.',
                logo: CompaniesHouseLogo,
                color: 'accent',
                borderColor: 'border-accent/30',
                hoverBorderColor: 'hover:border-accent/60',
                brandColor: '#003078'
              },
              {
                name: 'Delaware Registry',
                category: 'Company Formation',
                desc: 'US corporate formation infrastructure provider enabling LLC and C-Corp registration with federal and state compliance frameworks.',
                logo: DelawareLogo,
                color: 'accent',
                borderColor: 'border-accent/30',
                hoverBorderColor: 'hover:border-accent/60',
                brandColor: '#002B5C'
              },
              {
                name: 'Binance',
                category: 'Cryptocurrency',
                desc: 'Digital asset exchange infrastructure provider delivering trading capabilities with compliance verification and institutional custody solutions.',
                logo: BinanceLogo,
                color: 'warning',
                borderColor: 'border-warning/30',
                hoverBorderColor: 'hover:border-warning/60',
                brandColor: '#F3BA2F'
              }
            ].map((partner, i) => (
              <PartnerNanoCard
                key={partner.name}
                {...partner}
                index={i}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border-2 border-border/50">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border-2 border-accent/30 mb-3">
                    <Database size={24} className="text-accent" weight="bold" />
                  </div>
                  <h4 className="text-sm font-bold mb-2">Own Infrastructure</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Partners maintain and operate their own technical infrastructure independently
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border-2 border-accent/30 mb-3">
                    <ShieldCheck size={24} className="text-accent" weight="bold" />
                  </div>
                  <h4 className="text-sm font-bold mb-2">Compliance Integration</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Integration via contractual agreements and mandatory compliance verification
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 border-2 border-accent/30 mb-3">
                    <Eye size={24} className="text-accent" weight="bold" />
                  </div>
                  <h4 className="text-sm font-bold mb-2">External Audit</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Regular compliance audits ensure partner adherence to institutional standards
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border/30 text-center">
                <p className="text-sm text-muted-foreground italic">
                  Partners do <strong className="text-foreground not-italic">not</strong> assist users • Partners do <strong className="text-foreground not-italic">not</strong> provide tooling • Partners do <strong className="text-foreground not-italic">not</strong> sit in execution flows
                </p>
              </div>
            </div>
          </motion.div>

        </motion.section>

        <Separator className="my-12 md:my-16 opacity-30" />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
            >
              <Sparkle size={16} className="text-accent" weight="bold" />
              <span className="text-xs font-bold text-accent tracking-widest">PARTNER OFFERS</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Exclusive Partner Services
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Curated financial infrastructure providers offering specialized services for VIFIQ platform users
            </p>
          </div>

          <PartnerOffers />
        </motion.section>

        <Separator className="my-12 md:my-16 opacity-30" />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <PartnerTestimonials />
        </motion.section>

        <Separator className="my-12 md:my-16 opacity-30" />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Governance Guarantees</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on transparency, control, and accountability
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: Eye,
                title: 'Complete Audit Trail',
                desc: 'Every action, validation decision, and entitlement change is logged immutably with before/after state tracking for full transparency and regulatory compliance',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                iconBg: 'from-blue-500/30 to-cyan-500/30',
                iconColor: 'text-blue-400'
              },
              {
                icon: Lightning,
                title: 'Instant Revocation',
                desc: 'Entitlements can be suspended or revoked immediately with policy-based controls and automatic expiration enforcement for maximum security',
                gradient: 'from-amber-500/20 to-orange-500/20',
                iconBg: 'from-amber-500/30 to-orange-500/30',
                iconColor: 'text-amber-400'
              },
              {
                icon: Clock,
                title: 'Time-Bound Licensing',
                desc: 'All module access is licensed with configurable expiration periods, ensuring no indefinite access without renewal or validation',
                gradient: 'from-purple-500/20 to-violet-500/20',
                iconBg: 'from-purple-500/30 to-violet-500/30',
                iconColor: 'text-purple-400'
              },
              {
                icon: Database,
                title: 'Vendor Independence',
                desc: 'Service modules are replaceable integrations. The platform never depends on a single provider, ensuring business continuity',
                gradient: 'from-green-500/20 to-emerald-500/20',
                iconBg: 'from-green-500/30 to-emerald-500/30',
                iconColor: 'text-green-400'
              }
            ].map((guarantee, i) => {
              const IconComponent = guarantee.icon
              return (
                <motion.div
                  key={guarantee.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full border-2 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 group relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${guarantee.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <CardHeader className="relative z-10">
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${guarantee.iconBg} border-2 border-accent/20 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent size={32} className={guarantee.iconColor} weight="bold" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{guarantee.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="leading-relaxed text-base">
                        {guarantee.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck size={32} className="text-accent" weight="bold" />
              <h3 className="text-xl font-bold">Enterprise Compliance</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform is designed for institutional use with SOC 2 Type II compliance, GDPR alignment, and complete regulatory transparency. Every governance action is exportable for external audit.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SOC 2 Type II', 'GDPR Compliant', 'ISO 27001', 'PCI DSS'].map((badge) => (
                <div key={badge} className="px-4 py-2 rounded-lg bg-card/50 border border-accent/20 text-sm font-medium">
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.div 
          className="mb-8 relative z-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
              onClick={() => setPartnersExpanded(!partnersExpanded)}
              variant="outline"
              className="group px-6 py-6 border-2 border-accent/30 hover:border-accent/60 bg-gradient-to-br from-card/90 to-card/60 hover:bg-accent/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.div
                initial={false}
                animate={{ rotate: partnersExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Shield size={20} className="text-accent mr-2.5 flex-shrink-0" weight="bold" />
              </motion.div>
              <span className="text-[0.8125rem] leading-tight font-bold tracking-[0.01em]">
                {partnersExpanded ? 'Hide' : 'View'} Trusted Global Infrastructure Providers
              </span>
              <motion.div
                animate={{ rotate: partnersExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2.5"
              >
                <ArrowRight size={18} className="rotate-90" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ 
              height: partnersExpanded ? 'auto' : 0,
              opacity: partnersExpanded ? 1 : 0,
              marginBottom: partnersExpanded ? '4rem' : 0
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.4 }
            }}
            className="overflow-hidden relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 border-2 border-accent/20 relative overflow-hidden"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.75_0.18_195_/_0.15),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.68_0.20_155_/_0.15),transparent_50%)] pointer-events-none" 
              />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4"
                  >
                    <span className="text-[0.6875rem] leading-tight font-black text-accent tracking-[0.14em]">INSTITUTIONAL INFRASTRUCTURE PARTNERS</span>
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2.5 leading-tight tracking-[-0.02em]">Trusted Global Infrastructure Providers</h3>
                  <p className="text-muted-foreground text-[0.8125rem] md:text-[0.875rem] leading-[1.65] max-w-2xl mx-auto tracking-[-0.01em]">
                    World-class partner network delivering regulated infrastructure across virtual banking, betting platforms, company formation, and cryptocurrency services
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
                  {[
                    { Logo: WiseLogo, name: 'Wise' },
                    { Logo: RevolutLogo, name: 'Revolut' },
                    { Logo: N26Logo, name: 'N26' },
                    { Logo: Bet365Logo, name: 'Bet365' },
                    { Logo: BetfairLogo, name: 'Betfair' },
                    { Logo: CompaniesHouseLogo, name: 'Companies House' },
                    { Logo: DelawareLogo, name: 'Delaware' },
                    { Logo: BinanceLogo, name: 'Binance' }
                  ].map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/50 hover:border-accent/30 hover:bg-background/60 transition-all duration-300 group"
                    >
                      <partner.Logo className="h-12 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[0.6875rem] leading-tight font-semibold text-muted-foreground text-center tracking-[0.005em]">{partner.name}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-10 text-center"
                >
                  <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-6 px-6 py-4 rounded-xl bg-background/50 border border-accent/20">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-success flex-shrink-0" weight="fill" />
                      <span className="text-[0.75rem] leading-tight font-semibold tracking-[0.005em]">Regulatory Compliant</span>
                    </div>
                    <Separator orientation="vertical" className="h-5 hidden md:block" />
                    <div className="flex items-center gap-2.5">
                      <Shield size={16} className="text-accent flex-shrink-0" weight="bold" />
                      <span className="text-[0.75rem] leading-tight font-semibold tracking-[0.005em]">Independently Audited</span>
                    </div>
                    <Separator orientation="vertical" className="h-5 hidden md:block" />
                    <div className="flex items-center gap-2.5">
                      <Globe size={16} className="text-warning flex-shrink-0" weight="bold" />
                      <span className="text-[0.75rem] leading-tight font-semibold tracking-[0.005em]">Global Infrastructure</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mb-8 relative z-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              onClick={() => setFrameworkExpanded(!frameworkExpanded)}
              variant="outline"
              className="group px-6 py-6 border-2 border-accent/30 hover:border-accent/60 bg-gradient-to-br from-card/90 to-card/60 hover:bg-accent/10 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.div
                initial={false}
                animate={{ rotate: frameworkExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <FileText size={20} className="text-accent mr-2.5 flex-shrink-0" weight="bold" />
              </motion.div>
              <span className="text-[0.8125rem] leading-tight font-bold tracking-[0.01em]">
                {frameworkExpanded ? 'Hide' : 'View'} Operational Framework & Endpoint Validation Methodology
              </span>
              <motion.div
                animate={{ rotate: frameworkExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2.5"
              >
                <ArrowRight size={18} className="rotate-90" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ 
              height: frameworkExpanded ? 'auto' : 0,
              opacity: frameworkExpanded ? 1 : 0,
              marginBottom: frameworkExpanded ? '4rem' : 0
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.4 }
            }}
            className="overflow-hidden relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-card/90 via-card/70 to-card/50 border-2 border-accent/20 relative overflow-hidden max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.75_0.18_195_/_0.15),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.68_0.20_155_/_0.15),transparent_50%)] pointer-events-none" 
              />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4"
                  >
                    <span className="text-[0.6875rem] leading-tight font-black text-accent tracking-[0.14em]">TECHNICAL OVERVIEW</span>
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight tracking-[-0.02em]">Operational Framework & Endpoint Validation Methodology</h3>
                  <p className="text-muted-foreground text-[0.8125rem] leading-[1.65] tracking-[-0.01em]">
                    Technical overview of assist module operations and endpoint verification protocols for institutional compliance requirements
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ModuleFAQ />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mb-8 relative z-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.section
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-5xl py-16 px-8 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-2 border-accent/30 relative overflow-hidden"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.75_0.18_195/0.15),transparent_70%)]" 
              />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-accent/20 border-2 border-accent/30 mb-6">
                    <Rocket size={48} className="text-accent" weight="bold" />
                  </div>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  Transform Your Institutional Compliance Framework
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg text-muted-foreground mb-8 leading-relaxed"
                >
                  Join thousands of businesses using VIFIQ ACCOUNTS for governed access to premium infrastructure services
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    size="lg"
                    onClick={() => navigate('/signin')}
                    className="px-8 py-6 text-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
                  >
                    <UserCircle className="mr-2" size={24} weight="bold" />
                    Create Account
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      window.open('https://wa.me/', '_blank')
                    }}
                    className="px-8 py-6 text-lg border-2 border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
                  >
                    <CreditCard className="mr-2" size={24} />
                    Contact Sales
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          </motion.div>

          <Separator className="my-12 md:my-16 opacity-30" />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <ContactMicroSection />
          </motion.section>

          <Separator className="mb-12 opacity-30" />
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <ChatBot variant="inline" />
          </motion.section>
      </div>

      <Footer />
    </div>
  )
}
