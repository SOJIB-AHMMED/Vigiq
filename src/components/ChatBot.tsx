import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { X, PaperPlaneRight, ChatCircleDots, Robot, User, UserCircle, Minus, ArrowsOutSimple, Phone } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { ChatBotLogo } from './ChatBotLogo'
import { useIsMobile } from '@/hooks/use-mobile'

interface Message {
  id: string
  role: 'user' | 'bot' | 'human'
  content: string
  timestamp: Date
  agentName?: string
}

type AgentMode = 'bot' | 'human' | 'escalating'

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'bot',
    content: 'Welcome to VIFIQ ACCOUNTS Enterprise Support. I\'m your dedicated AI assistant, ready to help you understand our governance platform—including service offerings, ordering processes, usage guidance, and compliance requirements. How may I assist you today?',
    timestamp: new Date()
  }
]

const QUICK_QUESTIONS = [
  'How do I order a service?',
  'What is the validation process?',
  'Tell me about virtual banking',
  'How do I use NUMSYNC?',
  'What are Assist Modules?',
  'Pricing information?'
]

interface ChatBotProps {
  variant?: 'floating' | 'inline'
}

export function ChatBot({ variant = 'floating' }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentMode, setAgentMode] = useState<AgentMode>('bot')
  const [escalationRequested, setEscalationRequested] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const isInline = variant === 'inline'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const shouldEscalateToHuman = (userMessage: string): boolean => {
    const lowerMessage = userMessage.toLowerCase()
    
    const escalationKeywords = [
      'speak to human', 'talk to person', 'real person', 'human agent',
      'not helpful', 'doesn\'t help', 'still confused', 'don\'t understand',
      'technical issue', 'problem with', 'bug', 'error', 'not working',
      'urgent', 'emergency', 'asap', 'immediately',
      'refund', 'cancel', 'complaint', 'unhappy', 'disappointed'
    ]
    
    return escalationKeywords.some(keyword => lowerMessage.includes(keyword))
  }

  const generateBotResponse = async (userMessage: string): Promise<{ response: string; needsEscalation: boolean }> => {
    const lowerMessage = userMessage.toLowerCase()

    if (shouldEscalateToHuman(lowerMessage)) {
      return {
        response: 'I understand you may need more specialized assistance. Would you like me to connect you with a human agent? They can provide more detailed support and resolve complex issues. Just let me know!',
        needsEscalation: true
      }
    }

    if (lowerMessage.includes('how to order') || lowerMessage.includes('how do i order') || lowerMessage.includes('ordering process')) {
      return {
        response: 'Ordering is simple:\n\n1. Browse services on our homepage or marketplace\n2. Click on the service you need\n3. Review requirements and pricing\n4. Click "Order via WhatsApp"\n5. Our team will guide you through validation and setup\n\nAll orders require identity validation before activation.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('how to use') || lowerMessage.includes('how do i use')) {
      return {
        response: 'Once your service is activated:\n\n• Access credentials are delivered via secure channel\n• Login instructions included with setup\n• 24/7 support available via WhatsApp\n• Audit logs track all activity\n• Licenses are time-bound and renewable\n\nEach service comes with complete documentation and onboarding support.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('what is vifiq') || lowerMessage.includes('what services')) {
      return {
        response: 'VIFIQ ACCOUNTS is an enterprise-grade governance platform providing:\n\n• Virtual Banking (Wise, Revolut, N26)\n• Betting Accounts (Bet365, Betfair)\n• Company Formation (UK, USA, EU)\n• Assist Modules (NUMSYNC, SYNCPLAYER, SYNC-IP)\n\nAll services operate under structured validation, time-bound licensing, and full audit compliance.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('validation') || lowerMessage.includes('verify') || lowerMessage.includes('compliance')) {
      return {
        response: 'Our validation process ensures compliance:\n\n• Identity verification required\n• Jurisdiction-specific checks\n• Risk assessment performed\n• All validations time-bound\n• Full audit trail maintained\n\nValidation typically completes within 24-48 hours depending on jurisdiction.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('numsync') || lowerMessage.includes('syncplayer') || lowerMessage.includes('sync-ip') || lowerMessage.includes('assist module')) {
      return {
        response: 'Our Assist Modules provide operational support:\n\n• NUMSYNC: Virtual SIM lifecycle management\n• SYNCPLAYER: Controlled emulator environments\n• SYNC-IP: Governed proxy/VPN access\n\nAll modules require validation and operate under compliance enforcement. They assist execution but don\'t provide standalone infrastructure.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('virtual bank') || lowerMessage.includes('wise') || lowerMessage.includes('revolut') || lowerMessage.includes('n26')) {
      return {
        response: 'Virtual Banking services include:\n\n• Wise: Multi-currency accounts\n• Revolut: Digital banking platform\n• N26: EU banking access\n• Business Accounts: Corporate-ready\n\nAll accounts come fully verified, setup complete, and ready for international transactions.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('betting') || lowerMessage.includes('bet365') || lowerMessage.includes('betfair')) {
      return {
        response: 'Betting Account infrastructure:\n\n• Bet365: Verified accounts\n• Betfair: Exchange access\n• High-limit access available\n• Multi-bookmaker options\n\nAll accounts are fully verified with complete compliance documentation and ready for immediate use.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('company') || lowerMessage.includes('formation') || lowerMessage.includes('uk ltd') || lowerMessage.includes('llc')) {
      return {
        response: 'Company Formation services:\n\n• UK LTD: Fast-track setup\n• USA LLC/C-Corp: Full registration\n• EU Entities: Multi-jurisdiction\n• Banking-ready packages available\n\nIncludes registration, compliance docs, and ongoing support.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return {
        response: 'Pricing varies by service complexity:\n\n• Standard services: $250-$800\n• Premium packages: $800-$1,500+\n• Custom solutions: Quote on request\n\nContact us via WhatsApp for detailed pricing on your specific needs.',
        needsEscalation: false
      }
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('whatsapp') || lowerMessage.includes('support')) {
      return {
        response: 'Reach our team directly:\n\n• WhatsApp: Available on service pages\n• 24/7 coverage for urgent requests\n• Response time: <2 hours typically\n• Full intake and consultation provided\n\nClick any "Order via WhatsApp" button to connect.',
        needsEscalation: false
      }
    }

    try {
      const prompt = `You are an AI assistant for VIFIQ ACCOUNTS, helping users understand how to order services, how to use them, and answering general questions.

Context: VIFIQ ACCOUNTS provides governed infrastructure for virtual banking, betting accounts, company formation, and assist modules. Focus on being helpful about ordering process, usage instructions, and service explanations.

User question: ${userMessage}

Provide a helpful, clear response (3-4 sentences max) that:
- Explains how to order or use the service if relevant
- Provides step-by-step guidance when appropriate
- Directs complex technical issues to human agents
- Maintains professional, friendly tone

If you cannot provide a satisfactory answer to their problem, suggest connecting with a human agent.

Response:`

      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      const needsEscalation = lowerMessage.includes('complex') || lowerMessage.includes('specific') || response.toLowerCase().includes('human agent')
      
      return { response: response.trim(), needsEscalation }
    } catch (error) {
      return {
        response: 'I apologize, but I\'m having trouble processing that request. Would you like me to connect you with a human agent for immediate assistance?',
        needsEscalation: true
      }
    }
  }

  const escalateToHuman = () => {
    setAgentMode('escalating')
    setIsTyping(true)
    
    setTimeout(() => {
      const escalationMessage: Message = {
        id: Date.now().toString(),
        role: 'bot',
        content: 'Connecting you with a human agent now. Please hold for a moment...',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, escalationMessage])
      
      setTimeout(() => {
        const humanMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'human',
          content: 'Hello, I\'m Sarah Mitchell, Senior Support Specialist at VIFIQ. I\'ve reviewed your conversation and I\'m here to provide personalized assistance. What can I help you with today?',
          timestamp: new Date(),
          agentName: 'Sarah Mitchell'
        }
        setMessages(prev => [...prev, humanMessage])
        setAgentMode('human')
        setIsTyping(false)
        setEscalationRequested(false)
        toast.success('Connected to human agent')
      }, 2000)
    }, 800)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = input.trim()
    setInput('')
    setIsTyping(true)

    if (agentMode === 'human') {
      setTimeout(() => {
        const humanResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'human',
          content: 'Thank you for providing that information. Let me review your requirements and find the best solution for you. For immediate, real-time assistance with service activation or technical matters, I recommend contacting our team via WhatsApp—we\'re available 24/7 to handle your request directly.',
          timestamp: new Date(),
          agentName: 'Sarah Mitchell'
        }
        setMessages(prev => [...prev, humanResponse])
        setIsTyping(false)
      }, 1500)
      return
    }

    if (userInput.toLowerCase().includes('yes') && escalationRequested) {
      escalateToHuman()
      return
    }

    try {
      const { response: responseContent, needsEscalation } = await generateBotResponse(userInput)
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: responseContent,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
        
        if (needsEscalation) {
          setEscalationRequested(true)
        }
      }, 800)
    } catch (error) {
      toast.error('Failed to get response. Please try again.')
      setIsTyping(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const getMobileHeight = () => {
    if (!isMobile) return isExpanded ? 'h-[280px]' : 'h-[220px]'
    return isExpanded ? 'h-[55vh]' : 'h-[40vh]'
  }

  const chatWidth = isInline 
    ? 'w-full max-w-5xl mx-auto' 
    : (isMobile ? 'w-[85vw]' : (isExpanded ? 'w-[280px]' : 'w-[220px]'))
  const chatHeight = getMobileHeight()

  if (isInline) {
    if (!isOpen) {
      return (
        <div className="relative z-10 w-full flex justify-center">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="group px-8 py-6 bg-card hover:bg-card/80 text-foreground border-2 border-border/60 hover:border-accent/60 transition-all duration-300"
            style={{
              boxShadow: '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.75 0.18 195 / 0.2), inset 0 1px 0 oklch(0.75 0.18 195 / 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.6), 0 16px 48px -8px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.75 0.18 195 / 0.4), inset 0 2px 4px oklch(0.75 0.18 195 / 0.25)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.3), 0 0 0 1px oklch(0.75 0.18 195 / 0.2), inset 0 1px 0 oklch(0.75 0.18 195 / 0.15)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="scale-[0.5]">
                  <ChatBotLogo size="sm" />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-success border-2 border-background" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-foreground leading-tight">Support</span>
                <span className="text-xs text-muted-foreground font-medium leading-tight">Get help from VIFIQ ASSIST</span>
              </div>
              <ChatCircleDots size={24} className="text-accent ml-2" weight="bold" />
            </div>
          </Button>
        </div>
      )
    }

    return (
      <div className="relative z-10 w-full">
        <Card className="border-border shadow-lg overflow-hidden bg-card rounded-lg">
          <CardHeader className="bg-card border-b border-border/50 pb-3 pt-3 relative">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className={`relative p-2 rounded-lg bg-gradient-to-br border ${
                    agentMode === 'human'
                      ? 'from-accent/20 to-accent/10 border-accent/30'
                      : 'from-card to-muted border-border/50'
                  }`}>
                    {agentMode === 'human' ? (
                      <UserCircle size={20} weight="fill" className="text-accent" />
                    ) : (
                      <div className="scale-[0.55]">
                        <ChatBotLogo size="sm" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-foreground text-sm font-bold tracking-wide truncate">
                      VIFIQ ASSIST
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] px-1.5 py-0.5 font-semibold flex-shrink-0 ${
                        agentMode === 'human' 
                          ? 'bg-accent/20 text-accent border-accent/40' 
                          : 'bg-muted/50 text-muted-foreground border-border/50'
                      }`}
                    >
                      {agentMode === 'human' ? '👤 HUMAN' : '🤖 BOT'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span className="text-[10px] text-muted-foreground font-medium truncate">
                      {agentMode === 'human' ? 'Sarah Mitchell - Senior Support Specialist' : 'AI Assistant - Ready to help 24/7'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpand}
                  className={`h-7 w-7 p-0 hover:bg-muted/50 hover:text-foreground rounded-md ${isExpanded ? 'bg-muted/40' : ''}`}
                  title={isExpanded ? "Normal size" : "Expand"}
                >
                  <ArrowsOutSimple size={12} weight="bold" className={isExpanded ? 'rotate-180' : ''} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="h-7 w-7 p-0 hover:bg-muted/50 hover:text-foreground rounded-md"
                  title="Minimize"
                >
                  <Minus size={12} weight="bold" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-7 w-7 p-0 hover:bg-destructive/20 hover:text-destructive rounded-md border border-transparent hover:border-destructive/30"
                  title="Close"
                >
                  <X size={12} weight="bold" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0">
              <ScrollArea className={`${isExpanded ? 'h-[400px]' : 'h-[300px]'} p-3`} ref={scrollRef}>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        message.role === 'bot'
                          ? 'bg-muted/50 border border-border/40' 
                          : message.role === 'human'
                          ? 'bg-accent/15 border border-accent/30'
                          : 'bg-primary/20 border border-primary/30'
                      }`}>
                        {message.role === 'bot' ? (
                          <Robot size={14} weight="bold" className="text-muted-foreground" />
                        ) : message.role === 'human' ? (
                          <UserCircle size={14} weight="fill" className="text-accent" />
                        ) : (
                          <User size={14} weight="bold" className="text-primary" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.agentName && (
                          <p className="text-[10px] font-medium text-accent mb-1 px-1">{message.agentName}</p>
                        )}
                        <div className={`inline-block px-3 py-2 rounded-lg max-w-[85%] ${
                          message.role === 'bot'
                            ? 'bg-muted/50 text-foreground border border-border/40'
                            : message.role === 'human'
                            ? 'bg-accent/15 text-foreground border border-accent/30'
                            : 'bg-primary text-primary-foreground'
                        }`}>
                          <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <p className="text-[9px] text-muted-foreground mt-1 px-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2.5">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        agentMode === 'human'
                          ? 'bg-accent/15 border border-accent/30'
                          : 'bg-muted/50 border border-border/40'
                      }`}>
                        {agentMode === 'human' ? (
                          <UserCircle size={14} weight="fill" className="text-accent" />
                        ) : (
                          <Robot size={14} weight="bold" className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-3 py-2 rounded-lg bg-muted/50 border border-border/40">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.length === 1 && !isTyping && (
                    <div className="space-y-2 mt-3">
                      <p className="text-[10px] text-muted-foreground text-center mb-2.5 font-medium">Quick questions to get started:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {QUICK_QUESTIONS.map((question) => (
                          <button
                            key={question}
                            onClick={() => handleQuickQuestion(question)}
                            className="w-full text-left px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted/60 border border-border/40 hover:border-accent/30 text-[10px] text-foreground transition-all duration-200"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {escalationRequested && agentMode === 'bot' && !isTyping && (
                    <div className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
                      <p className="text-[10px] text-foreground mb-2.5">Would you like to connect with a human agent for more personalized assistance?</p>
                      <Button
                        onClick={escalateToHuman}
                        size="sm"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-8 text-[10px]"
                      >
                        <Phone size={12} weight="bold" className="mr-1.5" />
                        Yes, Connect Me to Human Agent
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-border/40 bg-muted/20">
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
                    placeholder={agentMode === 'human' ? 'Message Sarah...' : 'Ask about services, ordering, or usage...'}
                    className="flex-1 bg-background/80 border-border/60 focus:border-ring/60 focus:ring-1 focus:ring-ring/20 rounded-lg h-10 text-[11px]"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim() || isTyping}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 rounded-lg h-10 disabled:opacity-50"
                  >
                    <PaperPlaneRight size={14} weight="bold" />
                  </Button>
                </form>
                <p className="text-[9px] text-muted-foreground mt-2 text-center font-medium">
                  {agentMode === 'human' ? '🟢 Connected to live support' : '🤖 AI-Powered Assistant • Available 24/7'}
                </p>
              </div>
            </CardContent>
          )}

          {isMinimized && (
            <CardContent className="p-4">
              <Button
                onClick={toggleMinimize}
                variant="outline"
                size="sm"
                className="w-full border-accent/30 hover:border-accent/60 hover:bg-accent/10"
              >
                <ChatCircleDots size={16} className="mr-2 text-accent" weight="bold" />
                <span className="text-sm">Show Chat</span>
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="sm"
                className="h-8 px-2 md:h-9 md:px-2.5 rounded-md bg-card hover:bg-card/80 border border-border/60 hover:border-accent/50 transition-all duration-300 relative group"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px',
                  boxShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.2),
                    0 3px 6px rgba(0, 0, 0, 0.15),
                    0 6px 12px rgba(0, 0, 0, 0.1),
                    inset 0 1px 1px rgba(117, 190, 170, 0.08),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(117, 190, 170, 0.12)
                  `.trim().replace(/\s+/g, ' ')
                }}
              >
                <div 
                  className="absolute inset-0 rounded-md pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  style={{
                    boxShadow: 'inset 0 -2px 4px rgba(117, 190, 170, 0.15), inset 0 2px 2px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: '0 0 12px rgba(117, 190, 170, 0.25), 0 0 24px rgba(117, 190, 170, 0.12)'
                  }}
                />
                <div className="flex items-center gap-1.5 relative z-10">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut" 
                      }}
                    >
                      <ChatBotLogo size="sm" className="scale-[0.35] md:scale-[0.4]" />
                    </motion.div>
                    <motion.div 
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-success border border-background"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 4px rgba(117,190,170,0.6), 0 0 8px rgba(117,190,170,0.3)'
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] md:text-[10px] font-semibold text-foreground leading-tight">Support</span>
                    <span className="text-[8px] text-muted-foreground font-medium leading-tight">VIFIQ ASSIST</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className={`fixed ${isMobile ? 'bottom-0 left-1/2 -translate-x-1/2' : 'bottom-4 right-4'} z-50 ${chatWidth} ${isMobile ? 'max-w-none' : 'max-w-[calc(100vw-2rem)]'}`}
          >
            <Card className="border-border shadow-md overflow-hidden bg-card rounded-t-lg md:rounded-lg">
              <CardHeader className="bg-card border-b border-border/50 pb-2 pt-2 relative">
                {isMobile && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-border/40 rounded-full" />
                )}
                  <div className="flex items-center justify-between relative z-10 mt-0.5">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div className={`relative p-1 rounded-md bg-gradient-to-br border ${
                        agentMode === 'human'
                          ? 'from-accent/20 to-accent/10 border-accent/30'
                          : 'from-card to-muted border-border/50'
                      }`}>
                        {agentMode === 'human' ? (
                          <UserCircle size={14} weight="fill" className="text-accent" />
                        ) : (
                          <div className="scale-[0.35]">
                            <ChatBotLogo size="sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <CardTitle className="text-foreground text-[10px] md:text-xs font-bold tracking-wide truncate">
                          VIFIQ ASSIST
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-[8px] md:text-[9px] px-1 py-0.5 font-semibold flex-shrink-0 ${
                            agentMode === 'human' 
                              ? 'bg-accent/20 text-accent border-accent/40' 
                              : 'bg-muted/50 text-muted-foreground border-border/50'
                          }`}
                        >
                          {agentMode === 'human' ? '👤 HUMAN' : '🤖 BOT'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-success" />
                        <span className="text-[8px] md:text-[9px] text-muted-foreground font-medium truncate">
                          {agentMode === 'human' ? 'Sarah Mitchell' : 'AI Assistant'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleExpand}
                      className={`h-5 w-5 md:h-6 md:w-6 p-0 hover:bg-muted/50 hover:text-foreground rounded-sm ${isExpanded ? 'bg-muted/40' : ''}`}
                      title={isExpanded ? "Normal size" : "Expand"}
                    >
                      <ArrowsOutSimple size={10} weight="bold" className={isExpanded ? 'rotate-180' : ''} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMinimize}
                      className="h-5 w-5 md:h-6 md:w-6 p-0 hover:bg-muted/50 hover:text-foreground rounded-sm"
                      title="Minimize"
                    >
                      <Minus size={10} weight="bold" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsOpen(false)
                        setIsMinimized(false)
                      }}
                      className="h-5 w-5 md:h-6 md:w-6 p-0 hover:bg-destructive/20 hover:text-destructive rounded-sm border border-transparent hover:border-destructive/30"
                      title="Close"
                    >
                      <X size={11} weight="bold" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className={`${chatHeight} p-2 md:p-2.5`} ref={scrollRef}>
                  <div className="space-y-2 md:space-y-2.5">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center ${
                          message.role === 'bot'
                            ? 'bg-muted/50 border border-border/40' 
                            : message.role === 'human'
                            ? 'bg-accent/15 border border-accent/30'
                            : 'bg-primary/20 border border-primary/30'
                        }`}>
                          {message.role === 'bot' ? (
                            <Robot size={12} weight="bold" className="text-muted-foreground" />
                          ) : message.role === 'human' ? (
                            <UserCircle size={12} weight="fill" className="text-accent" />
                          ) : (
                            <User size={12} weight="bold" className="text-primary" />
                          )}
                        </div>
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                          {message.agentName && (
                            <p className="text-[9px] font-medium text-accent mb-1 px-1">{message.agentName}</p>
                          )}
                          <div className={`inline-block px-2 py-1.5 md:px-2.5 md:py-2 rounded-lg max-w-[85%] ${
                            message.role === 'bot'
                              ? 'bg-muted/50 text-foreground border border-border/40'
                              : message.role === 'human'
                              ? 'bg-accent/15 text-foreground border border-accent/30'
                              : 'bg-primary text-primary-foreground'
                          }`}>
                            <p className="text-[10px] md:text-[11px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className="text-[8px] md:text-[9px] text-muted-foreground mt-0.5 px-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-2">
                        <div className={`flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center ${
                          agentMode === 'human'
                            ? 'bg-accent/15 border border-accent/30'
                            : 'bg-muted/50 border border-border/40'
                        }`}>
                          {agentMode === 'human' ? (
                            <UserCircle size={12} weight="fill" className="text-accent" />
                          ) : (
                            <Robot size={12} weight="bold" className="text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="inline-block px-2 py-1.5 md:px-2.5 md:py-2 rounded-lg bg-muted/50 border border-border/40">
                            <div className="flex gap-1">
                              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {messages.length === 1 && !isTyping && (
                      <div className="space-y-1.5 mt-2">
                        <p className="text-[9px] text-muted-foreground text-center mb-2 font-medium">Quick questions:</p>
                        {QUICK_QUESTIONS.map((question) => (
                          <button
                            key={question}
                            onClick={() => handleQuickQuestion(question)}
                            className="w-full text-left px-2 py-1.5 rounded-md bg-muted/40 hover:bg-muted/60 border border-border/40 text-[9px] md:text-[10px] text-foreground"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    )}

                    {escalationRequested && agentMode === 'bot' && !isTyping && (
                      <div className="mt-2 p-2 rounded-md bg-accent/10 border border-accent/30">
                        <p className="text-[9px] md:text-[10px] text-foreground mb-2">Connect with a human agent?</p>
                        <Button
                          onClick={escalateToHuman}
                          size="sm"
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-7 text-[9px] md:text-[10px]"
                        >
                          <Phone size={10} weight="bold" className="mr-1" />
                          Yes, Connect Me
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-2 md:p-2.5 border-t border-border/40 bg-muted/20 pb-safe">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex gap-1"
                  >
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={agentMode === 'human' ? 'Message Sarah...' : 'Ask about services...'}
                      className="flex-1 bg-background/80 border-border/60 focus:border-ring/60 focus:ring-1 focus:ring-ring/20 rounded-md h-8 md:h-9 text-[10px] md:text-[11px]"
                      disabled={isTyping}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!input.trim() || isTyping}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-2.5 md:px-3 rounded-md h-8 md:h-9 disabled:opacity-50"
                    >
                      <PaperPlaneRight size={12} weight="bold" />
                    </Button>
                  </form>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground mt-1.5 text-center font-medium">
                    {agentMode === 'human' ? '🟢 Connected to live support' : '🤖 AI-Powered'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
          >
            <Button
              onClick={toggleMinimize}
              size="sm"
              className="h-9 md:h-10 px-2.5 md:px-3 rounded-md bg-card hover:bg-card/80 shadow-sm border border-border/60 hover:border-border"
            >
              <div className="flex items-center gap-2">
                <div className="scale-[0.35] md:scale-[0.4]">
                  <ChatBotLogo size="sm" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] md:text-[10px] font-bold text-foreground tracking-wide">VIFIQ ASSIST</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-success" />
                    <span className="text-[8px] md:text-[9px] text-muted-foreground font-medium">{agentMode === 'human' ? 'Human Agent' : 'AI Online'}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                    setIsMinimized(false)
                  }}
                  className="h-5 w-5 p-0 ml-1 hover:bg-muted/50 hover:text-foreground rounded-sm"
                  title="Close"
                >
                  <X size={10} weight="bold" />
                </Button>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
