import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import HeroSlide from '@/lib/models/HeroSlide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST - Reorder hero slides (admin only)
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
    const { slideIds } = await request.json()
    
    if (!Array.isArray(slideIds)) {
      return NextResponse.json(
        { success: false, error: 'slideIds must be an array' },
        { status: 400 }
      )
    }

    // Update order for each slide
    const updatePromises = slideIds.map((slideId: string, index: number) => {
      return HeroSlide.findByIdAndUpdate(slideId, { order: index })
    })
    
    await Promise.all(updatePromises)
    
    return NextResponse.json({ 
      success: true,
      message: 'Hero slides reordered successfully' 
    })
  } catch (error) {
    console.error('Error reordering hero slides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reorder hero slides' },
      { status: 500 }
    )
  }
} 