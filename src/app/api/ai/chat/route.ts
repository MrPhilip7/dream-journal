import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
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
    const { messages, noteContent, action } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
    }

    // System prompt for SNYO AI assistant
    const systemPrompt = {
      role: 'system',
      content: `You are a helpful AI assistant specialized in dream analysis and creative writing. You help users enhance their SNYO entries by:

1. **Dream Enhancement**: Improve narrative flow, add vivid descriptions, and help users recall more details
2. **Symbol Analysis**: Identify and explain potential symbols and meanings in dreams
3. **Pattern Recognition**: Help users notice recurring themes, characters, or emotions
4. **Creative Expansion**: Suggest creative interpretations while staying true to the original dream
5. **Emotional Insight**: Help users understand the emotional significance of their dreams

Always be supportive, creative, and respectful of the user's personal dream experiences. Focus on enhancing rather than completely rewriting their content.${noteContent ? `\n\nCurrent dream note content:\n${noteContent}` : ''}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [systemPrompt, ...messages],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    return NextResponse.json({
      message: aiResponse,
      usage: completion.usage
    })

  } catch (error) {
    console.error('Error in AI chat:', error)
    
    if (error instanceof Error) {
      // Handle specific OpenAI errors
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