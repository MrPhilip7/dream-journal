// Funkcja walidacji silnych haseł
export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  let strength: 'weak' | 'medium' | 'strong' = 'weak'

  // Minimalna długość 8 znaków
  if (password.length < 8) {
    errors.push('Hasło musi mieć co najmniej 8 znaków')
  }

  // Maksymalna długość 128 znaków
  if (password.length > 128) {
    errors.push('Hasło nie może być dłuższe niż 128 znaków')
  }

  // Musi zawierać małą literę
  if (!/[a-z]/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jedną małą literę')
  }

  // Musi zawierać wielką literę
  if (!/[A-Z]/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jedną wielką literę')
  }

  // Musi zawierać cyfrę
  if (!/\d/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jedną cyfrę')
  }

  // Musi zawierać znak specjalny
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&* itp.)')
  }

  // Nie może zawierać popularnych wzorców
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /admin/i,
    /letmein/i,
    /welcome/i,
    /monkey/i,
    /dragon/i
  ]

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Hasło nie może zawierać popularnych wzorców')
      break
    }
  }

  // Nie może zawierać powtarzających się znaków (więcej niż 2 razy z rzędu)
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Hasło nie może zawierać więcej niż 2 identycznych znaków z rzędu')
  }

  // Określenie siły hasła
  const isValid = errors.length === 0
  
  if (isValid) {
    let strengthScore = 0
    
    // Długość
    if (password.length >= 12) strengthScore += 2
    else if (password.length >= 10) strengthScore += 1
    
    // Różnorodność znaków
    if (/[a-z]/.test(password)) strengthScore += 1
    if (/[A-Z]/.test(password)) strengthScore += 1
    if (/\d/.test(password)) strengthScore += 1
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strengthScore += 1
    
    // Brak popularnych wzorców
    if (!commonPatterns.some(pattern => pattern.test(password))) strengthScore += 1
    
    if (strengthScore >= 6) strength = 'strong'
    else if (strengthScore >= 4) strength = 'medium'
  }

  return {
    isValid,
    errors,
    strength
  }
}

export function getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak': return 'text-red-500'
    case 'medium': return 'text-yellow-500'
    case 'strong': return 'text-green-500'
    default: return 'text-gray-500'
  }
}

export function getPasswordStrengthText(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak': return 'Słabe'
    case 'medium': return 'Średnie'
    case 'strong': return 'Silne'
    default: return 'Nieznane'
  }
}