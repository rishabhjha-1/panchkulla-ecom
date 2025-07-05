# Database Seeding Script

This directory contains scripts to populate your database with sample data for testing and development.

## Products Seeding Script

The `seed-products.js` script adds 30 sample products to your database across three categories:

### Categories Included:
- **Clothing** (10 products) - Focus on South Indian ladies' clothing
- **Beauty** (8 products) - Traditional and natural beauty products
- **Sports** (12 products) - Fitness and workout equipment

### South Indian Clothing Products:
1. Silk Kanjivaram Saree - Traditional Red
2. Cotton Handloom Saree - Blue & Gold
3. Kerala Kasavu Saree - Cream & Gold
4. Tamil Nadu Cotton Saree - Green & Silver
5. Silk Pattu Pavadai - Pink & Gold
6. Cotton Salwar Kameez - South Indian Style
7. Silk Blouse Piece - Matching Set
8. Karnataka Ilkal Saree - Red & Gold
9. Andhra Pradesh Gadwal Saree - Purple & Silver
10. Tamil Nadu Silk Saree - Orange & Gold

### Beauty Products:
- Natural Sandalwood Face Pack
- Coconut Oil Hair Care Set
- Turmeric & Honey Face Cream
- Neem & Tulsi Soap Bar
- Kumkumadi Oil - Traditional Face Oil
- Aloe Vera Gel - Pure Extract
- Rose Water Toner
- Multani Mitti Clay Mask

### Sports Products:
- Yoga Mat - Premium Non-Slip
- Resistance Bands Set - 5 Levels
- Dumbbells Set - Adjustable 2-20kg
- Jump Rope - Professional Grade
- Foam Roller - High Density
- Fitness Tracker - Smart Watch
- Yoga Block Set - EVA Foam
- Exercise Ball - Anti-Burst
- Sports Water Bottle - Insulated
- Gym Bag - Large Capacity

## How to Run

### Prerequisites:
1. Make sure your MongoDB is running
2. Ensure your `.env` file has the correct `MONGODB_URI`
3. Install dependencies: `npm install`

### Running the Script:

```bash
# Using npm script (recommended)
npm run seed

# Or directly with node
node scripts/seed-products.js
```

### Expected Output:
```
✅ Connected to MongoDB
🌱 Starting to seed products...
✅ Successfully seeded 30 products

📊 Products by Category:
   Clothing: 10 products
   Beauty: 8 products
   Sports: 12 products

🎉 Seeding completed successfully!
🔌 Disconnected from MongoDB
```

## Features

- **Realistic Data**: Products have realistic prices, descriptions, and stock levels
- **Featured Products**: Some products are marked as featured for homepage display
- **Discount Pricing**: Many products have original prices and discounted prices
- **Rich Descriptions**: Detailed product descriptions with traditional context
- **Proper Categorization**: Products are properly categorized with relevant tags
- **Stock Management**: Realistic stock levels for inventory management
- **Image URLs**: Uses Unsplash images for product photos

## Customization

You can modify the `products` array in `seed-products.js` to:
- Add more products
- Change product details
- Modify prices and stock levels
- Add different categories
- Update product images

## Notes

- The script will add products without clearing existing ones (unless you uncomment the delete line)
- All products are set to "active" status by default
- Featured products are marked for homepage display
- Product images use Unsplash URLs for demonstration
- Prices are in Indian Rupees (₹)

## Troubleshooting

If you encounter issues:

1. **Connection Error**: Check your MongoDB connection string in `.env`
2. **Schema Error**: Ensure your Product model matches the schema in the script
3. **Duplicate Products**: The script won't create duplicates unless you clear existing data first
4. **Image Loading**: Some image URLs might not load - this is normal for demo purposes

## Next Steps

After running the script:
1. Visit your categories page to see the new products
2. Test the filtering and sorting functionality
3. Check the featured products on your homepage
4. Verify the product detail pages work correctly 