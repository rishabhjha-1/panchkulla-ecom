"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Order {
  _id: string
  user: {
    name: string
    email: string
  }
  totalAmount: number
  orderStatus: string
  paymentStatus: string
  createdAt: string
  items: Array<{
    product: {
      name: string
    }
    quantity: number
  }>
}

export default function AdminOrders() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session || !session.user?.isAdmin) {
      router.push("/")
      return
    }
    fetchOrders()
  }, [session, status, router])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders")
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

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      })
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error("Error updating order:", error)
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

  if (!session || !session.user?.isAdmin) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Management</h1>
        <p className="text-gray-600">Manage customer orders and update their status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono">#{order._id.slice(-6)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.user.name}</p>
                      <p className="text-sm text-gray-600">{order.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.product.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateOrderStatus(order._id, "confirmed")}>
                          Mark Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order._id, "dispatched")}>
                          Mark Dispatched
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order._id, "delivered")}>
                          Mark Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order._id, "cancelled")}>
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
