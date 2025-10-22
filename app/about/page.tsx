"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DecorativeCircles } from "@/components/decorative-circles"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, Scissors, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Locale, getLocaleFromCookie, getTranslations } from "@/lib/i18n"

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>("en")
  const t = getTranslations(locale)

  useEffect(() => {
    setLocale(getLocaleFromCookie())
    const handleLocaleChange = () => {
      setLocale(getLocaleFromCookie())
    }
    window.addEventListener("localechange", handleLocaleChange)
    return () => window.removeEventListener("localechange", handleLocaleChange)
  }, [])

  return (
    <div className="min-h-screen psychedelic-bg">
      <Navbar />

      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/kazakh-artisan-workshop-vintage-textiles.jpg"
          alt="Jaryq workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-turquoise/50 via-transparent to-deep-brown/70" />

        <div className="relative z-10 text-center px-4 w-full max-w-[90%] sm:max-w-[85%] md:max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-cream mb-2 sm:mb-3 drop-shadow-lg tracking-tight leading-tight">
            {t.about.hero.title}
          </h1>
          <p className="font-secondary text-base sm:text-lg md:text-xl text-cream/95 leading-normal">
            {t.about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story Section - Better spacing and image sizing */}
      <section id="roots" className="container mx-auto px-4 py-10 sm:py-16 max-w-[1100px]">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-mustard rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-burnt-orange tracking-tight leading-tight">
                {t.about.story.title}
              </h2>
            </div>
            <div className="space-y-3 text-deep-brown/90 leading-normal">
              <p className="font-secondary text-sm sm:text-base">{t.about.story.content}</p>
              <p className="font-secondary text-sm sm:text-base">
                Our founders grew up surrounded by the intricate patterns of traditional Kazakh felt carpets (syrmak)
                and embroidered textiles, while also falling in love with vintage rock posters, psychedelic art, and the
                peace-and-love ethos of the hippie movement.
              </p>
              <p className="font-secondary text-sm sm:text-base">
                In 2023, we launched Jaryq as a celebration of both worlds—creating sustainable streetwear that honors
                our heritage while radiating groovy, positive vibes.
              </p>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden border-2 border-olive shadow-lg mt-6 md:mt-0">
            <Image
              src="/traditional-kazakh-textile-patterns-colorful.jpg"
              alt="Traditional Kazakh textiles"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Craft Section - Improved card layout */}
      <section id="craft" className="bg-white py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="paisley" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M25,10 Q35,10 35,20 Q35,30 25,30 Q20,30 20,25 Q20,20 25,20 Z"
                fill="currentColor"
                className="text-burnt-orange"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#paisley)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden border-2 border-red shadow-lg order-2 md:order-1">
              <Image
                src="/artisan-hands-sewing-embroidery-natural-materials.jpg"
                alt="Artisan crafting"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-3 sm:mb-5">
                <div className="w-11 h-11 bg-turquoise rounded-full flex items-center justify-center">
                  <Scissors className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-display text-4xl text-burnt-orange tracking-tight leading-tight">
                  Craft & Materials
                </h2>
              </div>
              <div className="space-y-3 text-deep-brown/90 leading-normal">
                <p className="font-secondary text-base">
                  At Jaryq we make small batches in Kazakhstan with local makers.
                  We prioritize durable construction, thoughtful sourcing, and artisan
                  techniques over mass production. Where possible, we use lower-impact
                  materials and processes to reduce waste and improve product longevity.
                </p>
                <div className="bg-cream p-2 sm:p-3 rounded-lg border-2 border-olive">
                  <h3 className="font-secondary font-bold text-base sm:text-lg text-deep-brown mb-2 sm:mb-3 tracking-tight">
                    Our Materials
                  </h3>
                  <ul className="space-y-2 font-secondary text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-burnt-orange font-bold">•</span>
                      <span>100% organic cotton and linen from sustainable farms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-burnt-orange font-bold">•</span>
                      <span>Natural plant-based dyes (no harsh chemicals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-burnt-orange font-bold">•</span>
                      <span>Handwoven wool from local shepherds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-burnt-orange font-bold">•</span>
                      <span>Recycled polyester for select pieces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-burnt-orange font-bold">•</span>
                      <span>Biodegradable packaging and shipping materials</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - Responsive card grid */}
      <section id="community" className="container mx-auto px-4 py-10 sm:py-16 max-w-[1100px]">
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-11 h-11 bg-olive rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-cream" />
            </div>
            <h2 className="font-display text-4xl text-burnt-orange tracking-tight leading-tight">
              {t.about.values.title}
            </h2>
          </div>
          <p className="font-secondary text-base text-deep-brown/80 max-w-3xl mx-auto leading-normal">
            Jaryq is more than a brand—it's a community of free spirits, artists, and dreamers who believe in positive
            vibes, cultural appreciation, and sustainable living.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Markets & Events */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-olive hover:border-mustard transition-all shadow-lg">
            <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden mb-3 sm:mb-5">
              <Image
                src="/outdoor-market-festival-colorful-stalls.jpg"
                alt="Jaryq at markets"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-secondary font-bold text-lg sm:text-xl text-deep-brown mb-2 tracking-tight">
              Markets & Festivals
            </h3>
            <p className="text-xs sm:text-sm text-deep-brown/80 leading-normal">
              Find us at local markets, music festivals, and pop-up events across Kazakhstan. Come vibe with us, try on
              our threads, and meet the makers.
            </p>
          </div>

          {/* Workshops */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-olive hover:border-mustard transition-all shadow-lg">
            <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden mb-3 sm:mb-5">
              <Image
                src="/craft-workshop-people-learning-embroidery.jpg"
                alt="Craft workshops"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-secondary font-bold text-lg sm:text-xl text-deep-brown mb-2 tracking-tight">Craft Workshops</h3>
            <p className="text-xs sm:text-sm text-deep-brown/80 leading-normal">
              We host regular workshops teaching traditional Kazakh embroidery, natural dyeing, and textile printing.
              Learn the craft, make your own groovy piece.
            </p>
          </div>

          {/* Collaborations */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-olive hover:border-mustard transition-all shadow-lg">
            <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden mb-3 sm:mb-5">
              <Image
                src="/artists-collaborating-creative-studio.jpg"
                alt="Artist collaborations"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-secondary font-bold text-lg sm:text-xl text-deep-brown mb-2 tracking-tight">Artist Collabs</h3>
            <p className="text-xs sm:text-sm text-deep-brown/80 leading-normal">
              We partner with local artists, musicians, and designers to create limited-edition pieces. Each
              collaboration brings fresh energy and unique perspectives.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - Better spacing and button sizing */}
      <section id="contact" className="bg-burnt-orange text-cream py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DecorativeCircles />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-[1100px]">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-cream rounded-full flex items-center justify-center">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-burnt-orange" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight leading-tight">Get in Touch</h2>
          </div>
          <p className="font-secondary text-base sm:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto leading-normal">
            Have questions? Want to collaborate? Just want to say hi? We'd love to hear from you!
          </p>
          <div className="space-y-1 sm:space-y-2 font-secondary text-sm sm:text-base mb-4 sm:mb-6">
            <p>
              <strong>Email:</strong> hello@jaryq.kz
            </p>
            <p>
              <strong>Phone:</strong> +7 (777) 123-4567
            </p>
            <p>
              <strong>Address:</strong> Shymkent, Kazakhstan
            </p>
          </div>
          <Button
            size="lg"
            className="bg-cream text-burnt-orange hover:bg-cream/90 font-secondary font-bold text-sm sm:text-base px-5 sm:px-7 py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Send Us a Message
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
