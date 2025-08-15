'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'pl'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Dashboard
    dreamJournal: 'Dream Journal',
    welcome: 'Welcome',
    signOut: 'Sign Out',
    selectDate: 'Select Date',
    dreamEntries: 'Dream Entries',
    loadingDreams: 'Loading dreams...',
    noDreams: 'No dreams recorded for this date yet.',
    analytics: 'Analytics',
    reports: 'Reports',
    aiDreamAssistant: 'AI Dream Assistant',
    createNewDream: 'Create New Dream',
    settings: 'Settings',
    
    // Settings page
    settingsDescription: 'Manage your account preferences and privacy settings',
    languageSettings: 'Language Settings',
    languageDescription: 'Choose your preferred language for the application',
    english: 'English',
    polish: 'Polish',
    encryptionSettings: 'Encryption Settings',
    encryptionDescription: 'Control how your dream data is encrypted and stored',
    encryptionEnabled: 'Enabled',
    encryptionDisabled: 'Disabled',
    exportData: 'Export Your Data',
    exportDescription: 'Download all your dream entries and personal data',
    exportButton: 'Export Data',
    deleteAccount: 'Delete Account',
    deleteDescription: 'Permanently delete your account and all associated data. This action cannot be undone.',
    deleteButton: 'Delete Account',
    confirmDelete: 'Confirm Delete',
    cancel: 'Cancel',
    backToDashboard: 'Back to Dashboard'
  },
  pl: {
    // Dashboard
    dreamJournal: 'Dziennik Snów',
    welcome: 'Witaj',
    signOut: 'Wyloguj',
    selectDate: 'Wybierz Datę',
    dreamEntries: 'Wpisy Snów',
    loadingDreams: 'Ładowanie snów...',
    noDreams: 'Brak zapisanych snów na ten dzień.',
    analytics: 'Analityka',
    reports: 'Raporty',
    aiDreamAssistant: 'Asystent Snów AI',
    createNewDream: 'Utwórz Nowy Sen',
    settings: 'Ustawienia',
    
    // Settings page
    settingsDescription: 'Zarządzaj preferencjami konta i ustawieniami prywatności',
    languageSettings: 'Ustawienia Języka',
    languageDescription: 'Wybierz preferowany język dla aplikacji',
    english: 'Angielski',
    polish: 'Polski',
    encryptionSettings: 'Ustawienia Szyfrowania',
    encryptionDescription: 'Kontroluj sposób szyfrowania i przechowywania danych o snach',
    encryptionEnabled: 'Włączone',
    encryptionDisabled: 'Wyłączone',
    exportData: 'Eksportuj Swoje Dane',
    exportDescription: 'Pobierz wszystkie wpisy o snach i dane osobowe',
    exportButton: 'Eksportuj Dane',
    deleteAccount: 'Usuń Konto',
    deleteDescription: 'Trwale usuń swoje konto i wszystkie powiązane dane. Ta akcja nie może być cofnięta.',
    deleteButton: 'Usuń Konto',
    confirmDelete: 'Potwierdź Usunięcie',
    cancel: 'Anuluj',
    backToDashboard: 'Powrót do Panelu'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Sprawdź preferencje użytkownika z localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pl')) {
      setLanguageState(savedLanguage)
    } else {
      // Sprawdź preferencje przeglądarki
      const browserLanguage = navigator.language.toLowerCase()
      if (browserLanguage.startsWith('pl')) {
        setLanguageState('pl')
      } else {
        setLanguageState('en')
      }
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}