import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Headset, PaperPlaneRight, Robot, User } from '@phosphor-icons/react'
import { useAuth } from '@/lib/auth'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const QUICK_ACTIONS = [
  { id: 'modules', label: 'Module Information', prompt: 'Tell me about available modules' },
  { id: 'validation', label: 'Validation Process', prompt: 'How does the validation process work?' },
  { id: 'billing', label: 'Billing Help', prompt: 'Help me understand billing' },
  { id: 'account', label: 'Account Settings', prompt: 'How do I manage my account?' },
  { id: 'technical', label: 'Technical Support', prompt: 'I need technical assistance' }
]

interface SupportChatProps {
  onClose?: () => void
}

export function SupportChat({ onClose }: SupportChatProps) {
  const { getCurrentUser } = useAuth()
  const currentUser = getCurrentUser()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your VIFIQ support assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('module') || lowerMessage.includes('marketplace')) {
      return 'Our platform offers several modules:\n\n• Virtual Number Access - Provides governed phone number services\n• Emulator Access - Managed emulation environment access\n• Proxy/VPN Access - Secure network infrastructure\n\nEach module requires proper validation and entitlements. Would you like to know more about a specific module?'
    }

    if (lowerMessage.includes('validation') || lowerMessage.includes('verify')) {
      return 'The validation process ensures account integrity:\n\n1. Submit validation request\n2. Provide required evidence\n3. Admin review (typically 24-48 hours)\n4. Approval or rejection with feedback\n\nValidations are required before activating certain modules. You can check your validation status in the Validation section.'
    }

    if (lowerMessage.includes('billing') || lowerMessage.includes('payment') || lowerMessage.includes('price')) {
      return 'Billing information:\n\n• Top up your wallet balance\n• Monthly subscription fees per module\n• Usage-based charges where applicable\n• All transactions are logged in your Billing section\n\nYour current balance is visible on your dashboard. Need help with a specific transaction?'
    }

    if (lowerMessage.includes('account') || lowerMessage.includes('profile') || lowerMessage.includes('settings')) {
      return 'You can manage your account in several ways:\n\n• Update profile information (Profile page)\n• Change PIN and email (Settings)\n• Adjust region settings (Settings)\n• View audit logs (Audit Log section)\n\nAll account changes are tracked for security purposes.'
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I can help you with:\n\n• Module information and activation\n• Validation process questions\n• Billing and payments\n• Account management\n• Audit and compliance\n\nWhat would you like to know more about?'
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello${currentUser?.displayName ? ` ${currentUser.displayName}` : ''}! How can I assist you with your VIFIQ account today?`
    }

    try {
      if (typeof window !== 'undefined' && window.spark) {
        const promptText = `You are a helpful support assistant for VIFIQ Control Layer, a governance platform for identity, validation, licensing, and auditability. The user asked: "${userMessage}". Provide a concise, professional response about VIFIQ's features, validation process, modules, or account management. Keep the response under 150 words.`
        const response = await window.spark.llm(promptText, 'gpt-4o-mini')
        return response
      }
      return 'I\'m here to help with questions about modules, validations, billing, and account settings. Could you please rephrase your question or choose one of the quick action buttons above?'
    } catch (error) {
      return 'I\'m here to help with questions about modules, validations, billing, and account settings. Could you please rephrase your question or choose one of the quick action buttons above?'
    }
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    try {
      const responseText = await generateResponse(text)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support@vifiq.com for assistance.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
      inputRef.current?.focus()
    }
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <Card 
      ref={cardRef}
      style={{
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.75 0.18 195 / 0.2), inset 0 1px 0 oklch(0.75 0.18 195 / 0.15)',
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Headset size={20} weight="duotone" className="text-accent" />
          <CardTitle className="text-lg">Support Chat</CardTitle>
        </div>
        <CardDescription>Ask questions about your account and modules</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[500px]">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {QUICK_ACTIONS.map(action => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.prompt)}
                  disabled={isProcessing}
                  className="text-xs h-auto py-2 justify-start hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all active:scale-95"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={message.role === 'assistant' ? 'bg-accent/20' : 'bg-primary/20'}>
                        {message.role === 'assistant' ? (
                          <Robot size={16} weight="duotone" className="text-accent" />
                        ) : (
                          <User size={16} weight="duotone" className="text-primary" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                      <div
                        className={`inline-block rounded-lg p-3 max-w-[85%] ${
                          message.role === 'assistant'
                            ? 'bg-muted/50 border border-border/50'
                            : 'bg-accent/90 text-accent-foreground'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-accent/20">
                      <Robot size={16} weight="duotone" className="text-accent animate-pulse" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 border border-border/50 rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isProcessing}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isProcessing}
                className="shrink-0 hover:bg-accent hover:text-accent-foreground transition-all active:scale-95"
              >
                <PaperPlaneRight size={18} weight="bold" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
