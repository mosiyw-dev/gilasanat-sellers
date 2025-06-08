import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
  fullScreen?: boolean
}

export function Loading({ 
  className, 
  size = "md", 
  text = "در حال بارگذاری...", 
  fullScreen = false 
}: LoadingProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-8",
    fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
    className
  )

  return (
    <div className={containerClasses}>
      {/* Company name */}
      <div className="text-center">
        <h1 className="text-4xl font-bold ">
          گیلاصنعت
        </h1>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500/60 animate-[bounce_1s_ease-in-out_infinite_-0.32s]" />
        <div className="h-2 w-2 rounded-full bg-emerald-500/60 animate-[bounce_1s_ease-in-out_infinite_-0.16s]" />
        <div className="h-2 w-2 rounded-full bg-emerald-500/60 animate-[bounce_1s_ease-in-out_infinite]" />
      </div>

      {/* Loading text */}
      {text && (
        <p className="text-sm font-medium text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  )
} 