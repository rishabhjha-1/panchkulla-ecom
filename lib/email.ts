import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendOTP(email: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Panchkula Login",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Panchkula</h2>
      <p>Your OTP for login is:</p>
      <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
        ${otp}
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `,
  }

  await transporter.sendMail(mailOptions)
}
