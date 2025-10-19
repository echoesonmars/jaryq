"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [locale, setLocale] = useState<Locale>("en")
  const t = getTranslations(locale)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price)
  }

  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-[1100px]">
        <h1 className="font-display text-4xl lg:text-5xl text-burnt-orange mb-8 tracking-tight">{t.cart.title}</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="h-24 w-24 text-deep-brown/20 mb-6" />
            <h2 className="font-display text-3xl text-deep-brown mb-3">{t.cart.empty}</h2>
            <p className="font-secondary text-deep-brown/60 mb-8">Start adding some groovy items to your cart!</p>
            <Button
              asChild
              size="lg"
              className="bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-bold rounded-full"
            >
              <Link href="/stock">{t.cart.continueShopping}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white rounded-xl border-2 border-olive p-4 lg:p-6 flex gap-4 lg:gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-olive"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-secondary font-bold text-lg text-deep-brown hover:text-burnt-orange transition-colors truncate">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex flex-col gap-1 mt-1 text-sm text-deep-brown/70">
                      {item.size && (
                        <p>
                          <span className="font-semibold">{t.product.size}:</span> {item.size}
                        </p>
                      )}
                      {item.color && (
                        <p>
                          <span className="font-semibold">{t.product.color}:</span> {item.color}
                        </p>
                      )}
                    </div>
                    <p className="font-secondary font-bold text-xl text-burnt-orange mt-2">
                      {formatPrice(item.price)} KZT
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-olive bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-secondary font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-olive bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t.cart.remove}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-olive p-6 shadow-lg sticky top-20">
                <h2 className="font-display text-2xl text-burnt-orange mb-6 tracking-tight">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-secondary text-deep-brown">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-semibold">{formatPrice(totalPrice)} KZT</span>
                  </div>
                  <div className="flex justify-between font-secondary text-deep-brown">
                    <span>Shipping</span>
                    <span className="font-semibold text-olive">Free</span>
                  </div>
                  <div className="border-t-2 border-olive pt-3 flex justify-between font-secondary text-lg font-bold text-deep-brown">
                    <span>Total</span>
                    <span className="text-burnt-orange">{formatPrice(totalPrice)} KZT</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-bold rounded-full mb-3"
                >
                  {t.cart.checkout}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-olive text-olive hover:bg-olive hover:text-cream font-secondary font-semibold rounded-full bg-transparent"
                >
                  <Link href="/stock">{t.cart.continueShopping}</Link>
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full mt-4 text-sm text-deep-brown/60 hover:text-destructive transition-colors font-secondary"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
