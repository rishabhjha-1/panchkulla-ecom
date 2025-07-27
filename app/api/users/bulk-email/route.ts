import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

// POST - Send bulk email to users
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subject, message, userIds, sendToAll } = await request.json()
    
    if (!subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Subject and message are required' },
        { status: 400 }
      )
    }

    await dbConnect()
    
    let users
    if (sendToAll) {
      // Send to all users
      users = await User.find({}).select('email name').lean()
    } else if (userIds && userIds.length > 0) {
      // Send to specific users
      users = await User.find({ _id: { $in: userIds } }).select('email name').lean()
    } else {
      return NextResponse.json(
        { success: false, error: 'No users selected' },
        { status: 400 }
      )
    }

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No users found' },
        { status: 404 }
      )
    }

    // Send emails
    const emailPromises = users.map(user => 
      sendEmail({
        to: user.email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">${subject}</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from your ecommerce store admin panel.</p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </div>
        `
      })
    )

    const results = await Promise.allSettled(emailPromises)
    
    // Count successful and failed emails
    const successful = results.filter(result => result.status === 'fulfilled').length
    const failed = results.filter(result => result.status === 'rejected').length

    return NextResponse.json({ 
      success: true,
      message: `Bulk email sent successfully`,
      stats: {
        total: users.length,
        successful,
        failed
      }
    })
  } catch (error) {
    console.error('Error sending bulk email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send bulk email' },
      { status: 500 }
    )
  }
} 