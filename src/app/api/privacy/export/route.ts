import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prepare export data
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      notes: user.notes.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        originalContent: note.originalContent,
        date: note.date,
        images: note.images,
        tags: note.tags,
        aiEdited: note.aiEdited,
        mood: note.mood,
        symbols: note.symbols,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      })),
      statistics: {
        totalNotes: user.notes.length,
        aiEditedNotes: user.notes.filter(note => note.aiEdited).length,
        moodDistribution: user.notes.reduce((acc, note) => {
          if (note.mood) {
            acc[note.mood] = (acc[note.mood] || 0) + 1
          }
          return acc
        }, {} as Record<string, number>),
        tagDistribution: user.notes.reduce((acc, note) => {
          if (note.tags) {
            const tags = Array.isArray(note.tags) ? note.tags : JSON.parse(note.tags as string)
            tags.forEach((tag: string) => {
              acc[tag] = (acc[tag] || 0) + 1
            })
          }
          return acc
        }, {} as Record<string, number>)
      }
    }

    // Create JSON blob
    const jsonData = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="dream-journal-export-${new Date().toISOString().split('T')[0]}.json"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}