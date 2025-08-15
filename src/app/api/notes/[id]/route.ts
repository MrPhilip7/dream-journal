import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const noteId = params.id
    const body = await request.json()
    const { title, content, date, tags, images, mood, symbols } = body

    // Verify the note belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: session.user.id,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(images !== undefined && { images: JSON.stringify(images) }),
        ...(mood !== undefined && { mood }),
        ...(symbols !== undefined && { symbols: JSON.stringify(symbols) }),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      id: updatedNote.id,
      title: updatedNote.title,
      content: updatedNote.content,
      date: updatedNote.date,
      tags: JSON.parse(updatedNote.tags || '[]'),
      images: JSON.parse(updatedNote.images || '[]'),
      aiEdited: updatedNote.aiEdited,
      mood: updatedNote.mood,
      symbols: JSON.parse(updatedNote.symbols || '[]'),
      createdAt: updatedNote.createdAt,
      updatedAt: updatedNote.updatedAt,
    })
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const noteId = params.id

    // Verify the note belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: session.user.id,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const noteId = params.id

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: session.user.id,
      },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}