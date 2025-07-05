import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, ShoppingBag, Monitor, Shirt, Home, Trophy, BookOpen, Sparkles, Gamepad2, Package } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"

interface Category {
  name: string
  productCount: number
  featuredCount: number
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
  stock: number
}

// Category icons mapping
const categoryIcons: { [key: string]: any } = {
  "Electronics": Monitor,
  "Clothing": Shirt,
  "Home & Garden": Home,
  "Sports": Trophy,
  "Books": BookOpen,
  "Beauty": Sparkles,
  "Toys": Gamepad2,
  "Other": Package
}

// Category colors mapping
const categoryColors: { [key: string]: string } = {
  "Electronics": "bg-blue-100 text-blue-600",
  "Clothing": "bg-purple-100 text-purple-600",
  "Home & Garden": "bg-green-100 text-green-600",
  "Sports": "bg-orange-100 text-orange-600",
  "Books": "bg-red-100 text-red-600",
  "Beauty": "bg-pink-100 text-pink-600",
  "Toys": "bg-yellow-100 text-yellow-600",
  "Other": "bg-gray-100 text-gray-600"
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store'
    })
    
    if (res.ok) {
      const data = await res.json()
      return data.categories || []
    }
    
    return []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?featured=true&limit=8`, {
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

export default async function CategoriesPage() {
  const categories = await getCategories()
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Product Categories
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explore our wide range of products organized by categories
          </p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <span className="bg-white/20 px-4 py-2 rounded-full">
              {categories.length} Categories
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)} Products
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[category.name] || Package
              const colorClass = categoryColors[category.name] || "bg-gray-100 text-gray-600"
              
              return (
                <Card key={category.name} className="group hover-lift cursor-pointer animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{category.productCount} Products</span>
                        {category.featuredCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {category.featuredCount} Featured
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Browse Category
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600">Handpicked products from our best categories</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Card key={product._id} className="group hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>
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
                          <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
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
                      <div className="mt-2 text-sm">
                        <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock > 0 ? `${product.stock} pieces left` : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View All Products
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Category Overview</h2>
            <p className="text-lg text-gray-600">Quick stats about our product categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length}</div>
                <div className="text-gray-600">Total Categories</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </div>
                <div className="text-gray-600">Total Products</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {categories.reduce((sum, cat) => sum + cat.featuredCount, 0)}
                </div>
                <div className="text-gray-600">Featured Products</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length)}
                </div>
                <div className="text-gray-600">Avg Products/Category</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 