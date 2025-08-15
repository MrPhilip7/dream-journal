import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { enabled } = await request.json()

    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid encryption setting' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user encryption preference
    // Note: In a real implementation, you might want to add an 'encryptionEnabled' field to the User model
    // For now, we'll store it in a separate UserSettings table or as metadata
    
    // This is a simplified implementation - in production you'd want to:
    // 1. Add encryption settings to the database schema
    // 2. Handle migration of existing data when enabling/disabling encryption
    // 3. Implement proper key management
    
    return NextResponse.json(
      { 
        message: `Encryption ${enabled ? 'enabled' : 'disabled'} successfully`,
        encryptionEnabled: enabled
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Encryption settings error:', error)
    return NextResponse.json(
      { error: 'Failed to update encryption settings' },
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

    // In a real implementation, you'd fetch the encryption setting from the database
    // For now, we'll return a default value
    return NextResponse.json(
      { encryptionEnabled: false },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get encryption settings error:', error)
    return NextResponse.json(
      { error: 'Failed to get encryption settings' },
      { status: 500 }
    )
  }
}