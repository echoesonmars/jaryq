"use client"

import Image from "next/image"
import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  currency: string
  tagline: string
  images: string[]
  colors: string[]
  inStock: boolean
  onQuickView?: (id: string) => void
}

export function ProductCard({
  id,
  name,
  price,
  currency,
  tagline,
  images,
  colors,
  inStock,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price)
  }

  return (
    <Card
      className="group overflow-hidden border-2 border-olive hover:border-burnt-orange transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white relative film-grain flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 flex flex-col flex-1">
        <div
          onClick={() => onQuickView?.(id)}
          className="block relative aspect-[3/4] overflow-hidden bg-cream w-full cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onQuickView?.(id);
            }
          }}
        >
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-deep-brown/70 flex items-center justify-center">
              <span className="font-display text-lg md:text-xl text-cream transform -rotate-12">Sold Out</span>
            </div>
          )}

          {/* Hover Actions */}
          <div
            className={`absolute inset-0 bg-burnt-orange/90 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="icon"
              className="bg-cream text-burnt-orange hover:bg-mustard hover:text-deep-brown rounded-full h-9 w-9 md:h-10 md:w-10"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView?.(id)
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
            {inStock && (
              <Button
                size="icon"
                className="bg-cream text-burnt-orange hover:bg-turquoise hover:text-white rounded-full h-9 w-9 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </Button>
            )}
          </div>
        </div>

        <div className="p-3 md:p-3.5 space-y-1.5 flex flex-col flex-1">
          <div onClick={() => onQuickView?.(id)} className="text-left w-full cursor-pointer">
            <h3 className="font-semibold text-sm md:text-base text-deep-brown group-hover:text-burnt-orange transition-colors text-balance leading-tight tracking-tight">
              {name}
            </h3>
          </div>
          <p className="text-xs text-olive italic leading-snug line-clamp-2">{tagline}</p>

          {/* Colors */}
          <div className="flex gap-1 items-center">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-deep-brown/20 ${
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
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <span className="font-bold text-base md:text-lg text-burnt-orange">
              {formatPrice(price)} {currency}
            </span>
            {inStock && (
              <Button
                size="sm"
                className="bg-turquoise hover:bg-turquoise/90 text-white font-semibold text-xs h-7 md:h-8 px-2.5 md:px-3"
                onClick={() => onQuickView?.(id)}
              >
                View
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
