"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/CartContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const { state } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked, current state:', isMobileMenuOpen)
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    console.log('Closing mobile menu')
    setIsMobileMenuOpen(false)
  }

  console.log('Mobile menu state:', isMobileMenuOpen)

  return (
    <>
      <nav className="bg-white shadow-lg border-b relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                <Image
                  src="/logo.png"
                  alt="Punchakshri"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-xl md:text-2xl font-bold text-blue-600">Punchakshri</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {state.items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    {session.user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/signin">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {state.items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="border border-gray-300 bg-blue-50"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
          style={{
            position: 'fixed',
            top: '64px',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            minHeight: '300px'
          }}
        >
          <div className="px-4 py-4 space-y-2">
            <div className="text-sm font-medium text-gray-500 mb-3">Navigation</div>
            
            <Link 
              href="/" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
              onClick={closeMobileMenu}
            >
              🏠 Home
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
              onClick={closeMobileMenu}
            >
              📦 Products
            </Link>
            <Link 
              href="/categories" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
              onClick={closeMobileMenu}
            >
              📂 Categories
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
              onClick={closeMobileMenu}
            >
              ℹ️ About
            </Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-3">Actions</div>
              
              <Button variant="ghost" size="sm" className="w-full justify-start mb-2 border border-gray-100">
                <Search className="h-4 w-4 mr-2" />
                🔍 Search
              </Button>
              
              {session ? (
                <div className="space-y-2">
                  <Link 
                    href="/profile" 
                    className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                    onClick={closeMobileMenu}
                  >
                    👤 Profile
                  </Link>
                  <Link 
                    href="/orders" 
                    className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                    onClick={closeMobileMenu}
                  >
                    📋 My Orders
                  </Link>
                  {session.user?.isAdmin && (
                    <Link 
                      href="/admin" 
                      className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                      onClick={closeMobileMenu}
                    >
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      signOut()
                      closeMobileMenu()
                    }}
                    className="block w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                  onClick={closeMobileMenu}
                >
                  🔑 Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
