import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Cart from "@/lib/models/Cart"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const cart = await Cart.findOne({ user: session.user.id }).populate("items.product")

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    const items = cart.items.map((item: any) => ({
      id: item.product._id.toString(),
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity,
    }))

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity = 1 } = await request.json()
    await dbConnect()

    let cart = await Cart.findOne({ user: session.user.id })

    if (!cart) {
      cart = new Cart({ user: session.user.id, items: [] })
    }

    const existingItemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId)

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    return NextResponse.json({ message: "Item added to cart" })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
