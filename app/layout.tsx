import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { SessionDebug } from "@/components/SessionDebug"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Punchakshri - Premium Ecommerce Store",
  description: "Discover amazing products at Punchakshri - Your trusted online shopping destination",
    applicationName: 'Punchakshri',
    keywords: ['Punchakshri', 'Ecommerce', 'Premium', 'Online Shopping', 'Premium Ecommerce Store'],
    authors: [{ name: 'Punchakshri', url: 'https://punchakshri.com' }],
    creator: 'Punchakshri',
    publisher: 'Punchakshri',
    openGraph: {
      title: "Punchakshri - Premium Ecommerce Store",
      description: "Discover amazing products at Punchakshri - Your trusted online shopping destination",
      url: 'https://punchakshri.com',
      siteName: 'Punchakshri',
      images: [
        { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Punchakshri' }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Punchakshri - Premium Ecommerce Store",
      description: "Discover amazing products at Punchakshri - Your trusted online shopping destination",
      images: ['/og-image.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: 'https://punchakshri.com',
    },  
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
        <Analytics />
      </body>
    </html>
  )
}
