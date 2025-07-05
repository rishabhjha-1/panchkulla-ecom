import { NextResponse } from "next/server"
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
