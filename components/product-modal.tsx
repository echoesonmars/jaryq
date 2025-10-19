"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"
import { toast } from "sonner"
import productsData from "@/data/products.json"

interface ProductModalProps {
  productId: string
  onClose: () => void
}

export function ProductModal({ productId, onClose }: ProductModalProps) {
  const [locale, setLocale] = useState<Locale>("en")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCart()
  const t = getTranslations(locale)

  const product = productsData.products.find((p) => p.id === productId)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!product) return null

  const productName = locale === "ru" ? product.nameRu : product.name
  const productTagline = locale === "ru" ? product.taglineRu : product.tagline
  const productDescription = locale === "ru" ? product.descriptionRu : product.description

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      toast.error("Please select a size")
      return
    }
    if (!selectedColor && product.colors.length > 1) {
      toast.error("Please select a color")
      return
    }

    addItem({
      id: product.id,
      name: productName,
      price: product.price,
      currency: product.currency,
      image: product.images[0],
      size: selectedSize || product.sizes[0],
      color: selectedColor || product.colors[0],
    })

    toast.success(`${productName} added to cart!`)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-deep-brown/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="bg-cream w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto rounded-lg md:rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-burnt-orange hover:bg-deep-brown/90 rounded-full p-2 md:p-2.5 shadow-xl transition-all hover:scale-110"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 p-7 md:p-8 lg:p-10">
          {/* Left: Image Gallery */}
          <div className="space-y-0 md:space-y-6 mt-8 md:mt-0">
            <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden border-2 border-olive">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${productName} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 md:p-2 shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-deep-brown" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 md:p-2 shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-deep-brown" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-burnt-orange w-4 md:w-6" : "bg-white/60"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3 md:gap-3 mt-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? "border-burnt-orange" : "border-olive/30 hover:border-olive"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-5 md:space-y-6">
            <div>
              <h1
                id="product-modal-title"
                className="font-display text-4xl md:text-4xl lg:text-5xl text-burnt-orange mb-2 md:mb-2.5 leading-tight"
              >
                {productName}
              </h1>
              <p className="text-olive italic text-base md:text-lg">{productTagline}</p>
            </div>

            <div className="flex items-baseline gap-2 md:gap-3 mt-5">
              <span className="font-display text-2xl md:text-3xl text-deep-brown">
                {formatPrice(product.price)} {product.currency}
              </span>
              {!product.inStock && (
                <span className="text-xs md:text-sm text-destructive font-semibold">Out of Stock</span>
              )}
            </div>

            <div className="space-y-0.5 text-xs md:text-sm text-deep-brown/70">
              <p>
                <strong>SKU:</strong> {product.id}
              </p>
              <p>
                <strong>Materials:</strong> {product.materials}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <label className="block text-xs md:text-sm font-semibold text-deep-brown mb-2 md:mb-3">
                  {t.product.size}
                </label>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg border-2 font-medium text-xs md:text-sm transition-all ${
                        selectedSize === size
                          ? "border-burnt-orange bg-burnt-orange text-cream"
                          : "border-olive/30 bg-white text-deep-brown hover:border-olive"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs md:text-sm font-semibold text-deep-brown mb-2 md:mb-3">
                  {t.product.color}
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 transition-all ${
                        selectedColor === color
                          ? "border-burnt-orange scale-110"
                          : "border-deep-brown/20 hover:scale-105"
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

            {/* Description */}
            <div>
              <h2 className="text-xs md:text-sm font-semibold text-deep-brown mb-2 md:mb-2.5">
                {t.product.description}
              </h2>
              <p className="text-xs md:text-sm text-deep-brown/80 leading-relaxed">{productDescription}</p>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-white font-bold text-base md:text-lg py-5 md:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              {product.inStock ? t.product.addToCart : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
