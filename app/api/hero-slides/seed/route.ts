import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import HeroSlide from '@/lib/models/HeroSlide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST - Seed default hero slides (admin only)
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
    
    // Default hero slides data
    const defaultSlides = [
      {
        title: "Premium Shopping Experience",
        subtitle: "Discover curated products with exceptional quality",
        description: "Experience the best in online shopping with our premium services and exceptional customer care. Trusted by 10,000+ customers.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
        buttonText: "Explore Products",
        buttonLink: "/products",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "/about",
        badge: "Trusted by 10,000+ customers",
        features: [
          { icon: "Shield", text: "Secure Payments" },
          { icon: "Truck", text: "Fast Delivery" },
          { icon: "CheckCircle", text: "Quality Guaranteed" }
        ],
        order: 0
      },
      {
        title: "Exclusive Deals & Offers",
        subtitle: "Save big on premium products",
        description: "Get amazing discounts on our curated collection. Limited time offers on the best products with guaranteed quality and fast delivery.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center",
        buttonText: "Shop Now",
        buttonLink: "/products",
        secondaryButtonText: "View Deals",
        secondaryButtonLink: "/categories",
        badge: "Limited Time Offers",
        features: [
          { icon: "Zap", text: "Flash Sales" },
          { icon: "Heart", text: "Wishlist Favorites" },
          { icon: "Star", text: "Premium Quality" }
        ],
        order: 1
      },
      {
        title: "24/7 Customer Support",
        subtitle: "We're here to help you",
        description: "Our dedicated support team is available round the clock to assist you with any questions or concerns. Your satisfaction is our priority.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
        buttonText: "Contact Us",
        buttonLink: "/contact",
        secondaryButtonText: "Get Help",
        secondaryButtonLink: "/help",
        badge: "24/7 Support Available",
        features: [
          { icon: "Headphones", text: "Live Chat" },
          { icon: "Shield", text: "Secure Shopping" },
          { icon: "CheckCircle", text: "Easy Returns" }
        ],
        order: 2
      }
    ]

    // Check if slides already exist
    const existingSlides = await HeroSlide.countDocuments()
    
    if (existingSlides > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Hero slides already exist. Please delete existing slides first.' 
      })
    }

    // Insert new hero slides
    const insertedSlides = await HeroSlide.insertMany(defaultSlides)
    
    return NextResponse.json({ 
      success: true,
      message: `Successfully created ${insertedSlides.length} hero slides`,
      slides: insertedSlides
    })
  } catch (error) {
    console.error('Error seeding hero slides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed hero slides' },
      { status: 500 }
    )
  }
} 