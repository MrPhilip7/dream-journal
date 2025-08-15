'use client'

import { useSessionSecurity } from '@/hooks/use-session-security'
import { AlertTriangle, Clock, Shield, X } from 'lucide-react'
import { useState } from 'react'

interface SessionSecurityProps {
  className?: string
}

export default function SessionSecurity({ className = '' }: SessionSecurityProps) {
  const {
    showIdleWarning,
    timeUntilLogout,
    extendSession,
    sessionDuration
  } = useSessionSecurity({
    idleTimeoutMinutes: 30,
    maxSessionDurationHours: 24,
    enableDeviceTracking: true
  })

  const [showSessionInfo, setShowSessionInfo] = useState(false)

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className={className}>
      {/* Idle Warning Modal */}
      {showIdleWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Session Timeout Warning
                </h3>
                <p className="text-gray-600 mb-4">
                  You've been inactive for a while. Your session will expire in:
                </p>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-red-600">
                    {formatTime(timeUntilLogout)}
                  </div>
                  <div className="text-sm text-gray-500">minutes:seconds</div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={extendSession}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Stay Logged In
                  </button>
                  <button
                    onClick={() => window.location.href = '/api/auth/signout'}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Info Toggle */}
      <button
        onClick={() => setShowSessionInfo(!showSessionInfo)}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Session Information"
      >
        <Shield className="w-5 h-5" />
      </button>

      {/* Session Info Panel */}
      {showSessionInfo && (
        <div className="fixed bottom-20 right-4 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80 z-40">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Session Security</span>
            </h4>
            <button
              onClick={() => setShowSessionInfo(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Session Duration:</span>
              </span>
              <span className="font-medium text-gray-900">
                {formatDuration(sessionDuration)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Auto-logout:</span>
              <span className="font-medium text-gray-900">30 min idle</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Max session:</span>
              <span className="font-medium text-gray-900">24 hours</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Device tracking:</span>
              <span className="font-medium text-green-600">✓ Enabled</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => window.location.href = '/privacy'}
              className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy & Security Settings →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}