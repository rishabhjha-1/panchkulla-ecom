# Hero Slider Management

This document explains how to use the hero slider feature with images of girls in different dresses.

## Features

- **Dynamic Hero Slider**: Three slides with different promotional content
- **Backend Management**: Admin interface to add, edit, and delete slides
- **Image Support**: Each slide can have a custom image
- **Auto-play**: Slides automatically cycle every 5 seconds
- **Manual Controls**: Navigation arrows and dot indicators
- **Responsive Design**: Works on all screen sizes

## Default Images

The hero slider comes with three default images featuring girls in different dresses:

1. **Slide 1**: Girl in elegant dress - Premium Shopping Experience
2. **Slide 2**: Girl in casual dress - Exclusive Deals & Offers  
3. **Slide 3**: Girl in party dress - 24/7 Customer Support

## Setup Instructions

### 1. Seed the Database

Run the seeding script to populate the database with default hero slides:

```bash
node scripts/seed-hero-slides.js
```

This will create three default slides with Unsplash images of girls in different dresses.

### 2. Access Admin Panel

Navigate to `/admin/hero-slides` to manage the hero slider content.

### 3. Customize Images

You can replace the default images by:

1. Going to the admin panel
2. Editing any slide
3. Updating the "Image URL" field with your custom image URL
4. Saving the changes

## Admin Interface

### Features Available:

- **View All Slides**: See all hero slides with previews
- **Add New Slide**: Create new slides with custom content
- **Edit Slides**: Modify existing slides including images
- **Delete Slides**: Remove slides from the rotation
- **Reorder Slides**: Change the display order

### Slide Properties:

- **Title**: Main heading of the slide
- **Subtitle**: Secondary heading
- **Description**: Detailed description text
- **Image URL**: URL to the slide image
- **Primary Button**: Main call-to-action button
- **Secondary Button**: Secondary action button
- **Badge**: Small promotional badge text
- **Features**: List of features/icons to display

## Image Requirements

For best results, use images that are:

- **Aspect Ratio**: 4:3 or 16:9 recommended
- **Resolution**: At least 800x600 pixels
- **Format**: JPG, PNG, or WebP
- **Content**: Girls in different dresses for fashion context
- **Quality**: High-quality, professional images

## API Endpoints

### Get All Slides
```
GET /api/hero-slides
```

### Create New Slide
```
POST /api/hero-slides
```

### Update Slide
```
PUT /api/hero-slides/[id]
```

### Delete Slide
```
DELETE /api/hero-slides/[id]
```

### Reorder Slides
```
POST /api/hero-slides/reorder
```

## Example Slide Data

```json
{
  "title": "Premium Shopping Experience",
  "subtitle": "Discover curated products with exceptional quality",
  "description": "Experience the best in online shopping with our premium services and exceptional customer care.",
  "image": "https://example.com/girl-elegant-dress.jpg",
  "buttonText": "Explore Products",
  "buttonLink": "/products",
  "secondaryButtonText": "Learn More",
  "secondaryButtonLink": "/about",
  "badge": "Trusted by 10,000+ customers",
  "features": [
    { "icon": "Shield", "text": "Secure Payments" },
    { "icon": "Truck", "text": "Fast Delivery" },
    { "icon": "CheckCircle", "text": "Quality Guaranteed" }
  ]
}
```

## Customization Tips

1. **Image Selection**: Choose images that match your brand's style and target audience
2. **Content**: Write compelling copy that encourages user engagement
3. **Buttons**: Use clear call-to-action text that guides users to desired actions
4. **Features**: Highlight key benefits that differentiate your store
5. **Colors**: The slider uses a beige theme - ensure images complement this color scheme

## Troubleshooting

### Images Not Loading
- Check that the image URL is accessible
- Ensure the URL is publicly accessible
- Verify the image format is supported

### Slides Not Updating
- Clear browser cache
- Check that the API endpoints are working
- Verify database connection

### Admin Access Issues
- Ensure you're logged in as an admin user
- Check that the user has admin privileges
- Verify authentication is working properly

## Support

For technical support or questions about the hero slider feature, please refer to the main project documentation or contact the development team. 