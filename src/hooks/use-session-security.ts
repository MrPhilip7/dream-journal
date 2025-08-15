'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SessionSecurityConfig {
  idleTimeoutMinutes?: number
  maxSessionDurationHours?: number
  enableDeviceTracking?: boolean
}

interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  timezone: string
  screenResolution: string
}

export function useSessionSecurity(config: SessionSecurityConfig = {}) {
  const {
    idleTimeoutMinutes = 30,
    maxSessionDurationHours = 24,
    enableDeviceTracking = true
  } = config

  const { data: session, status } = useSession()
  const router = useRouter()
  const [isIdle, setIsIdle] = useState(false)
  const [timeUntilLogout, setTimeUntilLogout] = useState(0)
  const [showIdleWarning, setShowIdleWarning] = useState(false)
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sessionStartRef = useRef<Date | null>(null)
  const lastActivityRef = useRef<Date>(new Date())

  // Device fingerprinting
  const getDeviceInfo = (): DeviceInfo => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${screen.width}x${screen.height}`
    }
  }

  // Track device changes
  const trackDeviceSession = async () => {
    if (!enableDeviceTracking || !session?.user?.email) return

    try {
      const deviceInfo = getDeviceInfo()
      await fetch('/api/security/device-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceInfo,
          sessionId: session.user.email // In production, use a proper session ID
        })
      })
    } catch (error) {
      console.error('Device tracking error:', error)
    }
  }

  // Reset idle timer
  const resetIdleTimer = () => {
    lastActivityRef.current = new Date()
    setIsIdle(false)
    setShowIdleWarning(false)
    
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current)
    }

    // Set warning timer (5 minutes before logout)
    warningTimerRef.current = setTimeout(() => {
      setShowIdleWarning(true)
      setTimeUntilLogout(5 * 60) // 5 minutes in seconds
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setTimeUntilLogout(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            handleAutoLogout('idle')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, (idleTimeoutMinutes - 5) * 60 * 1000)

    // Set idle timer
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
      handleAutoLogout('idle')
    }, idleTimeoutMinutes * 60 * 1000)
  }

  // Handle automatic logout
  const handleAutoLogout = async (reason: 'idle' | 'session_expired' | 'security') => {
    try {
      // Log the logout reason
      await fetch('/api/security/logout-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason,
          timestamp: new Date().toISOString(),
          sessionDuration: sessionStartRef.current 
            ? Date.now() - sessionStartRef.current.getTime()
            : 0
        })
      })
    } catch (error) {
      console.error('Logout logging error:', error)
    }

    await signOut({ redirect: false })
    router.push(`/?logout=${reason}`)
  }

  // Check session duration
  const checkSessionDuration = () => {
    if (!sessionStartRef.current) return
    
    const sessionDuration = Date.now() - sessionStartRef.current.getTime()
    const maxDuration = maxSessionDurationHours * 60 * 60 * 1000
    
    if (sessionDuration > maxDuration) {
      handleAutoLogout('session_expired')
    }
  }

  // Activity event handlers
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  
  const handleActivity = () => {
    if (status === 'authenticated') {
      resetIdleTimer()
    }
  }

  // Extend session
  const extendSession = () => {
    setShowIdleWarning(false)
    resetIdleTimer()
  }

  // Force logout
  const forceLogout = () => {
    handleAutoLogout('security')
  }

  useEffect(() => {
    if (status === 'authenticated' && session) {
      sessionStartRef.current = new Date()
      resetIdleTimer()
      trackDeviceSession()

      // Add activity listeners
      activityEvents.forEach(event => {
        document.addEventListener(event, handleActivity, true)
      })

      // Check session duration periodically
      const sessionCheckInterval = setInterval(checkSessionDuration, 60000) // Check every minute

      return () => {
        // Cleanup
        activityEvents.forEach(event => {
          document.removeEventListener(event, handleActivity, true)
        })
        
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
        clearInterval(sessionCheckInterval)
      }
    }
  }, [status, session])

  return {
    isIdle,
    showIdleWarning,
    timeUntilLogout,
    extendSession,
    forceLogout,
    sessionDuration: 0 // Avoid hydration mismatch by not calculating real-time duration
  }
}