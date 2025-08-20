'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, MessageCircle, Loader2, Wand2 } from 'lucide-react'
import { Note } from '@/hooks/use-notes'
import { useTheme } from '@/contexts/theme-context'
import { useLanguage } from '@/contexts/language-context'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AiChatModalProps {
  isOpen: boolean
  onClose: () => void
  note?: Note | null
  onNoteUpdate?: (noteId: string, updates: Partial<Note>) => Promise<void>
}

export function AiChatModal({ isOpen, onClose, note, onNoteUpdate }: AiChatModalProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageIdCounter = useRef(0)

  // Generate unique ID without Date.now() to avoid hydration mismatch
  const generateMessageId = () => {
    messageIdCounter.current += 1
    return `msg-${messageIdCounter.current}`
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      // Initialize conversation when modal opens
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: generateMessageId(),
          role: 'assistant',
          content: note 
            ? `Hello! I'm here to help you enhance your SNYO entry "${note.title}". I can help you:\n\n• Improve the narrative and add vivid details\n• Analyze symbols and their meanings\n• Explore emotional themes\n• Expand creatively on your dream\n• Clarify and organize your thoughts\n\nWhat would you like to explore about your dream?`
        : `Hello! I'm your SNYO AI assistant. I can help you create and enhance dream entries, analyze symbols, explore meanings, and improve your dream narratives. How can I assist you today?`,
          timestamp: new Date()
        }
        setMessages([welcomeMessage])
      }
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, note, messages.length])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          noteContent: note ? `Title: ${note.title}\nContent: ${note.content}` : null
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const enhanceNote = async (enhancementType: string) => {
    if (!note || !onNoteUpdate) return

    setIsEnhancing(true)
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId: note.id,
          enhancementType
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to enhance note')
      }

      const data = await response.json()
      
      // Update the note with enhanced content
      await onNoteUpdate(note.id, {
        content: data.note.content,
        aiEdited: true
      })

      // Add a message about the enhancement
      const enhancementMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: `I've enhanced your SNYO entry with ${enhancementType} improvements! The updated content has been saved to your note.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, enhancementMessage])

    } catch (error) {
      console.error('Error enhancing note:', error)
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I couldn\'t enhance your note right now. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsEnhancing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t('aiDreamAssistant')}</h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                {note ? `${t('enhancing')}: ${note.title}` : t('dreamJournalAiChat')}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
        </div>

        {/* Quick Enhancement Buttons */}
        {note && (
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{t('quickEnhancements')}:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'narrative', label: 'Improve Narrative', icon: '📖' },
                { type: 'symbols', label: 'Analyze Symbols', icon: '🔍' },
                { type: 'emotions', label: 'Explore Emotions', icon: '💭' },
                { type: 'creative', label: 'Creative Expansion', icon: '✨' },
                { type: 'clarity', label: 'Clarify & Organize', icon: '📝' }
              ].map((enhancement) => (
                <button
                  key={enhancement.type}
                  onClick={() => enhanceNote(enhancement.type)}
                  disabled={isEnhancing}
                  className={`flex items-center space-x-2 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:bg-purple-900/30 hover:border-purple-500 text-white' : 'bg-white border-gray-200 hover:bg-purple-50 hover:border-purple-200 text-gray-800'} rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span>{enhancement.icon}</span>
                  <span>{enhancement.label}</span>
                  {isEnhancing && <Loader2 className="w-3 h-3 animate-spin" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-purple-500 text-white'
                    : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-2 opacity-70`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-2xl px-4 py-3 flex items-center space-x-2`}>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('aiThinking')}...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('askAboutDream')}
              className={`flex-1 px-4 py-3 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}