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

    const { productId, quantity } = await request.json()
    await dbConnect()

    const cart = await Cart.findOne({ user: session.user.id })

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 })
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()
    return NextResponse.json({ message: "Cart updated successfully" })
  } catch (error) {
    console.error("Update cart error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
} 