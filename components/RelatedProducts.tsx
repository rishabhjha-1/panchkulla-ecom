import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
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
  stock: number
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No related products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge className="absolute top-2 left-2 bg-red-500">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.featured && (
                <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
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
                <div className="flex gap-2">
                  {product.stock > 0 && (
                    <AddToCartButton
                      product={{
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0] || "/placeholder.svg",
                      }}
                      size="sm"
                    />
                  )}
                  <Link href={`/products/${product._id}`}>
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 