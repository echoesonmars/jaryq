import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />
      
      {/* Hero Section Skeleton */}
      <section className="bg-burnt-orange text-cream py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-cream rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-cream rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-cream rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <div className="animate-pulse text-center">
            <div className="h-16 bg-cream/20 rounded-lg mb-4 mx-auto max-w-lg"></div>
            <div className="h-6 bg-cream/20 rounded-lg mx-auto max-w-2xl"></div>
          </div>
        </div>
      </section>

      {/* Story Section Skeleton */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="animate-pulse text-center mb-12">
            <div className="h-12 bg-deep-brown/20 rounded-lg mb-6 mx-auto max-w-md"></div>
            <div className="space-y-3 max-w-4xl mx-auto">
              <div className="h-4 bg-deep-brown/20 rounded w-full"></div>
              <div className="h-4 bg-deep-brown/20 rounded w-5/6 mx-auto"></div>
              <div className="h-4 bg-deep-brown/20 rounded w-4/5 mx-auto"></div>
              <div className="h-4 bg-deep-brown/20 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="animate-pulse text-center mb-12">
            <div className="h-12 bg-deep-brown/20 rounded-lg mb-6 mx-auto max-w-md"></div>
          </div>
          
          {/* Values Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-16 w-16 bg-burnt-orange/20 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-deep-brown/20 rounded-lg mb-3 mx-auto max-w-32"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-deep-brown/20 rounded w-full"></div>
                  <div className="h-4 bg-deep-brown/20 rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
