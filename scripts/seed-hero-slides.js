const mongoose = require('mongoose')

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-atlas-connection-string'

// Hero Slide Schema
const HeroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  buttonText: {
    type: String,
    required: true,
    trim: true
  },
  buttonLink: {
    type: String,
    required: true,
    trim: true
  },
  secondaryButtonText: {
    type: String,
    required: true,
    trim: true
  },
  secondaryButtonLink: {
    type: String,
    required: true,
    trim: true
  },
  badge: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    icon: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const HeroSlide = mongoose.model('HeroSlide', HeroSlideSchema)

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

async function seedHeroSlides() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing hero slides
    console.log('Clearing existing hero slides...')
    await HeroSlide.deleteMany({})
    console.log('Existing hero slides cleared')

    // Insert new hero slides
    console.log('Inserting default hero slides...')
    const insertedSlides = await HeroSlide.insertMany(defaultSlides)
    console.log(`Successfully inserted ${insertedSlides.length} hero slides`)

    // Display inserted slides
    console.log('\nInserted slides:')
    insertedSlides.forEach((slide, index) => {
      console.log(`${index + 1}. ${slide.title}`)
      console.log(`   Image: ${slide.image}`)
      console.log(`   Order: ${slide.order}`)
      console.log('')
    })

    console.log('Hero slides seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding hero slides:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run the seeding function
seedHeroSlides() 