import CryptoJS from 'crypto-js'

// Generate a key from user password or session
export function generateEncryptionKey(userPassword: string, salt: string): string {
  return CryptoJS.PBKDF2(userPassword, salt, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString()
}

// Encrypt sensitive content
export function encryptContent(content: string, key: string): string {
  try {
    const encrypted = CryptoJS.AES.encrypt(content, key).toString()
    return encrypted
  } catch (error) {
    console.error('Encryption failed:', error)
    throw new Error('Failed to encrypt content')
  }
}

// Decrypt sensitive content
export function decryptContent(encryptedContent: string, key: string): string {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedContent, key)
    const originalContent = decrypted.toString(CryptoJS.enc.Utf8)
    
    if (!originalContent) {
      throw new Error('Invalid decryption key or corrupted data')
    }
    
    return originalContent
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt content')
  }
}

// Generate a random salt for key derivation
export function generateSalt(): string {
  return CryptoJS.lib.WordArray.random(128 / 8).toString()
}

// Hash password for secure storage
export function hashPassword(password: string, salt: string): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString()
}

// Encrypt dream note data
export interface EncryptedNoteData {
  title: string
  content: string
  encryptedContent?: string
  isEncrypted: boolean
  salt?: string
}

export function encryptNoteData(
  noteData: { title: string; content: string },
  encryptionKey: string
): EncryptedNoteData {
  const salt = generateSalt()
  const key = generateEncryptionKey(encryptionKey, salt)
  
  return {
    title: noteData.title, // Title remains unencrypted for search
    content: '', // Clear original content
    encryptedContent: encryptContent(noteData.content, key),
    isEncrypted: true,
    salt
  }
}

export function decryptNoteData(
  encryptedNote: EncryptedNoteData,
  encryptionKey: string
): { title: string; content: string } {
  if (!encryptedNote.isEncrypted || !encryptedNote.encryptedContent || !encryptedNote.salt) {
    return {
      title: encryptedNote.title,
      content: encryptedNote.content
    }
  }
  
  const key = generateEncryptionKey(encryptionKey, encryptedNote.salt)
  const decryptedContent = decryptContent(encryptedNote.encryptedContent, key)
  
  return {
    title: encryptedNote.title,
    content: decryptedContent
  }
}