import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import HeroSlide from '@/lib/models/HeroSlide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch all active hero slides
export async function GET() {
  try {
    await dbConnect()
    
    const slides = await HeroSlide.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()
    
    return NextResponse.json({ 
      success: true, 
      slides 
    })
  } catch (error) {
    console.error('Error fetching hero slides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero slides' },
      { status: 500 }
    )
  }
}

// POST - Create a new hero slide (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'title', 'subtitle', 'description', 'image', 
      'buttonText', 'buttonLink', 'secondaryButtonText', 
      'secondaryButtonLink', 'badge', 'features'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Get the highest order number
    const lastSlide = await HeroSlide.findOne().sort({ order: -1 })
    const newOrder = lastSlide ? lastSlide.order + 1 : 0

    const slide = new HeroSlide({
      ...body,
      order: newOrder
    })
    
    await slide.save()
    
    return NextResponse.json({ 
      success: true, 
      slide,
      message: 'Hero slide created successfully' 
    })
  } catch (error) {
    console.error('Error creating hero slide:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create hero slide' },
      { status: 500 }
    )
  }
} 