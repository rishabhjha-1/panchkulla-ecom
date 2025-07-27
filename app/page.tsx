import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Star, Truck, Shield, Headphones, ArrowRight, ShoppingBag, Heart, Zap, CheckCircle } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { HeroSlider } from "@/components/HeroSlider"

interface HeroSlide {
  _id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  badge: string
  features: Array<{ icon: string; text: string }>
  isActive: boolean
  order: number
}

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

async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/hero-slides`
    console.log('Fetching hero slides from:', apiUrl)
    
    const res = await fetch(apiUrl, {
      cache: 'no-store'
    })
    
    console.log('API response status:', res.status)
    
    if (res.ok) {
      const data = await res.json()
      console.log('API response data:', data)
      console.log('Hero slides found:', data.slides?.length || 0)
      return data.slides || []
    } else {
      console.error('API request failed with status:', res.status)
      const errorText = await res.text()
      console.error('API error response:', errorText)
      return []
    }
    
  } catch (error) {
    console.error('Error fetching hero slides:', error)
    return []
  }
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const apiUrl = `https://panchkulla-ecom.vercel.app/api/products?featured=true&limit=4`
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
        const fallbackRes = await fetch(`https://panchkulla-ecom.vercel.app/api/products?limit=4`, {
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
  const [heroSlides, featuredProducts] = await Promise.all([
    getHeroSlides(),
    getFeaturedProducts()
  ])
  
  const isShowingFeatured = featuredProducts.some(product => product.featured)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-beige-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4" />
              Trusted by 10,000+ customers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">Why Choose Punchakshri?</h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">Experience the best in online shopping with our premium services and exceptional customer care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">Fast Delivery</h3>
                <p className="text-amber-800 leading-relaxed">Quick and reliable shipping to your doorstep with real-time tracking</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">Secure Shopping</h3>
                <p className="text-amber-800 leading-relaxed">Your data and payments are always protected with bank-level security</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">24/7 Support</h3>
                <p className="text-amber-800 leading-relaxed">Always here to help with your questions and provide expert assistance</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">Quality Guaranteed</h3>
                <p className="text-amber-800 leading-relaxed">Every product is carefully curated and quality-tested for your satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              {isShowingFeatured ? 'Best Sellers' : 'Popular Products'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              {isShowingFeatured ? 'Featured Products' : 'Popular Products'}
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              {isShowingFeatured 
                ? 'Discover our most popular and trending items, carefully selected for quality and value'
                : 'Explore our curated collection of high-quality products'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Card key={product._id} className="group hover-lift animate-scale-in bg-amber-50/80 border-amber-200/50">
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
                      {product.featured && <Badge className="absolute top-2 right-2 bg-amber-600">Featured</Badge>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-amber-900">{product.name}</h3>
                      <p className="text-amber-800 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-sm text-amber-700 ml-2">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-amber-700">₹{product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-amber-600 line-through ml-2">₹{product.originalPrice}</span>
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
                            <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">View Details</Button>
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
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">No Featured Products Available</h3>
                  <p className="text-amber-800 mb-6">
                    We're currently updating our featured products. Check back soon for our latest selections!
                  </p>
                  <Link href="/products">
                    <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 hover:from-amber-700 hover:to-orange-700">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 hover:from-amber-700 hover:to-orange-700">
                {isShowingFeatured ? 'View All Products' : 'Browse All Products'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-beige-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="h-4 w-4" />
              Customer Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">Real feedback from satisfied customers who love shopping with us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-800 mb-6 leading-relaxed">
                  "Amazing shopping experience! The products are high quality and delivery was super fast. Will definitely shop again!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    RS
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900">Rahul Sharma</h4>
                    <p className="text-amber-700 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-800 mb-6 leading-relaxed">
                  "Excellent customer service and great product selection. The prices are competitive and quality is outstanding."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    PP
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900">Priya Patel</h4>
                    <p className="text-amber-700 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover-lift border-0 shadow-lg bg-amber-50/80 backdrop-blur-sm border-amber-200/50">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-800 mb-6 leading-relaxed">
                  "Fast delivery, secure payments, and amazing products. Punchakshri has become my go-to online store!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    AK
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900">Amit Kumar</h4>
                    <p className="text-amber-700 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">10K+</div>
              <div className="text-amber-100">Happy Customers</div>
            </div>
            <div className="animate-fade-in-delay">
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">50K+</div>
              <div className="text-amber-100">Products Sold</div>
            </div>
            <div className="animate-fade-in-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">99%</div>
              <div className="text-amber-100">Satisfaction Rate</div>
            </div>
            <div className="animate-fade-in-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">24/7</div>
              <div className="text-amber-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 text-amber-100">Get the latest deals, product updates, and exclusive offers delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white/20" 
              />
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 hover:from-amber-500 hover:to-orange-600 px-8 py-4">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-amber-200 mt-4">No spam, unsubscribe at any time</p>
          </div>
        </div>
      </section>
    </div>
  )
}
