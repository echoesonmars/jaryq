import type React from "react"
import type { Metadata } from "next"
import { Lobster_Two, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Jaryq - Groovy Kazakh Fashion",
  description: "Make Jaryq, Not War. Sustainable retro streetwear from Kazakhstan.",
  generator: "v0.app",
  openGraph: {
    title: "Jaryq - Groovy Kazakh Fashion",
    description: "Make Jaryq, Not War. Sustainable retro streetwear from Kazakhstan.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${lobsterTwo.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
