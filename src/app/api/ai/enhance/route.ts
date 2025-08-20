import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { noteId, enhancementType, customPrompt } = body

    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    // Fetch the note to enhance
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: session.user.id,
      },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Define enhancement prompts based on type
    const enhancementPrompts = {
      narrative: `Please enhance this SNYO entry by improving the narrative flow, adding vivid sensory details, and making it more engaging to read. Keep the core content and meaning intact, but make it more immersive and well-structured.`,
      
      symbols: `Analyze this dream for symbols and their potential meanings. Provide insights into what various elements might represent, but present them as possibilities rather than definitive interpretations. Also suggest any recurring themes or patterns.`,
      
      emotions: `Help explore the emotional landscape of this dream. Identify the feelings present, their potential significance, and how they might relate to the dreamer's waking life. Provide gentle insights and questions for reflection.`,
      
      creative: `Expand on this dream creatively while staying true to the original experience. Add poetic language, explore metaphorical meanings, and help the dreamer see their dream as a creative narrative. Make it beautiful and inspiring.`,
      
      clarity: `Help clarify and organize this SNYO entry. Improve the structure, fill in logical gaps, and help the dreamer remember more details by asking thoughtful questions and providing gentle prompts.`
    }

    const selectedPrompt = customPrompt || enhancementPrompts[enhancementType as keyof typeof enhancementPrompts] || enhancementPrompts.narrative

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a skilled SNYO assistant. Your role is to help enhance dream entries while being respectful of the dreamer's personal experience. Always maintain the authenticity of the original dream.`
        },
        {
          role: 'user',
          content: `${selectedPrompt}\n\nOriginal dream entry:\nTitle: ${note.title}\nContent: ${note.content}\nDate: ${note.date}\nTags: ${JSON.parse(note.tags || '[]').join(', ')}`
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const enhancement = completion.choices[0]?.message?.content

    if (!enhancement) {
      return NextResponse.json({ error: 'No enhancement generated' }, { status: 500 })
    }

    // Update the note with AI enhancement and mark as AI-edited
    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: enhancement,
        aiEdited: true,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      enhancement,
      note: {
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
      },
      usage: completion.usage
    })

  } catch (error) {
    console.error('Error enhancing note:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
      }
      if (error.message.includes('quota')) {
        return NextResponse.json({ error: 'API quota exceeded' }, { status: 429 })
      }
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}