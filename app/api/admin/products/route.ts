import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const products = await Product.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get admin products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productData = await request.json()
    await dbConnect()

    const product = new Product({
      ...productData,
      status: productData.status || "active",
      stock: productData.stock || 0,
      featured: productData.featured || false,
    })

    await product.save()

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
