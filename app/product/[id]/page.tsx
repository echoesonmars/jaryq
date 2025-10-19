"use client"

import { use, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import productsData from "@/data/products.json"
import { useCart } from "@/lib/cart-context"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"
import { toast } from "sonner"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = productsData.products.find((p) => p.id === id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [locale, setLocale] = useState<Locale>("en")
  const { addItem } = useCart()
  const t = getTranslations(locale)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen psychedelic-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center max-w-[1100px]">
          <h1 className="font-display text-5xl text-burnt-orange mb-4">Product Not Found</h1>
          <p className="font-secondary text-lg text-deep-brown/80 mb-8">
            This groovy item doesn't exist in our dimension.
          </p>
          <Button asChild className="bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-semibold">
            <Link href="/stock">Back to Stock</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related products (same category, different id)
  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price)
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      toast.error("Please select a size")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity,
    })

    toast.success(`Added ${product.name} to cart!`)
  }

  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-4 max-w-[1100px]">
        <div className="flex items-center gap-2 text-sm font-secondary text-deep-brown/70">
          <Link href="/" className="hover:text-burnt-orange transition-colors">
            {t.nav.home}
          </Link>
          <span>/</span>
          <Link href="/stock" className="hover:text-burnt-orange transition-colors">
            {t.nav.stock}
          </Link>
          <span>/</span>
          <span className="text-deep-brown font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Product Info Section - Improved mobile layout */}
      <section className="container mx-auto px-4 pb-8 sm:pb-12 max-w-[1100px]">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery - Better mobile sizing */}
          <div className="space-y-2 sm:space-y-3">
            {/* Main Image - Improved aspect ratio for mobile */}
            <div className="relative aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden border-2 border-olive shadow-lg bg-cream film-grain">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
              />

              {/* Navigation Arrows - Better touch targets */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-cream/90 hover:bg-cream rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-burnt-orange" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-cream/90 hover:bg-cream rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-burnt-orange" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery - Improved grid for mobile */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-burnt-orange shadow-md scale-105"
                        : "border-olive hover:border-mustard"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Better spacing for mobile */}
          <div className="space-y-4 sm:space-y-5">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-burnt-orange mb-2 text-balance leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="font-secondary text-base sm:text-lg text-olive italic">{product.tagline}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-secondary font-bold text-3xl text-burnt-orange">
                {formatPrice(product.price)} {product.currency}
              </span>
              {!product.inStock && (
                <span className="font-secondary font-semibold text-sm text-destructive">Out of Stock</span>
              )}
            </div>

            <p className="font-secondary text-base text-deep-brown/90 leading-normal">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="font-secondary font-semibold text-sm text-deep-brown mb-2 block">
                  {t.product.color} {selectedColor && `- ${selectedColor}`}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-3 transition-all hover:scale-110 ${
                        selectedColor === color ? "border-burnt-orange shadow-md" : "border-deep-brown/20"
                      } ${
                        color === "burnt-orange"
                          ? "bg-burnt-orange"
                          : color === "mustard"
                            ? "bg-mustard"
                            : color === "olive"
                              ? "bg-olive"
                              : color === "turquoise"
                                ? "bg-turquoise"
                                : color === "cream"
                                  ? "bg-cream"
                                  : "bg-deep-brown"
                      }`}
                      title={color}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <label className="font-secondary font-semibold text-sm text-deep-brown mb-2 block">
                  {t.product.size}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-lg border-2 font-secondary font-semibold text-sm transition-all hover:scale-105 ${
                        selectedSize === size
                          ? "bg-burnt-orange border-burnt-orange text-cream"
                          : "bg-white border-olive text-deep-brown hover:border-mustard"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="font-secondary font-semibold text-sm text-deep-brown mb-2 block">
                {t.cart.quantity}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 bg-white border-2 border-olive rounded-lg font-bold text-deep-brown hover:bg-olive hover:text-cream transition-all"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="font-secondary font-bold text-xl text-deep-brown w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 bg-white border-2 border-olive rounded-lg font-bold text-deep-brown hover:bg-olive hover:text-cream transition-all"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons - Improved mobile layout */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full sm:flex-1 bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-bold text-sm sm:text-base py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? t.product.addToCart : "Out of Stock"}
              </Button>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-initial border-2 border-olive text-olive hover:bg-olive hover:text-cream font-secondary font-semibold py-4 sm:py-5 rounded-full bg-transparent"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-initial border-2 border-olive text-olive hover:bg-olive hover:text-cream font-secondary font-semibold py-4 sm:py-5 rounded-full bg-transparent"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share product</span>
                </Button>
              </div>
            </div>

            {/* Product Details Tabs - Mobile optimized */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white border-2 border-olive">
                <TabsTrigger
                  value="description"
                  className="font-secondary text-xs sm:text-sm data-[state=active]:bg-burnt-orange data-[state=active]:text-cream"
                >
                  {t.product.description}
                </TabsTrigger>
                <TabsTrigger
                  value="materials"
                  className="font-secondary text-xs sm:text-sm data-[state=active]:bg-burnt-orange data-[state=active]:text-cream"
                >
                  Materials
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="font-secondary text-xs sm:text-sm data-[state=active]:bg-burnt-orange data-[state=active]:text-cream"
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger
                  value="size"
                  className="font-secondary text-xs sm:text-sm data-[state=active]:bg-burnt-orange data-[state=active]:text-cream"
                >
                  Size Guide
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="bg-white p-5 rounded-lg border-2 border-olive mt-3">
                <p className="font-secondary text-sm text-deep-brown/90 leading-normal">{product.description}</p>
              </TabsContent>
              <TabsContent value="materials" className="bg-white p-5 rounded-lg border-2 border-olive mt-3">
                <p className="font-secondary text-sm text-deep-brown/90 leading-normal mb-3">
                  <strong>Materials:</strong> {product.materials}
                </p>
                <p className="font-secondary text-sm text-deep-brown/90 leading-normal">
                  <strong>Care:</strong> Hand wash cold, hang dry. Iron on low heat if needed. Avoid bleach and harsh
                  chemicals to preserve natural dyes.
                </p>
              </TabsContent>
              <TabsContent value="shipping" className="bg-white p-5 rounded-lg border-2 border-olive mt-3">
                <div className="space-y-2 font-secondary text-sm text-deep-brown/90">
                  <p>
                    <strong>Kazakhstan:</strong> 3-5 business days, free shipping on orders over 15,000 KZT
                  </p>
                  <p>
                    <strong>International:</strong> 7-14 business days, shipping calculated at checkout
                  </p>
                  <p>
                    <strong>Returns:</strong> 30-day return policy. Items must be unworn with tags attached.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="size" className="bg-white p-5 rounded-lg border-2 border-olive mt-3">
                <p className="font-secondary text-sm text-deep-brown/90 leading-normal mb-3">
                  Our pieces are designed for a relaxed, comfortable fit. If you're between sizes, we recommend sizing
                  up for that authentic groovy vibe.
                </p>
                <p className="font-secondary text-sm text-deep-brown/90">
                  For detailed measurements, please contact us at hello@jaryq.kz
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-16 max-w-[1100px]">
          <h2 className="font-display text-3xl text-burnt-orange text-center mb-8 tracking-tight">
            {t.product.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                price={relatedProduct.price}
                currency={relatedProduct.currency}
                tagline={relatedProduct.tagline}
                images={relatedProduct.images}
                colors={relatedProduct.colors}
                inStock={relatedProduct.inStock}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
