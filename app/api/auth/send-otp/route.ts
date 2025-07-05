import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import { sendOTP } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    await dbConnect()

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Find or create user
    let user = await User.findOne({ email })
    if (!user) {
      user = new User({
        email,
        name: email.split("@")[0], // Default name from email
        otp: {
          code: otpCode,
          expires: otpExpires,
        },
      })
    } else {
      user.otp = {
        code: otpCode,
        expires: otpExpires,
      }
    }

    await user.save()

    // Send OTP email
    await sendOTP(email, otpCode)

    return NextResponse.json({ message: "OTP sent successfully" })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
