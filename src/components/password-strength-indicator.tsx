'use client'

import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from '@/lib/password-validation'
import { Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface PasswordStrengthIndicatorProps {
  password: string
  showPassword: boolean
  onToggleShowPassword: () => void
  className?: string
}

export default function PasswordStrengthIndicator({
  password,
  showPassword,
  onToggleShowPassword,
  className = ''
}: PasswordStrengthIndicatorProps) {
  const validation = validatePassword(password)
  const strengthColor = getPasswordStrengthColor(validation.strength)
  const strengthText = getPasswordStrengthText(validation.strength)

  const getStrengthBarWidth = () => {
    switch (validation.strength) {
      case 'weak': return '33%'
      case 'medium': return '66%'
      case 'strong': return '100%'
      default: return '0%'
    }
  }

  const getStrengthBarColor = () => {
    switch (validation.strength) {
      case 'weak': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  if (!password) return null

  return (
    <div className={`mt-2 ${className}`}>
      {/* Pasek siły hasła */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-purple-200">Siła hasła:</span>
          <span className={`text-sm font-medium ${strengthColor}`}>
            {strengthText}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthBarColor()}`}
            style={{ width: getStrengthBarWidth() }}
          ></div>
        </div>
      </div>

      {/* Lista wymagań */}
      <div className="space-y-1">
        <div className="text-xs text-purple-200 mb-2">Wymagania:</div>
        
        <div className={`flex items-center space-x-2 text-xs ${
          password.length >= 8 ? 'text-green-300' : 'text-red-300'
        }`}>
          {password.length >= 8 ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Co najmniej 8 znaków</span>
        </div>

        <div className={`flex items-center space-x-2 text-xs ${
          /[a-z]/.test(password) ? 'text-green-300' : 'text-red-300'
        }`}>
          {/[a-z]/.test(password) ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Mała litera (a-z)</span>
        </div>

        <div className={`flex items-center space-x-2 text-xs ${
          /[A-Z]/.test(password) ? 'text-green-300' : 'text-red-300'
        }`}>
          {/[A-Z]/.test(password) ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Wielka litera (A-Z)</span>
        </div>

        <div className={`flex items-center space-x-2 text-xs ${
          /\d/.test(password) ? 'text-green-300' : 'text-red-300'
        }`}>
          {/\d/.test(password) ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Cyfra (0-9)</span>
        </div>

        <div className={`flex items-center space-x-2 text-xs ${
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-300' : 'text-red-300'
        }`}>
          {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Znak specjalny (!@#$%^&*)</span>
        </div>

        {/* Dodatkowe wymagania */}
        <div className={`flex items-center space-x-2 text-xs ${
          !/(.)\1{2,}/.test(password) ? 'text-green-300' : 'text-red-300'
        }`}>
          {!/(.)\1{2,}/.test(password) ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          <span>Brak powtarzających się znaków</span>
        </div>
      </div>

      {/* Błędy walidacji */}
      {validation.errors.length > 0 && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-500/50 rounded text-xs">
          <div className="flex items-center space-x-2 text-red-200 mb-1">
            <Shield className="w-3 h-3" />
            <span className="font-medium">Problemy z hasłem:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-red-300">
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}