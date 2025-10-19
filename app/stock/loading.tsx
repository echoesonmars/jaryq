import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoadingPage, LoadingGrid } from "@/components/ui/loading"

export default function Loading() {
  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />
      
      {/* Header Skeleton */}
      <header className="bg-burnt-orange text-cream py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-cream rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-cream rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-cream rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <div className="animate-pulse">
            <div className="h-16 bg-cream/20 rounded-lg mb-3 mx-auto max-w-md"></div>
            <div className="h-6 bg-cream/20 rounded-lg mx-auto max-w-2xl"></div>
          </div>
        </div>
      </header>

      {/* Filters Skeleton */}
      <section className="container mx-auto px-4 py-6 max-w-[1100px]">
        <div className="bg-white rounded-xl border-2 border-olive p-4 sm:p-5 shadow-lg">
          <div className="animate-pulse">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="flex-1 h-10 bg-olive/20 rounded-lg"></div>
              <div className="sm:hidden h-10 w-24 bg-olive/20 rounded-lg"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="flex-1">
                <div className="h-4 bg-olive/20 rounded w-20 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-9 w-16 bg-olive/20 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="sm:w-56">
                <div className="h-4 bg-olive/20 rounded w-16 mb-2"></div>
                <div className="h-9 bg-olive/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-5 text-center">
          <div className="h-4 bg-olive/20 rounded w-48 mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <main className="container mx-auto px-4 pb-16 max-w-[1100px]">
        <LoadingGrid count={6} />
      </main>

      <Footer />
    </div>
  )
}
