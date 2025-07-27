"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Camera, Upload, Download, RotateCcw, Search, Star } from "lucide-react"
import { VirtualTryOn } from "@/components/VirtualTryOn"
import { useAnalytics } from "@/hooks/use-analytics"
import Image from "next/image"

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

export default function VirtualTryOnPage() {
  const { trackUserAction } = useAnalytics()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchProducts()
    trackUserAction('virtual_try_on_page_view')
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }
      if (searchTerm) {
        params.append("search", searchTerm)
      }

      const res = await fetch(`/api/products?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // Debounce search
    setTimeout(() => {
      fetchProducts()
    }, 500)
  }

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "dresses", label: "Dresses" },
    { value: "tops", label: "Tops" },
    { value: "bottoms", label: "Bottoms" },
    { value: "outfits", label: "Outfits" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Try-On Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your photo and see how our beautiful dresses look on you! 
            Try on multiple outfits virtually before making your purchase.
          </p>
        </div>

        {/* How it works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Virtual Try-On Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Upload Your Photo</h3>
                <p className="text-sm text-gray-600">
                  Take a clear photo or upload an existing one. Make sure you're facing the camera directly.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Choose Your Dress</h3>
                <p className="text-sm text-gray-600">
                  Browse our collection and select any dress you'd like to try on virtually.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">3. See the Result</h3>
                <p className="text-sm text-gray-600">
                  Our AI will show you exactly how the dress looks on you. Download and share your results!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search dresses..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                fetchProducts()
              }}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="group hover:shadow-lg transition-shadow">
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
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <VirtualTryOn
                      product={{
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0] || "/placeholder.svg",
                        category: product.category,
                      }}
                      trigger={
                        <Button className="w-full" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Try On This Dress
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No dresses found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Photo Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use a clear, well-lit photo</li>
                  <li>• Face the camera directly</li>
                  <li>• Wear form-fitting clothes</li>
                  <li>• Avoid busy backgrounds</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Best Practices</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Try different lighting conditions</li>
                  <li>• Experiment with various poses</li>
                  <li>• Compare multiple dresses</li>
                  <li>• Save your favorite results</li>
                  <li>• Share with friends for feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 