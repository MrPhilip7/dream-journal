import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface Note {
  id: string
  title: string
  content: string
  date: Date
  tags: string[]
  images: string[]
  aiEdited: boolean
  mood?: string
  symbols: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateNoteData {
  title: string
  content: string
  date: Date
  tags: string[]
  images: string[]
}

export function useNotes(selectedDate?: Date) {
  const { data: session } = useSession()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = async (date?: Date) => {
    if (!session?.user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (date) {
        params.append('date', date.toISOString().split('T')[0])
      }
      
      const response = await fetch(`/api/notes?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      
      const data = await response.json()
      const formattedNotes = data.map((note: any) => ({
        ...note,
        date: new Date(note.date),
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
      
      setNotes(formattedNotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (noteData: CreateNoteData): Promise<Note | null> => {
    if (!session?.user) {
      setError('You must be logged in to create notes')
      return null
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create note')
      }
      
      const newNote = await response.json()
      const formattedNote = {
        ...newNote,
        date: new Date(newNote.date),
        createdAt: new Date(newNote.createdAt),
      }
      
      setNotes(prev => [formattedNote, ...prev])
      return formattedNote
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes(selectedDate)
  }, [session, selectedDate])

  const updateNote = async (noteId: string, updates: Partial<CreateNoteData>): Promise<Note | null> => {
    if (!session?.user) {
      setError('You must be logged in to update notes')
      return null
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update note')
      }
      
      const updatedNote = await response.json()
      const formattedNote = {
        ...updatedNote,
        date: new Date(updatedNote.date),
        createdAt: new Date(updatedNote.createdAt),
        updatedAt: new Date(updatedNote.updatedAt),
      }
      
      setNotes(prev => prev.map(note => 
        note.id === noteId ? formattedNote : note
      ))
      
      return formattedNote
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (noteId: string): Promise<boolean> => {
    if (!session?.user) {
      setError('You must be logged in to delete notes')
      return false
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete note')
      }
      
      setNotes(prev => prev.filter(note => note.id !== noteId))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refetch: () => fetchNotes(selectedDate),
  }
}