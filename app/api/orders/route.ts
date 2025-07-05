import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Order from "@/lib/models/Order"
import Cart from "@/lib/models/Cart"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()
    await dbConnect()

    const order = new Order({
      user: session.user.id,
      ...orderData,
    })

    await order.save()

    // Clear user's cart after successful order
    await Cart.findOneAndDelete({ user: session.user.id })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const orders = await Order.find({ user: session.user.id }).populate("items.product").sort({ createdAt: -1 })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
