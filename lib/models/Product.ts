import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
