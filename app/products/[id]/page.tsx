import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Star, Truck, Shield, RotateCcw, Package, Heart, Share2 } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { ProductGallery } from "@/components/ProductGallery"
import { ProductReviews } from "@/components/ProductReviews"
import { RelatedProducts } from "@/components/RelatedProducts"

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
  tags?: string[]
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'no-store'
    })
    
    if (res.ok) {
      const data = await res.json()
      return data.product
    }
    
    return null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category=${category}&limit=4`, {
      cache: 'no-store'
    })
    
    if (res.ok) {
      const data = await res.json()
      return data.products.filter((product: Product) => product._id !== currentId) || []
    }
    
    return []
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id)
  const discountPercentage = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Products
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.featured && (
                  <Badge className="bg-blue-500 text-white">Featured</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-red-500 text-white">{discountPercentage}% OFF</Badge>
                )}
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} pieces left` : "Out of Stock"}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8 • 127 reviews)</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-green-600 font-medium">You save ₹{(product.originalPrice! - product.price).toLocaleString()} ({discountPercentage}%)</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Stock Status</p>
                  <p className="text-sm text-gray-600">
                    {product.stock > 0 
                      ? `${product.stock} pieces available` 
                      : "Currently out of stock"
                    }
                  </p>
                </div>
                {product.stock > 0 && (
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((product.stock / 10) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              {product.stock > 0 ? (
                <div className="flex gap-4">
                  <AddToCartButton
                    product={{
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0] || "/placeholder.svg",
                    }}
                    size="lg"
                    className="flex-1"
                  />
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </Button>
                </div>
              ) : (
                <Button disabled size="lg" className="w-full">
                  Out of Stock
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    {product.tags && product.tags.length > 0 && (
                      <div>
                        <span className="text-gray-600">Tags:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Free shipping on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Estimated delivery: 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Secure packaging and handling</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <ProductReviews productId={product._id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
} 