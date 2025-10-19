"use client"

import { MorphingText } from "@/components/ui/morphing-text"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Sparkles, Leaf, MapPin } from "lucide-react"
import productsData from "@/data/products.json"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en")
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const t = getTranslations(locale)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
    const handleLocaleChange = () => {
      setLocale(getLocaleFromCookie())
    }
    window.addEventListener("localechange", handleLocaleChange)
    return () => window.removeEventListener("localechange", handleLocaleChange)
  }, [])

  // Get first 4 products for featured section
  const featuredProducts = productsData.products.slice(0, 4)

  const texts = [
  "Make",
  "Jaryq",
  "Not",
  "War"
]

  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/header_image.svg"
          alt="Kazakh steppe with retro filter"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/40 via-transparent to-deep-brown/60" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
      
          <MorphingText
            texts={texts}
            className="mb-8 animate-fade-in-up font-display text-9xl text-white leading-tight tracking-tight"
          />
          {/* <h1 className="font-display text-7xl md:text-8xl text-white mb-6 drop-shadow-lg text-balance animate-fade-in-up leading-tight tracking-tight">
            {t.home.hero.title}
          </h1> */}
          <p className="font-secondary text-xl text-cream/95 mb-6 max-w-2xl mx-auto text-pretty leading-normal">
            {t.home.hero.subtitle}
          </p>
          <div className="flex sm:flex-row gap-2 justify-center">
            <Button
              asChild
              size="lg"
              className="border-1 border-white bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-medium text-sm px-2 py-1 rounded-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/stock">{t.home.hero.cta}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-cream/90 hover:bg-cream text-deep-brown border-2 border-deep-brown font-secondary font-meduim text-sm px-2 py-1 rounded-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 max-w-[1100px]">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-burnt-orange mb-3 tracking-tight leading-tight">
            {t.home.featured.title}
          </h2>
          <p className="font-secondary text-base text-deep-brown/80 max-w-2xl mx-auto leading-normal">
            {t.home.featured.subtitle}
          </p>
        </div>

        {/* Grid: 2 columns on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={locale === "ru" ? product.nameRu : product.name}
              price={product.price}
              currency={product.currency}
              tagline={locale === "ru" ? product.taglineRu : product.tagline}
              images={product.images}
              colors={product.colors}
              inStock={product.inStock}
              onQuickView={setSelectedProductId}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-olive text-olive hover:bg-olive hover:text-cream font-secondary font-semibold bg-transparent"
          >
            <Link href="/stock">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Brand Values */}
      <section className="bg-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="sunburst" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-burnt-orange"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-mustard"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-turquoise"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sunburst)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <h2 className="font-display text-4xl text-center text-burnt-orange mb-12 tracking-tight leading-tight">
            Jaryq is...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sustainable */}
            <div className="relative overflow-hidden border-2 border-olive rounded-xl hover: transition-all hover:shadow-lg">
              <div
                className="absolute inset-0 blur-xl animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, red, orange, violet)",
                  animation: "spin 6s linear infinite",
                }}
              ></div>
              <div className="relative text-center p-7 backdrop-blur-xl rounded-xl">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Leaf className="h-7 w-7 text-blue" />
                </div>
                <h3 className="font-secondary font-bold text-xl text-white mb-3 tracking-tight">
                  Nomadic Motifs
                </h3>
                <p className="text-sm text-cream leading-normal">
                  Modern takes on Kazakh patterns fused with 60s groovy silhouettes — every print is inspired by nomadic heritage and redesigned for today’s streetwear.
                </p>
              </div>

              <style jsx>{`
                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                .animate-spin-slow {
                  animation: spin 8s linear infinite;
                }
              `}</style>
            </div>

            {/* Limited Drops */}
            <div className="relative overflow-hidden rounded-xl border-2 border-olive hover: transition-all hover:shadow-lg p-[2px]">
              <div
                className="absolute inset-0 blur-xl animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, blue, violet, green)",
                  animation: "spin 6s linear infinite",
                }}
              ></div>
              <div className="relative text-center p-7 backdrop-blur-xl rounded-xl">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="h-7 w-7 text-blue" />
                </div>
                <h3 className="font-secondary font-bold text-xl text-white mb-3 tracking-tight">
                  Small Runs & Hand-Finished
                </h3>
                <p className="text-sm text-cream leading-normal">
                  Limited drops with hand-stitched details and artisanal finishing — no mass clones, each piece keeps its personality and rarity.
                </p>
              </div>

              <style jsx>{`
                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                .animate-spin-slow {
                  animation: spin 8s linear infinite;
                }
              `}</style>
            </div>

            {/* Kazakhstan Made */}
            <div className="relative overflow-hidden rounded-xl border-2 border-olive hover: transition-all hover:shadow-lg p-[2px]">
              <div
                className="absolute inset-0 blur-xl animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, cyan, orange, green)",
                  animation: "spin 6s linear infinite",
                }}
              ></div>
              <div className="relative text-center p-7 backdrop-blur-xl rounded-xl">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                  <MapPin className="h-7 w-7 text-blue" />
                </div>
                <h3 className="font-secondary font-bold text-xl text-white mb-3 tracking-tight">
                  Conscious Craftsmanship
                </h3>
                <p className="text-sm text-cream leading-normal">
                  Natural fabrics, hand-dyeing, and upcycled leftovers — style that cares: lower waste, local production, better materials.
                </p>
              </div>

              <style jsx>{`
                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                .animate-spin-slow {
                  animation: spin 8s linear infinite;
                }
              `}</style>
            </div>
            </div>
        </div>
      </section>

      <Footer />

      {/* ProductModal */}
      {selectedProductId && <ProductModal productId={selectedProductId} onClose={() => setSelectedProductId(null)} />}
    </div>
  )
}
