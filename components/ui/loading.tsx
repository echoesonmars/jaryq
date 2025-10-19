import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-cream/20 border-t-burnt-orange",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex space-x-1", className)} role="status" aria-label="Loading">
      <div className="h-2 w-2 bg-burnt-orange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-turquoise rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-mustard rounded-full animate-bounce"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingPulseProps {
  className?: string
}

export function LoadingPulse({ className }: LoadingPulseProps) {
  return (
    <div className={cn("animate-pulse", className)} role="status" aria-label="Loading">
      <div className="h-4 bg-olive/20 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-olive/20 rounded w-1/2"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border-2 border-olive p-4 shadow-lg animate-pulse", className)} role="status" aria-label="Loading">
      <div className="h-48 bg-olive/20 rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-olive/20 rounded w-3/4"></div>
        <div className="h-4 bg-olive/20 rounded w-1/2"></div>
        <div className="h-6 bg-burnt-orange/20 rounded w-1/3"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
}

export function LoadingGrid({ count = 6, className }: LoadingGridProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4", className)} role="status" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
      <span className="sr-only">Loading products...</span>
    </div>
  )
}

interface LoadingPageProps {
  title?: string
  subtitle?: string
  showSpinner?: boolean
  className?: string
}

export function LoadingPage({ 
  title = "Loading...", 
  subtitle = "Please wait while we prepare something groovy",
  showSpinner = true,
  className 
}: LoadingPageProps) {
  return (
    <div className={cn("min-h-screen psychedelic-bg flex items-center justify-center", className)}>
      <div className="text-center">
        {showSpinner && (
          <div className="mb-8">
            <LoadingSpinner size="xl" className="mx-auto mb-4" />
          </div>
        )}
        <h1 className="font-display text-3xl sm:text-4xl text-burnt-orange mb-3 tracking-tight">
          {title}
        </h1>
        <p className="font-secondary text-lg text-deep-brown/80 max-w-md mx-auto">
          {subtitle}
        </p>
        <div className="mt-6">
          <LoadingDots className="justify-center" />
        </div>
      </div>
    </div>
  )
}
