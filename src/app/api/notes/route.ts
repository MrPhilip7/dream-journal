import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, date, tags, images } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const note = await prisma.note.create({
      data: {
        userId: session.user.id,
        title,
        content,
        date: new Date(date),
        tags: JSON.stringify(tags || []),
        images: JSON.stringify(images || []),
        aiEdited: false,
      },
    })

    return NextResponse.json({
      id: note.id,
      title: note.title,
      content: note.content,
      date: note.date,
      tags: JSON.parse(note.tags || '[]'),
      images: JSON.parse(note.images || '[]'),
      aiEdited: note.aiEdited,
      createdAt: note.createdAt,
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    let whereClause: any = {
      userId: session.user.id,
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      
      whereClause.date = {
        gte: startDate,
        lt: endDate,
      }
    }

    const notes = await prisma.note.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedNotes = notes.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      date: note.date,
      tags: JSON.parse(note.tags || '[]'),
      images: JSON.parse(note.images || '[]'),
      aiEdited: note.aiEdited,
      mood: note.mood,
      symbols: JSON.parse(note.symbols || '[]'),
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }))

    return NextResponse.json(formattedNotes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}