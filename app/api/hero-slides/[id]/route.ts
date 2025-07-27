import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import HeroSlide from '@/lib/models/HeroSlide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch a specific hero slide
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const slide = await HeroSlide.findById(params.id).lean()
    
    if (!slide) {
      return NextResponse.json(
        { success: false, error: 'Hero slide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      slide 
    })
  } catch (error) {
    console.error('Error fetching hero slide:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero slide' },
      { status: 500 }
    )
  }
}

// PUT - Update a hero slide (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const slide = await HeroSlide.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!slide) {
      return NextResponse.json(
        { success: false, error: 'Hero slide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      slide,
      message: 'Hero slide updated successfully' 
    })
  } catch (error) {
    console.error('Error updating hero slide:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update hero slide' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a hero slide (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const slide = await HeroSlide.findByIdAndDelete(params.id)
    
    if (!slide) {
      return NextResponse.json(
        { success: false, error: 'Hero slide not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Hero slide deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting hero slide:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero slide' },
      { status: 500 }
    )
  }
} 