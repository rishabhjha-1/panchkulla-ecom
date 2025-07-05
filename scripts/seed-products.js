const mongoose = require('mongoose');
require('dotenv').config();

// Product Schema (matching your existing schema)
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "out-of-stock"],
    default: "active",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
}, {
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// Sample product data
const products = [
  // SOUTH INDIAN LADIES CLOTHING
  {
    name: "Silk Kanjivaram Saree - Traditional Red",
    description: "Authentic Kanjivaram silk saree with intricate zari work. Perfect for weddings and special occasions. Features traditional motifs and gold border.",
    price: 8500,
    originalPrice: 12000,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 15,
    status: "active",
    featured: true,
    tags: ["saree", "silk", "traditional", "wedding", "south indian"]
  },
  {
    name: "Cotton Handloom Saree - Blue & Gold",
    description: "Handcrafted cotton saree with traditional South Indian design. Comfortable for daily wear with elegant gold border.",
    price: 2200,
    originalPrice: 2800,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 25,
    status: "active",
    featured: false,
    tags: ["saree", "cotton", "handloom", "daily wear", "south indian"]
  },
  {
    name: "Kerala Kasavu Saree - Cream & Gold",
    description: "Classic Kerala Kasavu saree with golden border. Perfect for Onam and traditional celebrations. Pure cotton with zari work.",
    price: 3200,
    originalPrice: 4000,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 20,
    status: "active",
    featured: true,
    tags: ["saree", "kerala", "kasavu", "onam", "traditional"]
  },
  {
    name: "Tamil Nadu Cotton Saree - Green & Silver",
    description: "Traditional Tamil Nadu cotton saree with silver zari work. Features temple border design and comfortable fit.",
    price: 1800,
    originalPrice: 2200,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 30,
    status: "active",
    featured: false,
    tags: ["saree", "tamil nadu", "cotton", "temple border", "traditional"]
  },
  {
    name: "Silk Pattu Pavadai - Pink & Gold",
    description: "Traditional silk pavadai (half saree) for young girls. Perfect for traditional ceremonies and cultural events.",
    price: 4500,
    originalPrice: 6000,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 12,
    status: "active",
    featured: true,
    tags: ["pavadai", "silk", "traditional", "girls", "ceremony"]
  },
  {
    name: "Cotton Salwar Kameez - South Indian Style",
    description: "Comfortable cotton salwar kameez with South Indian embroidery. Perfect for daily wear and casual occasions.",
    price: 1500,
    originalPrice: 2000,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 35,
    status: "active",
    featured: false,
    tags: ["salwar kameez", "cotton", "daily wear", "casual", "embroidery"]
  },
  {
    name: "Silk Blouse Piece - Matching Set",
    description: "High-quality silk blouse piece with intricate embroidery. Perfect to match with your favorite sarees.",
    price: 1200,
    originalPrice: 1500,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 40,
    status: "active",
    featured: false,
    tags: ["blouse", "silk", "embroidery", "matching", "traditional"]
  },
  {
    name: "Karnataka Ilkal Saree - Red & Gold",
    description: "Traditional Ilkal saree from Karnataka with distinctive border design. Made from cotton and silk blend.",
    price: 2800,
    originalPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 18,
    status: "active",
    featured: true,
    tags: ["saree", "karnataka", "ilkal", "traditional", "cotton silk"]
  },
  {
    name: "Andhra Pradesh Gadwal Saree - Purple & Silver",
    description: "Elegant Gadwal saree with silver zari work. Features traditional motifs and comfortable cotton body with silk border.",
    price: 3800,
    originalPrice: 4800,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 22,
    status: "active",
    featured: false,
    tags: ["saree", "andhra pradesh", "gadwal", "silver zari", "traditional"]
  },
  {
    name: "Tamil Nadu Silk Saree - Orange & Gold",
    description: "Pure silk saree with traditional Tamil Nadu design. Features temple border and intricate pallu work.",
    price: 6500,
    originalPrice: 8500,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Clothing",
    stock: 10,
    status: "active",
    featured: true,
    tags: ["saree", "tamil nadu", "silk", "temple border", "pallu"]
  },

  // BEAUTY PRODUCTS
  {
    name: "Natural Sandalwood Face Pack",
    description: "Traditional South Indian sandalwood face pack for glowing skin. Made with pure sandalwood powder and natural ingredients.",
    price: 450,
    originalPrice: 600,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 50,
    status: "active",
    featured: true,
    tags: ["face pack", "sandalwood", "natural", "glowing skin", "traditional"]
  },
  {
    name: "Coconut Oil Hair Care Set",
    description: "Pure coconut oil hair care set with traditional South Indian herbs. Promotes hair growth and prevents hair fall.",
    price: 350,
    originalPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 60,
    status: "active",
    featured: false,
    tags: ["hair care", "coconut oil", "natural", "hair growth", "traditional"]
  },
  {
    name: "Turmeric & Honey Face Cream",
    description: "Traditional face cream with turmeric and honey. Provides natural glow and reduces blemishes.",
    price: 280,
    originalPrice: 380,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 45,
    status: "active",
    featured: false,
    tags: ["face cream", "turmeric", "honey", "natural glow", "blemish reduction"]
  },
  {
    name: "Neem & Tulsi Soap Bar",
    description: "Natural soap bar with neem and tulsi extracts. Perfect for acne-prone skin and daily cleansing.",
    price: 120,
    originalPrice: 150,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 80,
    status: "active",
    featured: false,
    tags: ["soap", "neem", "tulsi", "acne", "natural"]
  },
  {
    name: "Kumkumadi Oil - Traditional Face Oil",
    description: "Traditional kumkumadi oil for face massage. Contains saffron and other precious herbs for radiant skin.",
    price: 850,
    originalPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 25,
    status: "active",
    featured: true,
    tags: ["face oil", "kumkumadi", "saffron", "traditional", "radiant skin"]
  },
  {
    name: "Aloe Vera Gel - Pure Extract",
    description: "Pure aloe vera gel for skin and hair care. Natural moisturizer and healing agent.",
    price: 200,
    originalPrice: 250,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 70,
    status: "active",
    featured: false,
    tags: ["aloe vera", "gel", "moisturizer", "healing", "natural"]
  },
  {
    name: "Rose Water Toner",
    description: "Pure rose water toner for refreshing skin. Helps maintain pH balance and provides hydration.",
    price: 180,
    originalPrice: 220,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 55,
    status: "active",
    featured: false,
    tags: ["toner", "rose water", "pH balance", "hydration", "refreshing"]
  },
  {
    name: "Multani Mitti Clay Mask",
    description: "Traditional multani mitti clay mask for deep cleansing. Removes impurities and controls oil.",
    price: 150,
    originalPrice: 200,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Beauty",
    stock: 40,
    status: "active",
    featured: false,
    tags: ["clay mask", "multani mitti", "deep cleansing", "oil control", "traditional"]
  },

  // SPORTS PRODUCTS
  {
    name: "Yoga Mat - Premium Non-Slip",
    description: "High-quality yoga mat with non-slip surface. Perfect for yoga, pilates, and meditation practices.",
    price: 1200,
    originalPrice: 1500,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 30,
    status: "active",
    featured: true,
    tags: ["yoga mat", "non-slip", "premium", "yoga", "pilates"]
  },
  {
    name: "Resistance Bands Set - 5 Levels",
    description: "Complete resistance bands set with 5 different resistance levels. Perfect for strength training and rehabilitation.",
    price: 450,
    originalPrice: 600,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 45,
    status: "active",
    featured: false,
    tags: ["resistance bands", "strength training", "rehabilitation", "fitness", "home workout"]
  },
  {
    name: "Dumbbells Set - Adjustable 2-20kg",
    description: "Adjustable dumbbells set with weight range from 2kg to 20kg. Perfect for home gym and strength training.",
    price: 3500,
    originalPrice: 4500,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 15,
    status: "active",
    featured: true,
    tags: ["dumbbells", "adjustable", "strength training", "home gym", "fitness"]
  },
  {
    name: "Jump Rope - Professional Grade",
    description: "Professional grade jump rope with adjustable length and ball bearings. Perfect for cardio and coordination training.",
    price: 350,
    originalPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 60,
    status: "active",
    featured: false,
    tags: ["jump rope", "cardio", "coordination", "professional", "fitness"]
  },
  {
    name: "Foam Roller - High Density",
    description: "High-density foam roller for muscle recovery and myofascial release. Perfect for post-workout recovery.",
    price: 280,
    originalPrice: 350,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 35,
    status: "active",
    featured: false,
    tags: ["foam roller", "muscle recovery", "myofascial release", "recovery", "fitness"]
  },
  {
    name: "Fitness Tracker - Smart Watch",
    description: "Smart fitness tracker with heart rate monitor, GPS, and activity tracking. Perfect for monitoring workouts and health metrics.",
    price: 2500,
    originalPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 20,
    status: "active",
    featured: true,
    tags: ["fitness tracker", "smart watch", "heart rate", "GPS", "activity tracking"]
  },
  {
    name: "Yoga Block Set - EVA Foam",
    description: "Set of 2 yoga blocks made from high-density EVA foam. Perfect for yoga poses and stretching exercises.",
    price: 180,
    originalPrice: 220,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 50,
    status: "active",
    featured: false,
    tags: ["yoga blocks", "EVA foam", "yoga", "stretching", "fitness"]
  },
  {
    name: "Exercise Ball - Anti-Burst",
    description: "Anti-burst exercise ball for core training and stability exercises. Available in multiple sizes.",
    price: 450,
    originalPrice: 580,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 25,
    status: "active",
    featured: false,
    tags: ["exercise ball", "core training", "stability", "anti-burst", "fitness"]
  },
  {
    name: "Sports Water Bottle - Insulated",
    description: "Insulated sports water bottle with 1L capacity. Keeps drinks cold for 24 hours and hot for 12 hours.",
    price: 320,
    originalPrice: 400,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 40,
    status: "active",
    featured: false,
    tags: ["water bottle", "insulated", "sports", "hydration", "1L capacity"]
  },
  {
    name: "Gym Bag - Large Capacity",
    description: "Large capacity gym bag with multiple compartments. Perfect for carrying workout clothes and equipment.",
    price: 580,
    originalPrice: 750,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&crop=face"
    ],
    category: "Sports",
    stock: 30,
    status: "active",
    featured: false,
    tags: ["gym bag", "large capacity", "multiple compartments", "workout", "equipment"]
  }
];

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/panchkula-ecommerce');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Seed products
async function seedProducts() {
  try {
    console.log('🌱 Starting to seed products...');
    
    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('🗑️  Cleared existing products');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);
    
    // Display summary by category
    const categorySummary = {};
    insertedProducts.forEach(product => {
      if (!categorySummary[product.category]) {
        categorySummary[product.category] = 0;
      }
      categorySummary[product.category]++;
    });
    
    console.log('\n📊 Products by Category:');
    Object.entries(categorySummary).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    
    console.log('\n🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding
if (require.main === module) {
  connectDB().then(() => {
    seedProducts();
  });
}

module.exports = { seedProducts, connectDB }; 