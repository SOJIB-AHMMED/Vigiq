import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  ChatsCircle, 
  TrendUp, 
  Clock, 
  MagnifyingGlass, 
  Plus,
  Chat,
  CheckCircle,
  Fire,
  ArrowUp,
  User
} from '@phosphor-icons/react'
import { useAuth } from '@/lib/auth'
import { useKV } from '@github/spark/hooks'

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorEmail: string
  category: string
  upvotes: number
  replies: number
  views: number
  isResolved: boolean
  createdAt: Date
  lastActivity: Date
}

const CATEGORIES = [
  { id: 'general', label: 'General Discussion', color: 'bg-accent/20 text-accent' },
  { id: 'modules', label: 'Modules', color: 'bg-chart-1/20 text-chart-1' },
  { id: 'validation', label: 'Validation', color: 'bg-chart-2/20 text-chart-2' },
  { id: 'billing', label: 'Billing', color: 'bg-chart-3/20 text-chart-3' },
  { id: 'technical', label: 'Technical', color: 'bg-warning/20 text-warning' }
]

const INITIAL_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'How long does validation typically take?',
    content: 'I submitted my validation request 2 days ago...',
    author: 'J. Smith',
    authorEmail: 'j.smith@example.com',
    category: 'validation',
    upvotes: 12,
    replies: 5,
    views: 148,
    isResolved: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Best practices for module activation',
    content: 'What are the recommended steps for activating multiple modules?',
    author: 'A. Chen',
    authorEmail: 'a.chen@example.com',
    category: 'modules',
    upvotes: 24,
    replies: 8,
    views: 312,
    isResolved: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Understanding usage-based billing',
    content: 'Can someone explain how the usage charges are calculated?',
    author: 'M. Kumar',
    authorEmail: 'm.kumar@example.com',
    category: 'billing',
    upvotes: 18,
    replies: 12,
    views: 256,
    isResolved: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'API integration examples needed',
    content: 'Looking for code examples for integrating with VIFIQ API...',
    author: 'R. Patel',
    authorEmail: 'r.patel@example.com',
    category: 'technical',
    upvotes: 31,
    replies: 15,
    views: 421,
    isResolved: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 15 * 60 * 1000)
  }
]

export function ForumPage() {
  const { getCurrentUser } = useAuth()
  const currentUser = getCurrentUser()
  const [posts, setPosts] = useKV<ForumPost[]>('forum-posts', INITIAL_POSTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const postsData = posts || INITIAL_POSTS

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0]
  }

  const filteredPosts = postsData.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPosts = {
    trending: [...filteredPosts].sort((a, b) => b.upvotes - a.upvotes),
    recent: [...filteredPosts].sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime()),
    unanswered: [...filteredPosts].filter(p => !p.isResolved).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const PostCard = ({ post }: { post: ForumPost }) => {
    const category = getCategoryInfo(post.category)
    
    return (
      <Card className="hover:shadow-md transition-all cursor-pointer hover:border-accent/30">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 min-w-[50px]">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-accent/10 hover:text-accent"
              >
                <ArrowUp size={18} />
              </Button>
              <span className="text-sm font-semibold">{post.upvotes}</span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-base">{post.title}</h3>
                    {post.isResolved && (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        <CheckCircle size={12} className="mr-1" />
                        Resolved
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs bg-muted">
                        {getInitials(post.author)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                  </div>
                  <Separator orientation="vertical" className="h-3" />
                  <Badge variant="outline" className={category.color}>
                    {category.label}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Chat size={14} />
                    <span>{post.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{formatTimeAgo(post.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ChatsCircle size={32} weight="duotone" className="text-accent" />
            <h1 className="text-3xl font-bold">Community Forum</h1>
          </div>
          <p className="text-muted-foreground">Connect, share knowledge, and get help from the community</p>
        </div>
        <Button className="gap-2 hover:shadow-md transition-all active:scale-95">
          <Plus size={18} weight="bold" />
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Chat size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{postsData.length}</p>
                <p className="text-xs text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle size={24} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{postsData.filter(p => p.isResolved).length}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Fire size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{postsData.filter(p => p.upvotes > 20).length}</p>
                <p className="text-xs text-muted-foreground">Trending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {CATEGORIES.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trending">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="trending" className="gap-2">
                <TrendUp size={16} />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="gap-2">
                <Clock size={16} />
                Recent
              </TabsTrigger>
              <TabsTrigger value="unanswered" className="gap-2">
                <Chat size={16} />
                Unanswered
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-3">
              {sortedPosts.trending.length > 0 ? (
                sortedPosts.trending.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No posts found matching your criteria
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-3">
              {sortedPosts.recent.length > 0 ? (
                sortedPosts.recent.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No posts found matching your criteria
                </div>
              )}
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-3">
              {sortedPosts.unanswered.length > 0 ? (
                sortedPosts.unanswered.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No unanswered posts found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
