"use client"

import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { type Locale, getTranslations } from "@/lib/i18n"
import Fuse from "fuse.js"
import products from "@/data/products.json"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: Locale
}

export function SearchDialog({ open, onOpenChange, locale }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const t = getTranslations(locale)

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ["name", "tagline", "description", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [],
  )

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse
      .search(query)
      .slice(0, 6)
      .map((result) => result.item)
  }, [query, fuse])

  useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="sr-only">{t.nav.search}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-deep-brown/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.search}
            className="pl-10 pr-10 h-12 text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-brown/50 hover:text-deep-brown"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto mt-4">
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-mustard/10 transition-colors group"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-secondary font-semibold text-deep-brown group-hover:text-burnt-orange transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-deep-brown/60 truncate">{product.tagline}</p>
                  </div>
                  <div className="font-secondary font-bold text-burnt-orange">${product.price}</div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12 text-deep-brown/60">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>{t.stock.noResults}</p>
            </div>
          ) : (
            <div className="text-center py-12 text-deep-brown/60">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Start typing to search products...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
