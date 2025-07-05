"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }

    if (session?.user) {
      try {
        await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id, quantity }),
        })
      } catch (error) {
        console.error("Error updating cart:", error)
      }
    }
  }

  const removeItem = async (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })

    if (session?.user) {
      try {
        await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        })
      } catch (error) {
        console.error("Error removing item:", error)
      }
    }
  }

  const handleCheckout = () => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
      })
      router.push("/auth/signin?callbackUrl=/checkout")
    } else {
      router.push("/checkout")
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({state.items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-blue-600 font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{state.total > 500 ? 0 : 50}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{(state.total * 0.18).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{(state.total + (state.total > 500 ? 0 : 50) + state.total * 0.18).toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
                {loading ? "Processing..." : "Proceed to Checkout"}
              </Button>
              <p className="text-sm text-gray-600 text-center">
                {state.total < 500 && "Free shipping on orders over ₹500"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
