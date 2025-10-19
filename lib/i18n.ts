import en from "@/locales/en.json"
import ru from "@/locales/ru.json"
import kk from "@/locales/kk.json"

export type Locale = "en" | "ru" | "kk"

const translations = {
  en,
  ru,
  kk,
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en
}

export function getLocaleFromCookie(): Locale {
  if (typeof window === "undefined") return "en"
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("locale="))
  const locale = cookie?.split("=")[1] as Locale
  return locale && ["en", "ru", "kk"].includes(locale) ? locale : "en"
}

export function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`
}
