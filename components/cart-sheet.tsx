"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { type Locale, getTranslations } from "@/lib/i18n"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: Locale
}

export function CartSheet({ open, onOpenChange, locale }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const t = getTranslations(locale)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-burnt-orange">{t.cart.title}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-deep-brown/20 mb-4" />
            <p className="text-deep-brown/60 mb-6">{t.cart.empty}</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/stock">{t.cart.continueShopping}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-3 bg-white rounded-lg">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-secondary font-semibold text-deep-brown truncate">{item.name}</h3>
                    {item.size && <p className="text-sm text-deep-brown/60">Size: {item.size}</p>}
                    {item.color && <p className="text-sm text-deep-brown/60">Color: {item.color}</p>}
                    <p className="font-secondary font-bold text-burnt-orange mt-1">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-secondary font-bold">
                <span>{t.cart.subtotal}</span>
                <span className="text-burnt-orange">${totalPrice.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/cart" onClick={() => onOpenChange(false)}>
                  {t.cart.checkout}
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
