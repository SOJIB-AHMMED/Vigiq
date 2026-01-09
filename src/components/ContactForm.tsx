import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Phone, Envelope, WhatsappLogo, PaperPlaneTilt } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

type ContactMethod = 'whatsapp' | 'email' | 'phone'
type ServiceInterest = 
  | 'Company Formation'
  | 'Business Banking'
  | 'Marketplace Setup'
  | 'Virtual Banking'
  | 'Crypto Services'
  | 'Trading Accounts'
  | 'Custom Solution'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceInterest, setServiceInterest] = useState<ServiceInterest | ''>('')
  const [message, setMessage] = useState('')
  const [preferredContact, setPreferredContact] = useState<ContactMethod>('whatsapp')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in required fields')
      return
    }

    if (preferredContact === 'whatsapp' && !phone.trim()) {
      toast.error('Phone number required for WhatsApp contact')
      return
    }

    if (preferredContact === 'email' && !email.trim()) {
      toast.error('Email required for email contact')
      return
    }

    setIsSubmitting(true)

    const whatsappNumber = '1234567890'
    
    const whatsappMessage = encodeURIComponent(
      `Hi! I'm ${name}.\n\n` +
      `Service Interest: ${serviceInterest || 'Not specified'}\n\n` +
      `Message: ${message}\n\n` +
      `Contact: ${email || phone || 'Not provided'}`
    )

    setTimeout(() => {
      if (preferredContact === 'whatsapp') {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank')
        toast.success('Opening WhatsApp...', {
          description: 'Your message has been prepared'
        })
      } else {
        toast.success('Contact request submitted', {
          description: 'We will reach out to you shortly'
        })
      }

      setName('')
      setEmail('')
      setPhone('')
      setServiceInterest('')
      setMessage('')
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="contact-form"
    >
      <Card className="border-border/50 hover:border-accent/30 transition-all duration-300 shadow-lg shadow-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
          <CardDescription>
            Connect with our team for personalized service enablement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name *</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone / WhatsApp</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-interest">Service Interest</Label>
              <Select value={serviceInterest} onValueChange={(val) => setServiceInterest(val as ServiceInterest)}>
                <SelectTrigger id="service-interest">
                  <SelectValue placeholder="Select a service category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company Formation">Company Formation</SelectItem>
                  <SelectItem value="Business Banking">Business Banking</SelectItem>
                  <SelectItem value="Marketplace Setup">Marketplace Setup</SelectItem>
                  <SelectItem value="Virtual Banking">Virtual Banking</SelectItem>
                  <SelectItem value="Crypto Services">Crypto Services</SelectItem>
                  <SelectItem value="Trading Accounts">Trading Accounts</SelectItem>
                  <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your requirements..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred Contact Method</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={preferredContact === 'whatsapp' ? 'default' : 'outline'}
                  className={preferredContact === 'whatsapp' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
                  onClick={() => setPreferredContact('whatsapp')}
                >
                  <WhatsappLogo size={18} className="mr-2" />
                  WhatsApp
                </Button>
                <Button
                  type="button"
                  variant={preferredContact === 'email' ? 'default' : 'outline'}
                  className={preferredContact === 'email' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
                  onClick={() => setPreferredContact('email')}
                >
                  <Envelope size={18} className="mr-2" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={preferredContact === 'phone' ? 'default' : 'outline'}
                  className={preferredContact === 'phone' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}
                  onClick={() => setPreferredContact('phone')}
                >
                  <Phone size={18} className="mr-2" />
                  Phone
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <PaperPlaneTilt size={18} className="mr-2" />
                  {preferredContact === 'whatsapp' ? 'Continue on WhatsApp' : 'Submit Request'}
                </>
              )}
            </Button>

            {preferredContact === 'whatsapp' && (
              <p className="text-xs text-muted-foreground text-center">
                You'll be redirected to WhatsApp with your message pre-filled
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
