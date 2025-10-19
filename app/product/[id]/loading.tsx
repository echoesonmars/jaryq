import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />
      
      {/* Product Detail Skeleton */}
      <main className="container mx-auto px-4 py-8 max-w-[1100px]">
        <div className="bg-white rounded-xl border-2 border-olive p-6 shadow-lg">
          <div className="animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-4 bg-olive/20 rounded w-16"></div>
              <div className="h-4 bg-olive/20 rounded w-1"></div>
              <div className="h-4 bg-olive/20 rounded w-20"></div>
              <div className="h-4 bg-olive/20 rounded w-1"></div>
              <div className="h-4 bg-olive/20 rounded w-24"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images Skeleton */}
              <div className="space-y-4">
                <div className="h-96 bg-olive/20 rounded-lg"></div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-20 bg-olive/20 rounded-lg"></div>
                  ))}
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="space-y-6">
                <div>
                  <div className="h-8 bg-deep-brown/20 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-burnt-orange/20 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-deep-brown/20 rounded w-full"></div>
                    <div className="h-4 bg-deep-brown/20 rounded w-5/6"></div>
                    <div className="h-4 bg-deep-brown/20 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Size Selection Skeleton */}
                <div>
                  <div className="h-5 bg-deep-brown/20 rounded w-16 mb-3"></div>
                  <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-10 w-10 bg-olive/20 rounded"></div>
                    ))}
                  </div>
                </div>

                {/* Color Selection Skeleton */}
                <div>
                  <div className="h-5 bg-deep-brown/20 rounded w-20 mb-3"></div>
                  <div className="flex space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-10 w-10 bg-olive/20 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Skeleton */}
                <div className="space-y-3">
                  <div className="h-12 bg-burnt-orange/20 rounded-lg"></div>
                  <div className="h-10 bg-olive/20 rounded-lg"></div>
                </div>

                {/* Product Details Skeleton */}
                <div className="space-y-4 pt-6 border-t border-olive/20">
                  <div className="h-5 bg-deep-brown/20 rounded w-24 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-deep-brown/20 rounded w-full"></div>
                    <div className="h-4 bg-deep-brown/20 rounded w-5/6"></div>
                    <div className="h-4 bg-deep-brown/20 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="mt-16">
              <div className="h-8 bg-deep-brown/20 rounded w-48 mb-8"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border-2 border-olive p-4 shadow-lg">
                    <div className="h-48 bg-olive/20 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-olive/20 rounded w-3/4"></div>
                      <div className="h-4 bg-olive/20 rounded w-1/2"></div>
                      <div className="h-6 bg-burnt-orange/20 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
