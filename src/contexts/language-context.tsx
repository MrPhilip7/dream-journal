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
    
    // Note Creation Modal
    recordYourDream: 'Record Your Dream',
    title: 'Title',
    titlePlaceholder: 'Give your dream a title...',
    autoSuggestFromContent: 'Auto-suggest from content',
    description: 'Description',
    descriptionPlaceholder: 'Describe your dream in detail... What did you see, feel, or experience?',
    date: 'Date',
    tags: 'Tags',
    tagsPlaceholder: 'Add tags (flying, water, family, etc.)',
    add: 'Add',
    images: 'Images (Max 3)',
    uploadImages: 'Click to upload images or drag and drop',
    uploadImageFormat: 'PNG, JPG up to 10MB each',
    imagesSelected: 'image(s) selected',
    cancel: 'Cancel',
    saveDream: 'Save Dream',
    fillTitleAndDescription: 'Please fill in both title and description',
    charactersCount: 'characters',
    
    // AI Chat Modal
    aiDreamAssistant: 'AI Dream Assistant',
    enhancing: 'Enhancing',
    dreamJournalAiChat: 'Dream Journal AI Chat',
    quickEnhancements: 'Quick enhancements',
    aiThinking: 'AI is thinking',
    askAboutDream: 'Ask me anything about your dream...',
    
    // Note Detail Modal
    dreamDetails: 'Dream Details',
    editDream: 'Edit Dream',
    noDate: 'No date',
    aiEnhance: 'AI Enhance',
    edit: 'Edit',
    saving: 'Saving...',
    saveChanges: 'Save Changes',
    imagesAttached: 'image(s) attached',
    aiEnhanced: 'This dream has been enhanced by AI',
    created: 'Created',
     updated: 'Updated',
     unknown: 'Unknown',
     
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
    
    // Note Creation Modal
    recordYourDream: 'Zapisz Swój Sen',
    title: 'Tytuł',
    titlePlaceholder: 'Nadaj tytuł swojemu śnie...',
    autoSuggestFromContent: 'Automatyczna sugestia z treści',
    description: 'Opis',
    descriptionPlaceholder: 'Opisz swój sen szczegółowo... Co widziałeś, czułeś lub doświadczyłeś?',
    date: 'Data',
    tags: 'Tagi',
    tagsPlaceholder: 'Dodaj tagi (latanie, woda, rodzina, itp.)',
    add: 'Dodaj',
    images: 'Obrazy (Maks. 3)',
    uploadImages: 'Kliknij, aby przesłać obrazy lub przeciągnij i upuść',
    uploadImageFormat: 'PNG, JPG do 10MB każdy',
    imagesSelected: 'obraz(y) wybrane',
    cancel: 'Anuluj',
    saveDream: 'Zapisz Sen',
    fillTitleAndDescription: 'Proszę wypełnić zarówno tytuł, jak i opis',
    charactersCount: 'znaków',
    
    // AI Chat Modal
    aiDreamAssistant: 'Asystent Snów AI',
    enhancing: 'Ulepszanie',
    dreamJournalAiChat: 'Czat AI Dziennika Snów',
    quickEnhancements: 'Szybkie ulepszenia',
    aiThinking: 'AI myśli',
    askAboutDream: 'Zapytaj mnie o cokolwiek dotyczące twojego snu...',
    
    // Note Detail Modal
    dreamDetails: 'Szczegóły Snu',
    editDream: 'Edytuj Sen',
    noDate: 'Brak daty',
    aiEnhance: 'Ulepszenie AI',
    edit: 'Edytuj',
    saving: 'Zapisywanie...',
    saveChanges: 'Zapisz Zmiany',
    imagesAttached: 'obraz(y) załączone',
    aiEnhanced: 'Ten sen został ulepszony przez AI',
    created: 'Utworzono',
     updated: 'Zaktualizowano',
     unknown: 'Nieznane',
     
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