'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, Plus, MessageCircle, LogOut, Sparkles } from 'lucide-react'
import { useNotes } from '@/hooks/use-notes'
import NoteCreationModal from '@/components/note-creation-modal'
import { NoteDetailModal } from '@/components/note-detail-modal'
import { AiChatModal } from '@/components/ai-chat-modal'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)
  const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes(selectedDate)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleCreateNote = async (noteData: any) => {
    const newNote = await createNote(noteData)
    if (newNote) {
      setIsNoteModalOpen(false)
    }
  }

  const handleNoteClick = (note: any) => {
    setSelectedNote(note)
    setIsDetailModalOpen(true)
  }

  const handleUpdateNote = async (noteId: string, updates: any) => {
    await updateNote(noteId, updates)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Dream Journal</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {session.user?.name || session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Date Picker */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-800">Select Date</h2>
          </div>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Dream Entries */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Dream Entries</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500 text-center py-8">Loading dreams...</p>
              </div>
            ) : notes.length > 0 ? (
              notes.map((note) => (
                 <div 
                   key={note.id} 
                   onClick={() => handleNoteClick(note)}
                   className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all duration-200"
                 >
                   <div className="flex items-start justify-between mb-3">
                     <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
                     <span className="text-sm text-gray-500">
                       {note.createdAt.toLocaleDateString()}
                     </span>
                   </div>
                   <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis line-clamp-3">{note.content}</p>
                   {note.tags.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                       {note.tags.map((tag, index) => (
                         <span
                           key={index}
                           className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                         >
                           {tag}
                         </span>
                       ))}
                     </div>
                   )}
                 </div>
               ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500 text-center py-8">No dreams recorded for this date yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            title="AI Dream Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsNoteModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            title="Create New Dream"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </main>

      {/* Note Creation Modal */}
      <NoteCreationModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleCreateNote}
        defaultDate={selectedDate}
      />

      {/* Note Detail Modal */}
      <NoteDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedNote(null)
        }}
        note={selectedNote}
        onUpdate={handleUpdateNote}
      />
      
      {/* AI Chat Modal */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onNoteUpdate={handleUpdateNote}
      />
    </div>
  )
}