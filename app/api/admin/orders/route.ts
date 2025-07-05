import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Order from "@/lib/models/Order"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort({ createdAt: -1 })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get admin orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
