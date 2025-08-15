import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
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

    // Delete all user data in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete all notes first (due to foreign key constraints)
      await tx.note.deleteMany({
        where: { userId: user.id }
      })

      // Delete user accounts (OAuth accounts)
      await tx.account.deleteMany({
        where: { userId: user.id }
      })

      // Delete user sessions
      await tx.session.deleteMany({
        where: { userId: user.id }
      })

      // Finally delete the user
      await tx.user.delete({
        where: { id: user.id }
      })
    })

    return NextResponse.json(
      { message: 'Account and all associated data have been permanently deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}