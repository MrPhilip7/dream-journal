'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Settings as SettingsIcon, Download, Trash2, Key, Eye, EyeOff, AlertTriangle, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/privacy/export', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `dream-journal-export-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        throw new Error('Export failed')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/privacy/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        alert('Your account and all data have been permanently deleted.')
        router.push('/')
      } else {
        throw new Error('Account deletion failed')
      }
    } catch (error) {
      console.error('Delete account error:', error)
      alert('Failed to delete account. Please try again.')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
      setDeleteConfirmText('')
    }
  }

  const handleEncryptionToggle = async () => {
    try {
      const response = await fetch('/api/privacy/encryption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !encryptionEnabled }),
      })

      if (response.ok) {
        setEncryptionEnabled(!encryptionEnabled)
      } else {
        throw new Error('Failed to update encryption settings')
      }
    } catch (error) {
      console.error('Encryption toggle error:', error)
      alert('Failed to update encryption settings. Please try again.')
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">Please sign in to access settings.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <SettingsIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('settings')}</h1>
            <p className="text-muted-foreground">{t('settingsDescription')}</p>
          </div>

          <div className="grid gap-6">
            {/* Language Settings */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{t('languageSettings')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('languageDescription')}
                  </p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        language === 'en'
                          ? 'bg-purple-600 text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('pl')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        language === 'pl'
                          ? 'bg-purple-600 text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      Polski
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Encryption Settings */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Key className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{t('encryptionSettings')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('encryptionDescription')}
                  </p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleEncryptionToggle}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        encryptionEnabled
                          ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {encryptionEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      <span>{encryptionEnabled ? t('encryptionEnabled') : t('encryptionDisabled')}</span>
                    </button>
                    {encryptionEnabled && (
                      <span className="text-sm text-green-600 font-medium">✓ Your content is encrypted</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{t('exportData')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('exportDescription')}
                  </p>
                  <button
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'Exporting...' : t('exportButton')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="bg-card rounded-xl shadow-sm border border-red-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{t('deleteAccount')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('deleteDescription')}
                  </p>
                  
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{t('deleteButton')}</span>
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-900">Warning: This action is irreversible</h4>
                            <p className="text-sm text-red-700 mt-1">
                              All your dream notes, analytics, and account data will be permanently deleted.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Type "DELETE MY ACCOUNT" to confirm:
                        </label>
                        <input
                          type="text"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-card text-card-foreground rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="DELETE MY ACCOUNT"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handleDeleteAccount}
                          disabled={isDeleting || deleteConfirmText !== 'DELETE MY ACCOUNT'}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>{isDeleting ? 'Deleting...' : t('confirmDelete')}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false)
                            setDeleteConfirmText('')
                          }}
                          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← {t('backToDashboard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}