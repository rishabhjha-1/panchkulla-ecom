import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import Cart from '@/lib/models/Cart'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST - Create new order
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

// GET - Fetch orders (admin gets all, user gets their own)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''
    
    const skip = (page - 1) * limit
    
    // Build filter query
    const filterQuery: any = status ? { status } : {}
    
    // Check if user is admin
    const isAdmin = session.user?.isAdmin
    
    let query = filterQuery
    if (!isAdmin) {
      // Regular users can only see their own orders
      query = { ...filterQuery, user: session.user.id }
    }
    
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query)
    ])
    
    return NextResponse.json({ 
      success: true, 
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
