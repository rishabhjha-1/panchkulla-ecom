import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"

async function getProducts() {
  // In a real app, this would fetch from your API
  return [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 2999,
      originalPrice: 3999,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Electronics",
      featured: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      description: "Track your fitness goals with this advanced smartwatch",
      price: 4999,
      originalPrice: 6999,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Electronics",
      featured: false,
    },
    // Add more products...
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.originalPrice > product.price && (
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
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <AddToCartButton
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0] || "/placeholder.svg",
                      }}
                      size="sm"
                    />
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
