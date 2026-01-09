import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent/10 animate-pulse rounded-md relative overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" 
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s ease-in-out infinite'
        }}
      />
    </div>
  )
}

export { Skeleton }
