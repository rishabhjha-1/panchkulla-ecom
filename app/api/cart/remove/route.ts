import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Cart from "@/lib/models/Cart"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()
    await dbConnect()

    const cart = await Cart.findOne({ user: session.user.id })

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    cart.items = cart.items.filter((item: any) => item.product.toString() !== productId)

    await cart.save()
    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Remove from cart error:", error)
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 })
  }
} 