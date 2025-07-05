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

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function checkProducts() {
  try {
    await connectDB();
    
    // Check total products
    const totalProducts = await Product.countDocuments();
    console.log(`\n📊 Total products in database: ${totalProducts}`);
    
    if (totalProducts === 0) {
      console.log('❌ No products found in database!');
      console.log('💡 Run the seed script: npm run seed');
      return;
    }
    
    // Check featured products
    const featuredProducts = await Product.find({ featured: true, status: "active" });
    console.log(`⭐ Featured products: ${featuredProducts.length}`);
    
    if (featuredProducts.length === 0) {
      console.log('⚠️  No featured products found!');
      console.log('💡 You can mark products as featured in the admin panel or update the seed script');
    } else {
      console.log('\n📋 Featured products:');
      featuredProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
      });
    }
    
    // Check active products
    const activeProducts = await Product.find({ status: "active" });
    console.log(`\n✅ Active products: ${activeProducts.length}`);
    
    if (activeProducts.length > 0) {
      console.log('\n📋 Sample active products:');
      activeProducts.slice(0, 5).forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - ₹${product.price} ${product.featured ? '(⭐ Featured)' : ''}`);
      });
    }
    
    // Check categories
    const categories = await Product.distinct('category');
    console.log(`\n🏷️  Categories: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error checking products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkProducts(); 