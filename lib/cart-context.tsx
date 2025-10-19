"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string, size?: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("jaryq-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("jaryq-cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id && i.size === item.size && i.color === item.color)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += item.quantity || 1
        return updated
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }

  const removeItem = (id: string, size?: string, color?: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)))
  }

  const updateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(id, size, color)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
