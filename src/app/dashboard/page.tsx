'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, Plus, MessageCircle, LogOut, Sparkles, BarChart3, FileText, Settings } from 'lucide-react'
import { useNotes } from '@/hooks/use-notes'
import NoteCreationModal from '@/components/note-creation-modal'
import { NoteDetailModal } from '@/components/note-detail-modal'
import { AiChatModal } from '@/components/ai-chat-modal'
import { AnalyticsDashboard } from '@/components/analytics-dashboard'
import { ReportsModal } from '@/components/reports-modal'
import SessionSecurity from '@/components/session-security'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLanguage } from '@/contexts/language-context'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [isReportsOpen, setIsReportsOpen] = useState(false)
  const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes(selectedDate)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
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

  const handleDeleteNote = async (noteId: string) => {
    const success = await deleteNote(noteId)
    if (success) {
      setIsDetailModalOpen(false)
      setSelectedNote(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/draims-logo.svg" 
              alt="DRAIMS Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('dreamJournal')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">{t('welcome')}, {session.user?.name || session.user?.email}</span>
            <ThemeToggle />
            <button
              onClick={() => window.location.href = '/settings'}
              className="p-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              title={t('settings')}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('signOut')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Date Picker */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">{t('selectDate')}</h2>
          </div>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-border bg-card text-card-foreground rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Dream Entries */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('dreamEntries')}</h2>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('loadingDreams')}</p>
              </div>
            ) : notes.length > 0 ? (
              notes.map((note) => (
                 <div 
                   key={note.id} 
                   onClick={() => handleNoteClick(note)}
                   className="bg-card rounded-xl shadow-sm border border-border p-6 cursor-pointer hover:shadow-md hover:border-purple-200 dark:hover:border-purple-600 transition-all duration-200"
                 >
                   <div className="flex items-start justify-between mb-3">
                     <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{note.title}</h3>
                     <span className="text-sm text-gray-500 dark:text-gray-400">
                       {note.createdAt.toLocaleDateString()}
                     </span>
                   </div>
                   <p className="text-gray-600 dark:text-gray-300 mb-4 overflow-hidden text-ellipsis line-clamp-3">{note.content}</p>
                   {note.tags.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                       {note.tags.map((tag, index) => (
                         <span
                           key={index}
                           className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                         >
                           {tag}
                         </span>
                       ))}
                     </div>
                   )}
                 </div>
               ))
            ) : (
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('noDreams')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
          {/* Analytics Button */}
          <button
            onClick={() => setIsAnalyticsOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            title={t('analytics')}
          >
            <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Reports Button */}
          <button
            onClick={() => setIsReportsOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            title={t('reports')}
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* AI Chat Button */}
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            title={t('aiDreamAssistant')}
          >
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Create Note Button - Main Action */}
          <button 
            onClick={() => setIsNoteModalOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center group"
            title={t('createNewDream')}
          >
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
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
        onDelete={handleDeleteNote}
      />
      
      {/* Modals */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onNoteUpdate={handleUpdateNote}
      />
      
      <AnalyticsDashboard
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
      
      <ReportsModal
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />
      
      {/* Session Security */}
      <SessionSecurity />
    </div>
  )
}