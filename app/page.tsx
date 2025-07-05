import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Star, Truck, Shield, Headphones, ArrowRight, ShoppingBag, Heart, Zap } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  featured: boolean
  status: string
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?featured=true&limit=4`, {
      cache: 'no-store'
    })
    
    if (res.ok) {
      const data = await res.json()
      return data.products || []
    }
    
    return []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-yellow-300">Punchakshri</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">
              Discover premium products with exceptional quality and service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 group hover:scale-105 transition-transform">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent group hover:scale-105 transition-transform"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Punchakshri?</h2>
            <p className="text-lg text-gray-600">Experience the best in online shopping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="text-gray-600">Your data and payments are always protected</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Headphones className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always here to help with your questions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Discover our most popular items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Card key={product._id} className="group hover-lift animate-scale-in">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      {product.featured && <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <AddToCartButton
                          product={{
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0] || "/placeholder.svg",
                          }}
                          size="sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Fallback to mock products if no featured products found
              [1, 2, 3, 4].map((i) => (
                <Card key={i} className="group hover-lift animate-scale-in">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={`/placeholder.svg?height=250&width=250`}
                        alt={`Product ${i}`}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">Premium Product {i}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-blue-600">₹{999 + i * 100}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{1299 + i * 100}</span>
                        </div>
                        <AddToCartButton
                          product={{
                            id: `product-${i}`,
                            name: `Premium Product ${i}`,
                            price: 999 + i * 100,
                            image: `/placeholder.svg?height=250&width=250`,
                          }}
                          size="sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get the latest deals and product updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
