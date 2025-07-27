"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, ShoppingCart, Users, TrendingUp, Image } from "lucide-react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    loading: true
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session || !session.user?.isAdmin) {
      router.push("/")
    }
  }, [session, status, router])

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/users')
      ])

      const productsData = await productsRes.json()
      const ordersData = await ordersRes.json()
      const usersData = await usersRes.json()

      // Calculate total revenue from orders
      const totalRevenue = ordersData.orders?.reduce((sum: number, order: any) => {
        return sum + (order.totalAmount || 0)
      }, 0) || 0

      setStats({
        totalProducts: productsData.products?.length || 0,
        totalOrders: ordersData.orders?.length || 0,
        totalUsers: usersData.users?.length || 0,
        totalRevenue: totalRevenue,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session || !session.user?.isAdmin) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your ecommerce store</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.loading ? "..." : stats.totalProducts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.loading ? "Loading..." : "Active products in store"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.loading ? "..." : stats.totalOrders.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.loading ? "Loading..." : "Orders processed"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.loading ? "..." : stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.loading ? "Loading..." : "Registered users"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.loading ? "..." : `₹${stats.totalRevenue.toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.loading ? "Loading..." : "Total sales revenue"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/products">
              <Button className="w-full">Manage Products</Button>
            </Link>
            <Link href="/admin/products/add">
              <Button variant="outline" className="w-full bg-transparent">
                Add New Product
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/orders">
              <Button className="w-full">View All Orders</Button>
            </Link>
            <Link href="/admin/orders?status=pending">
              <Button variant="outline" className="w-full bg-transparent">
                Pending Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/users">
              <Button className="w-full">Manage Users</Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full bg-transparent">
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/analytics">
              <Button className="w-full">View Analytics</Button>
            </Link>
            <Link href="/admin/hero-slides">
              <Button variant="outline" className="w-full bg-transparent">
                Hero Slider
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Slider Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/hero-slides">
              <Button className="w-full">Manage Hero Slides</Button>
            </Link>
            <Link href="/admin/hero-slides">
              <Button variant="outline" className="w-full bg-transparent">
                Add New Slide
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
