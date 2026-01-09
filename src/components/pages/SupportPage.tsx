import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SupportChat } from '@/components/SupportChat'
import { Headset, EnvelopeSimple, BookOpen, ChatsCircle } from '@phosphor-icons/react'

const SUPPORT_RESOURCES = [
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    icon: BookOpen,
    action: 'View Docs',
    link: '#'
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Reach our team at support@vifiq.com',
    icon: EnvelopeSimple,
    action: 'Send Email',
    link: 'mailto:support@vifiq.com'
  },
  {
    id: 'community',
    title: 'Community Forum',
    description: 'Connect with other VIFIQ users',
    icon: ChatsCircle,
    action: 'Join Forum',
    link: '#'
  }
]

export function SupportPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <Headset size={32} weight="duotone" className="text-accent" />
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Support</h1>
          <p className="text-sm text-muted-foreground">Get help with your VIFIQ account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {SUPPORT_RESOURCES.map((resource) => {
          const Icon = resource.icon
          return (
            <Card key={resource.id} className="hover:border-accent/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={24} weight="duotone" className="text-accent" />
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all active:scale-95"
                  onClick={() => {
                    if (resource.link.startsWith('mailto:')) {
                      window.location.href = resource.link
                    }
                  }}
                >
                  {resource.action}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <SupportChat />
    </div>
  )
}
