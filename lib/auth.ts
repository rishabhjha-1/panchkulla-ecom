import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "./mongodb"
import User from "./models/User"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          return null
        }

        await dbConnect()

        // Bypass OTP for development/testing
        // Use OTP "123123" with any email to bypass normal OTP verification
        // Users with "admin" in their email will be created as admin users
        if (credentials.otp === "123123") {
          console.log("Using bypass OTP for:", credentials.email)
          let user = await User.findOne({ email: credentials.email })
          
          // Create user if doesn't exist
          if (!user) {
            const emailPrefix = credentials.email.split('@')[0] || 'User'
            user = new User({
              email: credentials.email,
              name: emailPrefix, // Use email prefix as name
              isVerified: true,
              isAdmin: credentials.email.includes('admin'), // Make admin if email contains 'admin'
            })
            await user.save()
          } else {
            // Update existing user
            user.isVerified = true
            await user.save()
          }

          const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email.split('@')[0] || 'User',
            isAdmin: user.isAdmin,
          }
          console.log("Returning user data:", userData)
          return userData
        }

        // Normal OTP verification flow
        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.otp || user.otp.expires < new Date()) {
          return null
        }

        if (user.otp.code !== credentials.otp) {
          return null
        }

        // Clear OTP after successful verification
        user.otp = undefined
        user.isVerified = true
        await user.save()

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email.split('@')[0] || 'User',
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - user:", user)
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      console.log("JWT callback - token:", token)
      return token
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token)
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      console.log("Session callback - session:", session)
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}
