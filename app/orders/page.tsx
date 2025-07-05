"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Package, Eye } from "lucide-react"

interface Order {
  _id: string
  items: Array<{
    product: {
      name: string
      images: string[]
    }
    quantity: number
    price: number
  }>
  totalAmount: number
  orderStatus: string
  paymentStatus: string
  createdAt: string
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin?callbackUrl=/orders")
      return
    }
    fetchOrders()
  }, [session, status, router])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "dispatched":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (status === "loading" || loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <Link href="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order._id.slice(-6)}</CardTitle>
                  <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Link href={`/orders/${order._id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                  <p className="text-lg font-bold">Total: ₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
