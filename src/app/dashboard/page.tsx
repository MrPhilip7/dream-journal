'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, Plus, MessageCircle, LogOut, Sparkles, BarChart3, FileText, Settings, Clock, List } from 'lucide-react'
import { useNotes } from '@/hooks/use-notes'
import { useAllNotes } from '@/hooks/use-all-notes'
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
  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today')
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [isReportsOpen, setIsReportsOpen] = useState(false)
  const { notes: todayNotes, loading: todayLoading, error: todayError, createNote: createTodayNote, updateNote: updateTodayNote, deleteNote: deleteTodayNote } = useNotes(selectedDate)
  const { notes: allNotes, loading: allLoading, error: allError, createNote: createAllNote, updateNote: updateAllNote, deleteNote: deleteAllNote } = useAllNotes()

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

  // Get current data based on active tab
  const currentNotes = activeTab === 'today' ? todayNotes : allNotes
  const currentLoading = activeTab === 'today' ? todayLoading : allLoading
  const currentError = activeTab === 'today' ? todayError : allError
  const currentCreateNote = activeTab === 'today' ? createTodayNote : createAllNote
  const currentUpdateNote = activeTab === 'today' ? updateTodayNote : updateAllNote
  const currentDeleteNote = activeTab === 'today' ? deleteTodayNote : deleteAllNote

  const handleCreateNote = async (noteData: any) => {
    const newNote = await currentCreateNote(noteData)
    if (newNote) {
      setIsNoteModalOpen(false)
    }
  }

  const handleNoteClick = (note: any) => {
    setSelectedNote(note)
    setIsDetailModalOpen(true)
  }

  const handleUpdateNote = async (noteId: string, updates: any) => {
    await currentUpdateNote(noteId, updates)
  }

  const handleDeleteNote = async (noteId: string) => {
    const success = await currentDeleteNote(noteId)
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
              src="/snyo-logo.svg"
            alt="SNYO Logo" 
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
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'today'
                  ? 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{t('todaysDreams')}</span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
              <span>{t('allDreams')}</span>
            </button>
          </div>
        </div>

        {/* Date Picker - Only show for Today's Dreams tab */}
        {activeTab === 'today' && (
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
        )}

        {/* Dream Entries */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            {activeTab === 'today' ? t('dreamEntries') : t('allDreams')}
          </h2>
          {currentError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
              {currentError}
            </div>
          )}
          <div className="space-y-4">
            {currentLoading ? (
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('loadingDreams')}</p>
              </div>
            ) : currentNotes.length > 0 ? (
              currentNotes.map((note) => (
                 <div 
                   key={note.id} 
                   onClick={() => handleNoteClick(note)}
                   className="bg-card rounded-xl shadow-sm border border-border p-6 cursor-pointer hover:shadow-md hover:border-purple-200 dark:hover:border-purple-600 transition-all duration-200"
                 >
                   <div className="flex items-start justify-between mb-3">
                     <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{note.title}</h3>
                     <div className="text-right">
                       <span className="text-sm text-gray-500 dark:text-gray-400 block">
                         {note.date.toLocaleDateString()}
                       </span>
                       {activeTab === 'all' && (
                         <span className="text-xs text-gray-400 dark:text-gray-500">
                           {t('created')}: {note.createdAt.toLocaleDateString()}
                         </span>
                       )}
                     </div>
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
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  {activeTab === 'today' ? t('noDreams') : t('noDreamsAll')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={() => setIsAnalyticsOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          >
            <BarChart3 className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsReportsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          >
            <FileText className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
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
        defaultDate={activeTab === 'today' ? selectedDate : new Date()}
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