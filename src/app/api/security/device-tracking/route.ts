import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  timezone: string
  screenResolution: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { deviceInfo, sessionId } = await request.json()

    if (!deviceInfo || !sessionId) {
      return NextResponse.json({ error: 'Missing device info or session ID' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create a device fingerprint
    const deviceFingerprint = Buffer.from(
      JSON.stringify({
        userAgent: deviceInfo.userAgent,
        platform: deviceInfo.platform,
        screenResolution: deviceInfo.screenResolution
      })
    ).toString('base64')

    // Get client IP (in production, consider using a proper IP detection method)
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'

    // Log device session (in a real app, you'd store this in a DeviceSessions table)
    console.log('Device session tracked:', {
      userId: user.id,
      deviceFingerprint,
      clientIP,
      deviceInfo,
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // 1. Store device sessions in a database table
    // 2. Check for suspicious activity (multiple devices, unusual locations)
    // 3. Send alerts for new device logins
    // 4. Implement device trust/verification

    return NextResponse.json(
      { 
        message: 'Device session tracked successfully',
        deviceFingerprint
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Device tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track device session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // In production, you would fetch active device sessions from the database
    // For now, return mock data
    const mockDeviceSessions = [
      {
        id: '1',
        deviceFingerprint: 'current-device',
        lastActive: new Date().toISOString(),
        location: 'Current Location',
        browser: 'Chrome',
        os: 'Windows',
        isCurrent: true
      }
    ]

    return NextResponse.json(
      { deviceSessions: mockDeviceSessions },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get device sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to get device sessions' },
      { status: 500 }
    )
  }
}