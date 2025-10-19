"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { type Locale, getLocaleFromCookie, setLocaleCookie, getTranslations } from "@/lib/i18n"
import { useCart } from "@/lib/cart-context"
import { SearchDialog } from "@/components/search-dialog"
import { CartSheet } from "@/components/cart-sheet"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const { totalItems } = useCart()
  const t = getTranslations(locale)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setLocaleCookie(newLocale)
    setLangDropdownOpen(false)
    // Force re-render by triggering a state update
    window.dispatchEvent(new Event("localechange"))
  }

  const isActive = (path: string) => pathname === path

  const languageLabels = {
    en: "EN",
    ru: "RU",
    kk: "KK",
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cream/98 backdrop-blur-md border-b border-olive/30 shadow-sm">
        <div className="container mx-auto px-4 h-[64px] max-w-[1100px]">
          <div className="flex items-center justify-between h-full gap-2 sm:gap-4">
            <Link 
              href="/" 
              className="flex items-center group flex-shrink-0 px-2"
            >
              <span className="font-display text-xl sm:text-2xl text-burnt-orange tracking-tight hover:text-mustard transition-all duration-200">
                Jaryq
              </span>
            </Link>

            {/* Desktop Navigation - Improved transitions */}
            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1">
              {[
                { href: "/", label: t.nav.home },
                { href: "/stock", label: t.nav.stock },
                { href: "/about", label: t.nav.about }
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium text-sm transition-all duration-200 relative py-1 ${
                    isActive(href)
                      ? "text-burnt-orange after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-burnt-orange after:transition-transform after:duration-200"
                      : "text-deep-brown hover:text-burnt-orange hover:after:absolute hover:after:bottom-[-2px] hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-burnt-orange/50 hover:after:transition-transform hover:after:duration-200"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right Side Icons - Improved spacing and transitions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <div
                className="hidden sm:block relative"
                onMouseEnter={() => setLangDropdownOpen(true)}
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium text-deep-brown hover:text-burnt-orange hover:bg-mustard/10 transition-all duration-200"
                  aria-label="Select language"
                  aria-expanded={langDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="uppercase tracking-wide">{languageLabels[locale]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Improved Language Dropdown Animation */}
                <div className={`absolute top-full right-0 mt-1 bg-white border-2 border-olive/30 rounded-lg shadow-lg overflow-hidden min-w-[100px] z-50 transition-all duration-200 ${
                  langDropdownOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-[-8px] pointer-events-none'
                }`}>
                  {(["en", "ru", "kk"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLocaleChange(lang)}
                      className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                        locale === lang
                          ? "bg-burnt-orange text-cream"
                          : "text-deep-brown hover:bg-mustard/20 hover:text-burnt-orange"
                      }`}
                      aria-current={locale === lang ? "true" : undefined}
                    >
                      <span className="uppercase tracking-wide">{languageLabels[lang]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Improved hover states */}
              <Button
                variant="ghost"
                size="icon"
                className="text-deep-brown hover:text-burnt-orange hover:bg-mustard/20 transition-all duration-200 h-9 w-9"
                onClick={() => setSearchOpen(true)}
                aria-label={t.nav.search}
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-deep-brown hover:text-burnt-orange hover:bg-mustard/20 transition-all duration-200 relative h-9 w-9"
                onClick={() => setCartOpen(true)}
                aria-label={t.nav.cart}
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-turquoise text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-in fade-in duration-200">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Improved Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-deep-brown hover:text-burnt-orange hover:bg-mustard/20 transition-all duration-200 h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : t.nav.menu}
                aria-expanded={mobileMenuOpen}
              >
                <div className="relative w-5 h-5">
                  <Menu className={`absolute inset-0 transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} />
                  <X className={`absolute inset-0 transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  }`} />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Improved Mobile Menu Animation */}
        <div className={`md:hidden absolute top-[64px] left-0 right-0 bg-cream/98 backdrop-blur-md border-b border-olive/30 shadow-lg transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <div className="container mx-auto px-4 py-3 space-y-2 max-w-[1100px]">
            {/* Mobile Menu Links */}
            {[
              { href: "/", label: t.nav.home },
              { href: "/stock", label: t.nav.stock },
              { href: "/about", label: t.nav.about }
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block font-medium py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive(href) 
                    ? "text-cream bg-burnt-orange" 
                    : "text-deep-brown hover:bg-mustard/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex gap-2 pt-3 mt-2 border-t border-olive/30">
              {(["en", "ru", "kk"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLocaleChange(lang)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    locale === lang 
                      ? "bg-burnt-orange text-cream" 
                      : "bg-white text-deep-brown hover:bg-mustard/5 border border-olive/30"
                  }`}
                  aria-current={locale === lang ? "true" : undefined}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} locale={locale} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} locale={locale} />
    </>
  )
}

export interface NavTranslations {
  home: string;
  stock: string;
  about: string;
  search: string;
  cart: string;
  menu: string;
  close: string; // Add this line
}

export interface Translations {
  nav: NavTranslations;
  // ...rest of translation interface
}
