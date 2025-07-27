import mongoose, { Schema, Document } from 'mongoose'

export interface IHeroSlide extends Document {
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  badge: string
  features: Array<{
    icon: string
    text: string
  }>
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const HeroSlideSchema = new Schema<IHeroSlide>({
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

// Create index for ordering
HeroSlideSchema.index({ order: 1, isActive: 1 })

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema) 