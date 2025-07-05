import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Panchkula</h3>
            <p className="text-gray-300 mb-4">
              Your trusted online shopping destination for premium products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-blue-400" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-blue-400" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-pink-400" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-gray-300">support@panchkula.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-gray-300">Panchkula, Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 Panchkula. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
