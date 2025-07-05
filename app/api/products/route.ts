import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const page = Number.parseInt(searchParams.get("page") || "1")

    const query: any = { status: "active" }

    if (category) {
      query.category = category
    }

    if (featured === "true") {
      query.featured = true
    }

    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await Product.countDocuments(query)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    await dbConnect()

    const product = new Product(data)
    await product.save()

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
