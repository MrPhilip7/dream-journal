'use client'

import { useState, useEffect } from 'react'
import { X, Edit3, Save, Calendar, Tag, Image as ImageIcon, Sparkles, MessageCircle } from 'lucide-react'
import { Note } from '@/hooks/use-notes'
import { format } from 'date-fns'
import { AiChatModal } from './ai-chat-modal'
import { useTheme } from '@/contexts/theme-context'
import { useLanguage } from '@/contexts/language-context'

interface NoteDetailModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
  onUpdate?: (noteId: string, updates: Partial<Note>) => Promise<void>
}

export function NoteDetailModal({ isOpen, onClose, note, onUpdate }: NoteDetailModalProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState<Partial<Note>>({})
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)

  useEffect(() => {
    if (note) {
      setEditedNote({
        title: note.title,
        content: note.content,
        tags: [...note.tags],
        date: note.date,
      })
    }
    setIsEditing(false)
  }, [note])

  if (!isOpen || !note) return null

  const handleSave = async () => {
    if (!onUpdate || !note) return
    
    setIsSaving(true)
    try {
      await onUpdate(note.id, editedNote)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && editedNote.tags && !editedNote.tags.includes(newTag.trim())) {
      setEditedNote(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedNote(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {isEditing ? t('editDream') : t('dreamDetails')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {note.date ? format(new Date(note.date), 'EEEE, MMMM d, yyyy') : t('noDate')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsAiChatOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 transition-all duration-200 shadow-md hover:shadow-lg"
                  title="Enhance with AI"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('aiEnhance')}</span>
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
                  title={t('editDream')}
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('edit')}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditedNote({
                      title: note.title,
                      content: note.content,
                      tags: [...note.tags],
                      date: note.date,
                    })
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-600 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors shadow-md hover:shadow-lg"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-500 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">{isSaving ? t('saving') : t('saveChanges')}</span>
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('title')}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedNote.title || ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder={t('titlePlaceholder')}
                />
              ) : (
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{note.title}</h3>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('description')}
              </label>
              {isEditing ? (
                <textarea
                  value={editedNote.content || ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder={t('descriptionPlaceholder')}
                />
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {t('date')}
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedNote.date ? format(new Date(editedNote.date), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, date: new Date(e.target.value) }))}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{note.date ? format(new Date(note.date), 'EEEE, MMMM d, yyyy') : t('noDate')}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                {t('tags')}
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {(isEditing ? editedNote.tags : note.tags)?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                  >
                    {tag}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('tagsPlaceholder')}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm"
                  >
                    {t('addTag')}
                  </button>
                </div>
              )}
            </div>

            {/* Images placeholder */}
            {note.images && note.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  {t('images')}
                </label>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {note.images.length} {t('imagesAttached')}
                </div>
              </div>
            )}

            {/* AI Edited Badge */}
            {note.aiEdited && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-300">{t('aiEnhanced')}</span>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{t('created')}: {note.createdAt ? format(new Date(note.createdAt), 'MMM d, yyyy h:mm a') : t('unknown')}</span>
                <span>{t('updated')}: {note.updatedAt ? format(new Date(note.updatedAt), 'MMM d, yyyy h:mm a') : t('unknown')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chat Modal */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        note={note}
        onNoteUpdate={onUpdate}
      />
    </div>
  )
}