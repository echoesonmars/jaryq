import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />
      
      {/* Header Skeleton */}
      <section className="bg-burnt-orange text-cream py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-cream rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-cream rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-cream rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <div className="animate-pulse text-center">
            <div className="h-12 bg-cream/20 rounded-lg mb-3 mx-auto max-w-48"></div>
            <div className="h-6 bg-cream/20 rounded-lg mx-auto max-w-64"></div>
          </div>
        </div>
      </section>

      {/* Cart Content Skeleton */}
      <main className="container mx-auto px-4 py-8 max-w-[1100px]">
        <div className="bg-white rounded-xl border-2 border-olive p-6 shadow-lg">
          <div className="animate-pulse">
            {/* Cart Items Skeleton */}
            <div className="space-y-4 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border border-olive/20 rounded-lg">
                  <div className="h-20 w-20 bg-olive/20 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-olive/20 rounded w-3/4"></div>
                    <div className="h-4 bg-olive/20 rounded w-1/2"></div>
                    <div className="h-4 bg-olive/20 rounded w-1/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-16 bg-olive/20 rounded"></div>
                    <div className="h-4 bg-olive/20 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary Skeleton */}
            <div className="border-t border-olive/20 pt-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <div className="h-4 bg-olive/20 rounded w-24"></div>
                  <div className="h-4 bg-olive/20 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-olive/20 rounded w-20"></div>
                  <div className="h-4 bg-olive/20 rounded w-12"></div>
                </div>
                <div className="flex justify-between font-bold">
                  <div className="h-5 bg-burnt-orange/20 rounded w-16"></div>
                  <div className="h-5 bg-burnt-orange/20 rounded w-20"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-12 bg-burnt-orange/20 rounded-lg"></div>
                <div className="h-10 bg-olive/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
