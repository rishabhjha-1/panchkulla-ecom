"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, Package, DollarSign } from "lucide-react"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  recentOrders: any[]
  topProducts: any[]
  monthlyRevenue: number[]
  orderStatus: {
    pending: number
    processing: number
    shipped: number
    delivered: number
    cancelled: number
  }
}

export default function AnalyticsAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session || !session.user?.isAdmin) {
      router.push("/")
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetchAnalytics()
    }
  }, [session])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/users')
      ])

      const productsData = await productsRes.json()
      const ordersData = await ordersRes.json()
      const usersData = await usersRes.json()

      // Calculate analytics
      const orders = ordersData.orders || []
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0)
      
      // Calculate order status distribution
      const orderStatus = {
        pending: orders.filter((o: any) => o.status === 'pending').length,
        processing: orders.filter((o: any) => o.status === 'processing').length,
        shipped: orders.filter((o: any) => o.status === 'shipped').length,
        delivered: orders.filter((o: any) => o.status === 'delivered').length,
        cancelled: orders.filter((o: any) => o.status === 'cancelled').length
      }

      // Get recent orders
      const recentOrders = orders.slice(0, 5)

      // Mock monthly revenue (in real app, you'd calculate this from actual data)
      const monthlyRevenue = [45000, 52000, 48000, 61000, 55000, 67000, 72000, 68000, 75000, 82000, 78000, 85000]

      setAnalytics({
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: productsData.products?.length || 0,
        totalUsers: usersData.users?.length || 0,
        recentOrders,
        topProducts: productsData.products?.slice(0, 5) || [],
        monthlyRevenue,
        orderStatus
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session || !session.user?.isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading analytics...</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">No analytics data available</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of your ecommerce performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.orderStatus.pending / analytics.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">{analytics.orderStatus.pending}</Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Processing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.orderStatus.processing / analytics.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">{analytics.orderStatus.processing}</Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Shipped</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.orderStatus.shipped / analytics.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">{analytics.orderStatus.shipped}</Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Delivered</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.orderStatus.delivered / analytics.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">{analytics.orderStatus.delivered}</Badge>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Cancelled</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(analytics.orderStatus.cancelled / analytics.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                  <Badge variant="secondary">{analytics.orderStatus.cancelled}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentOrders.map((order: any) => (
                <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">₹{order.totalAmount}</p>
                  </div>
                  <Badge variant={
                    order.status === 'delivered' ? 'default' :
                    order.status === 'shipped' ? 'secondary' :
                    order.status === 'processing' ? 'outline' :
                    'destructive'
                  }>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: `${(revenue / Math.max(...analytics.monthlyRevenue)) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {new Date(2024, index).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 