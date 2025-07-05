import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: String,
      expires: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
