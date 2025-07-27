"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useCart } from "@/app/context/CartContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  size?: "sm" | "default" | "lg"
  className?: string
}

export function AddToCartButton({ product, size = "sm", className }: AddToCartButtonProps) {
  const { data: session } = useSession()
  const { dispatch } = useCart()
  const { toast } = useToast()
  const { trackAddToCart } = useAnalytics()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Add to local cart state
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      })

      // Add to server cart
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      if (response.ok) {
        // Track the add to cart event
        trackAddToCart(product.id, product.name, product.price, 1)
        
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart`,
        })
      } else {
        throw new Error("Failed to add to cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size={size}
      onClick={handleAddToCart}
      disabled={loading}
      className={className}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
} 