import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { LoadingProgress } from '@/components/LoadingProgress'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

export function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingProgress isLoading={true} duration={800} />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.25_0.04_250),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.18_0.05_195),transparent_50%)] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="flex items-center justify-between gap-4 mb-4" variants={itemVariants}>
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-7 w-48 rounded-full hidden sm:block" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Skeleton className="h-16 w-full" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="mb-8 border-border/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent opacity-30 blur-3xl pointer-events-none">
                <motion.div 
                  className="w-full h-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <CardHeader className="relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-20 w-20 rounded-2xl" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </CardHeader>

              <CardContent className="space-y-6 relative">
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-11 w-48" />
                  <Skeleton className="h-11 w-32" />
                  <Skeleton className="h-11 w-28" />
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                          <Skeleton className="h-4 w-full" style={{ width: `${100 - i * 5}%` }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Skeleton className="h-8 w-32" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                          <Skeleton className="h-4 w-full" style={{ width: `${100 - i * 5}%` }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Skeleton className="h-9 w-56 mb-6" />
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + (i * 0.08),
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card className="h-full border-border/50">
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Separator className="my-3" />
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="mt-8 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.75_0.18_195_/_0.1),transparent_70%)] pointer-events-none">
                <motion.div 
                  className="w-full h-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <CardHeader className="text-center relative space-y-3">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-5 w-96 mx-auto max-w-full" />
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative">
                <Skeleton className="h-11 w-60 max-w-full" />
                <Skeleton className="h-11 w-52 max-w-full" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="mt-12 grid sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Card className="h-full border-border/50">
              <CardHeader className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-start gap-3 mt-3">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="h-full border-border/50">
              <CardHeader className="space-y-3">
                <Skeleton className="h-4 w-32 ml-auto" />
                <div className="flex items-start gap-3 mt-3 flex-row-reverse">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4 ml-auto" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
