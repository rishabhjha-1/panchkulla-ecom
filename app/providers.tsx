"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { CartProvider } from "./context/CartContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  )
}
