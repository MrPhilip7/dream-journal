'use client'

import { useState, useEffect } from 'react'
import { X, Edit3, Save, Calendar, Tag, Image as ImageIcon, Sparkles, MessageCircle } from 'lucide-react'
import { Note } from '@/hooks/use-notes'
import { format } from 'date-fns'
import { AiChatModal } from './ai-chat-modal'

interface NoteDetailModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
  onUpdate?: (noteId: string, updates: Partial<Note>) => Promise<void>
}

export function NoteDetailModal({ isOpen, onClose, note, onUpdate }: NoteDetailModalProps) {
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Edit Dream' : 'Dream Details'}
              </h2>
              <p className="text-sm text-gray-500">
                {note.date ? format(new Date(note.date), 'EEEE, MMMM d, yyyy') : 'No date'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsAiChatOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>AI Chat</span>
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedNote.title || ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  placeholder="Enter dream title..."
                />
              ) : (
                <h3 className="text-2xl font-semibold text-gray-800">{note.title}</h3>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dream Description
              </label>
              {isEditing ? (
                <textarea
                  value={editedNote.content || ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Describe your dream in detail..."
                />
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedNote.date ? format(new Date(editedNote.date), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setEditedNote(prev => ({ ...prev, date: new Date(e.target.value) }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{note.date ? format(new Date(note.date), 'EEEE, MMMM d, yyyy') : 'No date'}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {(isEditing ? editedNote.tags : note.tags)?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                  >
                    {tag}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-purple-500 hover:text-purple-700"
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
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Images placeholder */}
            {note.images && note.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Images
                </label>
                <div className="text-gray-500 text-sm">
                  {note.images.length} image(s) attached
                </div>
              </div>
            )}

            {/* AI Edited Badge */}
            {note.aiEdited && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">This dream has been enhanced by AI</span>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Created: {note.createdAt ? format(new Date(note.createdAt), 'MMM d, yyyy \\at h:mm a') : 'Unknown'}</span>
                <span>Updated: {note.updatedAt ? format(new Date(note.updatedAt), 'MMM d, yyyy \\at h:mm a') : 'Unknown'}</span>
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