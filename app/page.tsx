import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Star, Truck, Shield, Headphones, ArrowRight, ShoppingBag, Heart, Zap, CheckCircle } from "lucide-react"
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
    const apiUrl = `http://localhost:3000/api/products?featured=true&limit=4`
    console.log('Fetching featured products from:', apiUrl)
    
    const res = await fetch(apiUrl, {
      cache: 'no-store'
    })
    
    console.log('API response status:', res.status)
    
    if (res.ok) {
      const data = await res.json()
      console.log('API response data:', data)
      console.log('Featured products found:', data.products?.length || 0)
      
      // If no featured products found, try to get some regular products as fallback
      if (!data.products || data.products.length === 0) {
        console.log('No featured products found, fetching regular products as fallback')
        const fallbackRes = await fetch(`http://localhost:3000/api/products?limit=4`, {
          cache: 'no-store'
        })
        
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json()
          console.log('Fallback products found:', fallbackData.products?.length || 0)
          return fallbackData.products || []
        }
      }
      
      return data.products || []
    } else {
      console.error('API request failed with status:', res.status)
      const errorText = await res.text()
      console.error('API error response:', errorText)
      
      // Try fallback to regular products
      console.log('Trying fallback to regular products')
      const fallbackRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?limit=4`, {
        cache: 'no-store'
      })
      
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        console.log('Fallback products found:', fallbackData.products?.length || 0)
        return fallbackData.products || []
      }
      
      return []
    }
    
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const isShowingFeatured = featuredProducts.some(product => product.featured)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
                Premium Shopping
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  Experience
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay leading-relaxed">
                Discover curated products with exceptional quality, competitive prices, and unmatched customer service at Punchakshri.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-2">
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600 group hover:scale-105 transition-all duration-300 shadow-lg">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-blue-900 bg-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12 animate-fade-in-delay-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-blue-100">Quality Guaranteed</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hidden lg:block animate-fade-in-delay-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mb-3"></div>
                        <h3 className="font-semibold text-white">Premium Quality</h3>
                        <p className="text-blue-100 text-sm">Curated selection</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg mb-3"></div>
                        <h3 className="font-semibold text-white">Fast Delivery</h3>
                        <p className="text-blue-100 text-sm">3-5 business days</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mb-3"></div>
                        <h3 className="font-semibold text-white">Best Prices</h3>
                        <p className="text-blue-100 text-sm">Competitive rates</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-3"></div>
                        <h3 className="font-semibold text-white">24/7 Support</h3>
                        <p className="text-blue-100 text-sm">Always here to help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4" />
              Trusted by 10,000+ customers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Punchakshri?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience the best in online shopping with our premium services and exceptional customer care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">Quick and reliable shipping to your doorstep with real-time tracking</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Shopping</h3>
                <p className="text-gray-600 leading-relaxed">Your data and payments are always protected with bank-level security</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">Always here to help with your questions and provide expert assistance</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Guaranteed</h3>
                <p className="text-gray-600 leading-relaxed">Every product is carefully curated and quality-tested for your satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              {isShowingFeatured ? 'Best Sellers' : 'Popular Products'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {isShowingFeatured ? 'Featured Products' : 'Popular Products'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isShowingFeatured 
                ? 'Discover our most popular and trending items, carefully selected for quality and value'
                : 'Explore our curated collection of high-quality products'
              }
            </p>
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
                        <div className="flex flex-col gap-2">
                        <AddToCartButton
                          product={{
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0] || "/placeholder.svg",
                          }}
                          size="sm"
                        />
                         <Link href={`/products/${product._id}`}>
                            <Button size="sm" variant="outline">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Show message when no featured products are found
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Featured Products Available</h3>
                  <p className="text-gray-600 mb-6">
                    We're currently updating our featured products. Check back soon for our latest selections!
                  </p>
                  <Link href="/products">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">
                {isShowingFeatured ? 'View All Products' : 'Browse All Products'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="h-4 w-4" />
              Customer Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real feedback from satisfied customers who love shopping with us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Amazing shopping experience! The products are high quality and delivery was super fast. Will definitely shop again!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    RS
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rahul Sharma</h4>
                    <p className="text-gray-600 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Excellent customer service and great product selection. The prices are competitive and quality is outstanding."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    PP
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Priya Patel</h4>
                    <p className="text-gray-600 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Fast delivery, secure payments, and amazing products. Punchakshri has become my go-to online store!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    AK
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
                    <p className="text-gray-600 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="animate-fade-in-delay">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>
            <div className="animate-fade-in-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div className="animate-fade-in-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 text-blue-100">Get the latest deals, product updates, and exclusive offers delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white/20" 
              />
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600 px-8 py-4">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">No spam, unsubscribe at any time</p>
          </div>
        </div>
      </section>
    </div>
  )
}
