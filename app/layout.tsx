import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { SessionDebug } from "@/components/SessionDebug"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Panchkula - Premium Ecommerce Store",
  description: "Discover amazing products at Panchkula - Your trusted online shopping destination",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <SessionDebug />
        </Providers>
      </body>
    </html>
  )
}
