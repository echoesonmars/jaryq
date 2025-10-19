"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import productsData from "@/data/products.json"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"

type Category = "all" | "tops" | "bottoms" | "accessories"
type SortOption = "featured" | "price-low" | "price-high" | "name"

const CATEGORIES: readonly Category[] = ["all", "tops", "bottoms", "accessories"] as const

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const t = getTranslations(locale)

  // Memoize locale change handler to prevent unnecessary re-renders
  const handleLocaleChange = useCallback(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  useEffect(() => {
    setLocale(getLocaleFromCookie())
    window.addEventListener("localechange", handleLocaleChange)
    return () => window.removeEventListener("localechange", handleLocaleChange)
  }, [handleLocaleChange])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData.products

    // Filter by search - use a more efficient search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.tagline.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort - avoid creating new array if no sorting needed
    if (sortBy === "featured") {
      return filtered
    }

    const sorted = [...filtered]
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return sorted
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />

      {/* Header */}
      <header className="bg-burnt-orange text-cream py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-cream rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-cream rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-cream rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-center mb-3 tracking-tight leading-tight">
            {t.stock.title}
          </h1>
          <p className="font-secondary text-base sm:text-lg text-center text-cream/90 max-w-2xl mx-auto leading-normal">
            {t.stock.subtitle}
          </p>
        </div>
      </header>

      {/* Filters & Search */}
      <section className="container mx-auto px-4 py-6 max-w-[1100px]" aria-label="Product filters and search">
        <div className="bg-white rounded-xl border-2 border-olive p-4 sm:p-5 shadow-lg">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-olive" aria-hidden="true" />
              <Input
                type="text"
                placeholder={t.stock.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-olive focus:border-burnt-orange h-10 w-full"
                aria-label="Search products"
              />
            </div>
            <Button
              variant="outline"
              className="sm:hidden border-2 border-olive text-olive hover:bg-olive hover:text-cream bg-transparent h-10 flex-shrink-0"
              onClick={() => setShowFilters(prev => !prev)}
              aria-expanded={showFilters}
              aria-controls="filters-section"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" aria-hidden="true" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div id="filters-section" className={`${showFilters ? "block" : "hidden"} sm:block`}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="font-secondary font-semibold text-sm text-deep-brown mb-2 block">
                  {t.stock.filter.category}
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Product categories">
                  {CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category
                    const getCategoryLabel = () => {
                      switch (category) {
                        case "all":
                          return t.stock.filter.all
                        case "tops":
                          return t.stock.filter.tshirts
                        case "bottoms":
                          return t.stock.filter.bottoms
                        case "accessories":
                          return t.stock.filter.accessories
                        default:
                          return category
                      }
                    }

                    return (
                      <Button
                        key={category}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          isSelected
                            ? "bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary h-9 text-sm"
                            : "border-2 border-olive text-olive hover:bg-olive hover:text-cream font-secondary h-9 text-sm"
                        }
                        aria-pressed={isSelected}
                      >
                        {getCategoryLabel()}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Sort */}
              <div className="sm:w-56">
                <label htmlFor="sort-select" className="font-secondary font-semibold text-sm text-deep-brown mb-2 block">
                  {t.stock.sort.label}
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border-2 border-olive rounded-lg font-secondary text-sm focus:border-burnt-orange focus:outline-none h-9"
                  aria-label="Sort products"
                >
                  <option value="featured">{t.stock.sort.featured}</option>
                  <option value="price-low">{t.stock.sort.priceLow}</option>
                  <option value="price-high">{t.stock.sort.priceHigh}</option>
                  <option value="name">{t.stock.sort.name}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-5 text-center">
          <p className="font-secondary text-sm text-deep-brown">
            {t.stock.resultsCount
              .replace("{count}", filteredAndSortedProducts.length.toString())
              .replace("{item}", filteredAndSortedProducts.length === 1 ? t.stock.resultsCountSingular : t.stock.resultsCountPlural)}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 pb-16 max-w-[1100px]">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id} // This is correct - using a unique id as key
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
        ) : (
          <div className="text-center py-16" role="status" aria-live="polite">
            <p className="font-display text-2xl sm:text-3xl text-olive mb-3 tracking-tight">{t.stock.noResults}</p>
            <p className="text-sm text-deep-brown/70">{t.stock.tryAdjusting}</p>
          </div>
        )}
      </main>

      <Footer />

      {/* ProductModal */}
      {selectedProductId && (
        <ProductModal 
          productId={selectedProductId} 
          onClose={() => setSelectedProductId(null)} 
        />
      )}
    </div>
  )
}
