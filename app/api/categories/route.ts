import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/lib/models/Product"

export async function GET() {
  try {
    await dbConnect()

    // Get all unique categories with their product counts
    const categories = await Product.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          featuredCount: {
            $sum: { $cond: ["$featured", 1, 0] }
          }
        }
      },
      { $sort: { count: -1 } }
    ])

    // Transform the data to a more usable format
    const formattedCategories = categories.map(cat => ({
      name: cat._id,
      productCount: cat.count,
      featuredCount: cat.featuredCount
    }))

    return NextResponse.json({ categories: formattedCategories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
} 