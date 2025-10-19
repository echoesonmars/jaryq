"use client"

import type React from "react"

import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
    toast.success("Thanks for subscribing!")
  }

  return (
    <footer className="bg-deep-brown text-cream mt-16">
      <div className="container mx-auto px-4 py-10 max-w-[1100px]">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h3 className="font-display text-3xl mb-2 text-mustard tracking-tight leading-tight">Stay Groovy</h3>
          <p className="font-secondary text-sm mb-5 text-cream/90 leading-normal">
            Subscribe to get updates on new drops, festival vibes, and exclusive offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-cream/10 border-cream/30 text-cream placeholder:text-cream/50 focus:border-mustard h-10 text-sm"
            />
            <Button
              type="submit"
              className="bg-burnt-orange hover:bg-burnt-orange/90 text-cream font-secondary font-semibold h-10 px-5"
            >
              Join
            </Button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="font-display text-2xl text-mustard tracking-tight">Jaryq</span>
            </Link>
            <p className="text-xs text-cream/80 leading-normal">
              Groovy fashion from the heart of Kazakhstan.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-secondary font-semibold text-sm text-mustard mb-3 tracking-tight">Shop</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/stock" className="text-cream/80 hover:text-mustard transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/stock?category=tops" className="text-cream/80 hover:text-mustard transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link href="/stock?category=bottoms" className="text-cream/80 hover:text-mustard transition-colors">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link href="/stock?category=accessories" className="text-cream/80 hover:text-mustard transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-secondary font-semibold text-sm text-mustard mb-3 tracking-tight">About</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="text-cream/80 hover:text-mustard transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#craft" className="text-cream/80 hover:text-mustard transition-colors">
                  Craft & Materials
                </Link>
              </li>
              <li>
                <Link href="/about#community" className="text-cream/80 hover:text-mustard transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="text-cream/80 hover:text-mustard transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-secondary font-semibold text-sm text-mustard mb-3 tracking-tight">Help</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="#" className="text-cream/80 hover:text-mustard transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cream/80 hover:text-mustard transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cream/80 hover:text-mustard transition-colors">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cream/80 hover:text-mustard transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-cream/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/70 leading-normal">
            © 2025 Jaryq. Handcrafted with love in Kazakhstan. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link href="#" className="text-cream/70 hover:text-turquoise transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-cream/70 hover:text-turquoise transition-colors" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-cream/70 hover:text-turquoise transition-colors" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
