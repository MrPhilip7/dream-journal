import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Note: For logout logging, we might not have a valid session
    // so we'll be more lenient with authentication
    
    const { reason, timestamp, sessionDuration } = await request.json()

    if (!reason || !timestamp) {
      return NextResponse.json({ error: 'Missing logout reason or timestamp' }, { status: 400 })
    }

    // Get client IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'

    // Log logout event
    const logoutEvent = {
      userId: session?.user?.email || 'unknown',
      reason,
      timestamp,
      sessionDuration: sessionDuration || 0,
      clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    console.log('Logout event logged:', logoutEvent)

    // In production, you would:
    // 1. Store logout events in a database table for security auditing
    // 2. Analyze patterns for suspicious activity
    // 3. Send alerts for unusual logout patterns
    // 4. Generate security reports

    // For now, we'll just log to console and return success
    // In a real implementation, you might want to store this in a SecurityLog table

    return NextResponse.json(
      { 
        message: 'Logout event logged successfully',
        eventId: `logout_${Date.now()}`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout logging error:', error)
    return NextResponse.json(
      { error: 'Failed to log logout event' },
      { status: 500 }
    )
  }
}