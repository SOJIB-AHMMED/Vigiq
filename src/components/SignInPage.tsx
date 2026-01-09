import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, CheckCircle, XCircle, Warning, ArrowLeft } from '@phosphor-icons/react'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function SignInPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPin, setLoginPin] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerDisplayName, setRegisterDisplayName] = useState('')
  const [registerPin, setRegisterPin] = useState('')
  const [registerConfirmPin, setRegisterConfirmPin] = useState('')
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')

  const loginEmailRef = useRef<HTMLInputElement>(null)
  const registerEmailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeTab === 'signin') {
      loginEmailRef.current?.focus()
    } else {
      registerEmailRef.current?.focus()
    }
  }, [activeTab])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getEmailValidationState = (email: string): 'valid' | 'invalid' | 'empty' => {
    if (!email) return 'empty'
    return validateEmail(email) ? 'valid' : 'invalid'
  }

  const getPinValidationState = (pin: string): 'valid' | 'invalid' | 'empty' => {
    if (!pin) return 'empty'
    if (pin.length !== 4) return 'invalid'
    if (!/^\d{4}$/.test(pin)) return 'invalid'
    return 'valid'
  }

  const getPinMatchState = (pin: string, confirmPin: string): 'match' | 'mismatch' | 'empty' => {
    if (!confirmPin) return 'empty'
    if (!pin) return 'empty'
    return pin === confirmPin ? 'match' : 'mismatch'
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginEmail || !loginPin) {
      toast.error('Please enter email and PIN')
      return
    }

    if (getEmailValidationState(loginEmail) !== 'valid') {
      toast.error('Please enter a valid email address')
      return
    }

    if (getPinValidationState(loginPin) !== 'valid') {
      toast.error('PIN must be exactly 4 digits')
      return
    }

    setIsLoginLoading(true)
    
    setTimeout(() => {
      const success = login(loginEmail.toLowerCase().trim(), loginPin)
      setIsLoginLoading(false)
      
      if (success) {
        toast.success('Signed in successfully')
        navigate('/app/overview')
      } else {
        toast.error('Invalid email or PIN')
      }
    }, 500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registerEmail || !registerPin || !registerConfirmPin) {
      toast.error('Please fill all required fields')
      return
    }

    if (getEmailValidationState(registerEmail) !== 'valid') {
      toast.error('Please enter a valid email address')
      return
    }

    if (getPinValidationState(registerPin) !== 'valid') {
      toast.error('PIN must be exactly 4 digits (0-9)')
      return
    }

    if (getPinMatchState(registerPin, registerConfirmPin) !== 'match') {
      toast.error('PINs do not match')
      return
    }

    setIsRegisterLoading(true)

    setTimeout(() => {
      const success = register(
        registerEmail.toLowerCase().trim(), 
        registerPin,
        registerDisplayName.trim() || undefined
      )
      
      if (success) {
        toast.success('Account created successfully')
        const loginSuccess = login(registerEmail.toLowerCase().trim(), registerPin)
        setIsRegisterLoading(false)
        
        if (loginSuccess) {
          navigate('/app/overview')
        }
      } else {
        setIsRegisterLoading(false)
        toast.error('This email is already registered')
      }
    }, 500)
  }

  const loginEmailState = getEmailValidationState(loginEmail)
  const loginPinState = getPinValidationState(loginPin)
  const registerEmailState = getEmailValidationState(registerEmail)
  const registerPinState = getPinValidationState(registerPin)
  const pinMatchState = getPinMatchState(registerPin, registerConfirmPin)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.25_0.04_250),transparent_70%)] opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <Logo size="lg" className="text-accent w-40 h-32" />
          </div>
          <p className="text-muted-foreground text-sm mt-1">Virtual Banks • Betting • Company Formation</p>
        </div>

        <Card className="border-border/50 shadow-2xl shadow-black/20">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Access Your Account</CardTitle>
            <CardDescription className="text-base">Sign in or create a new governed account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Input
                        ref={loginEmailRef}
                        id="login-email"
                        type="email"
                        placeholder="admin@vifiq.io"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className={
                          loginEmailState === 'invalid'
                            ? 'border-destructive focus-visible:ring-destructive'
                            : loginEmailState === 'valid'
                            ? 'border-success focus-visible:ring-success'
                            : ''
                        }
                        required
                        autoComplete="email"
                      />
                      {loginEmailState === 'valid' && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-success" size={18} />
                      )}
                      {loginEmailState === 'invalid' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={18} />
                      )}
                    </div>
                    {loginEmailState === 'invalid' && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Warning size={12} />
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-pin">4-Digit PIN</Label>
                    <div className="relative">
                      <Input
                        id="login-pin"
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={loginPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          setLoginPin(val)
                        }}
                        className={
                          loginPinState === 'invalid'
                            ? 'border-destructive focus-visible:ring-destructive'
                            : loginPinState === 'valid'
                            ? 'border-success focus-visible:ring-success'
                            : ''
                        }
                        required
                        autoComplete="off"
                      />
                      {loginPinState === 'valid' && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-success" size={18} />
                      )}
                      {loginPinState === 'invalid' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={18} />
                      )}
                    </div>
                    {loginPinState === 'invalid' && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Warning size={12} />
                        PIN must be exactly 4 digits
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={isLoginLoading || loginEmailState !== 'valid' || loginPinState !== 'valid'}
                  >
                    {isLoginLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <div className="text-xs text-muted-foreground p-4 bg-muted/20 rounded-lg border border-border/30">
                    <p className="font-semibold mb-2 text-foreground flex items-center gap-2">
                      <Shield size={14} className="text-accent" />
                      Demo Accounts
                    </p>
                    <div className="space-y-1.5 font-mono text-xs">
                      <p className="text-muted-foreground/90">Admin: admin@vifiq.io / 1234</p>
                      <p className="text-muted-foreground/90">Operator: operator@example.com / 5678</p>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-display-name">Display Name (Optional)</Label>
                    <Input
                      id="register-display-name"
                      type="text"
                      placeholder="Your Name"
                      value={registerDisplayName}
                      onChange={(e) => setRegisterDisplayName(e.target.value)}
                      maxLength={50}
                      autoComplete="name"
                    />
                    <p className="text-xs text-muted-foreground">
                      How you'd like to be identified in the system
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <div className="relative">
                      <Input
                        ref={registerEmailRef}
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className={
                          registerEmailState === 'invalid'
                            ? 'border-destructive focus-visible:ring-destructive'
                            : registerEmailState === 'valid'
                            ? 'border-success focus-visible:ring-success'
                            : ''
                        }
                        required
                        autoComplete="email"
                      />
                      {registerEmailState === 'valid' && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-success" size={18} />
                      )}
                      {registerEmailState === 'invalid' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={18} />
                      )}
                    </div>
                    {registerEmailState === 'invalid' && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Warning size={12} />
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-pin">Create 4-Digit PIN</Label>
                    <div className="relative">
                      <Input
                        id="register-pin"
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={registerPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          setRegisterPin(val)
                        }}
                        className={
                          registerPinState === 'invalid'
                            ? 'border-destructive focus-visible:ring-destructive'
                            : registerPinState === 'valid'
                            ? 'border-success focus-visible:ring-success'
                            : ''
                        }
                        required
                        autoComplete="new-password"
                      />
                      {registerPinState === 'valid' && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-success" size={18} />
                      )}
                      {registerPinState === 'invalid' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={18} />
                      )}
                    </div>
                    {registerPinState === 'invalid' && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Warning size={12} />
                        PIN must be exactly 4 digits (0-9)
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-pin">Confirm PIN</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-pin"
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={registerConfirmPin}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          setRegisterConfirmPin(val)
                        }}
                        className={
                          pinMatchState === 'mismatch'
                            ? 'border-destructive focus-visible:ring-destructive'
                            : pinMatchState === 'match'
                            ? 'border-success focus-visible:ring-success'
                            : ''
                        }
                        required
                        autoComplete="new-password"
                      />
                      {pinMatchState === 'match' && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-success" size={18} />
                      )}
                      {pinMatchState === 'mismatch' && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive" size={18} />
                      )}
                    </div>
                    {pinMatchState === 'mismatch' && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Warning size={12} />
                        PINs do not match
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={
                      isRegisterLoading || 
                      registerEmailState !== 'valid' || 
                      registerPinState !== 'valid' || 
                      pinMatchState !== 'match'
                    }
                  >
                    {isRegisterLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <div className="text-xs text-muted-foreground p-4 bg-muted/20 rounded-lg border border-border/30">
                    <p className="flex items-center gap-2 mb-2">
                      <Shield size={14} className="text-accent" />
                      <span className="font-semibold text-foreground">Account Creation Policy</span>
                    </p>
                    <p className="ml-6 text-muted-foreground/90 leading-relaxed">
                      New accounts are assigned OPERATOR role with ACTIVE status. 
                      Identity validation is required before activating service modules.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-accent/10 hover:text-accent transition-all duration-300"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Homepage
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
