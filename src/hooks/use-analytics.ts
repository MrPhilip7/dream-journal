import { useState, useEffect } from 'react'

export interface OverviewAnalytics {
  totalDreams: number
  dreamStreak: number
  avgDreamsPerWeek: number
  aiEditedCount: number
  moodDistribution: Array<{
    mood: string
    count: number
  }>
}

export interface MoodAnalytics {
  moodTrends: Array<{
    date: Date
    mood: string
  }>
  moodByDay: Array<{
    dayOfWeek: string
    mood: string
    count: number
  }>
}

export interface SymbolAnalytics {
  topSymbols: Array<{
    symbol: string
    count: number
  }>
  symbolTrends: Record<string, Array<{
    date: string
    count: number
  }>>
  totalUniqueSymbols: number
}

export interface TrendAnalytics {
  dreamsByDate: Array<{
    date: string
    count: number
    avgMoodScore: number
  }>
}

export interface PeriodReport {
  period: 'week' | 'month'
  startDate: Date
  endDate: Date
  dreams: Array<{
    title: string
    mood: string | null
    symbols: string[] | null
    date: Date
    aiEdited: boolean
  }>
  totalDreams: number
  previousPeriodCount: number
  change: number
}

export function useAnalytics(period: number = 30, type: string = 'overview') {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/analytics?period=${period}&type=${type}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period, type])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  }
}

export function useOverviewAnalytics(period: number = 30) {
  const { data, loading, error, refetch } = useAnalytics(period, 'overview')
  return {
    data: data as OverviewAnalytics | null,
    loading,
    error,
    refetch
  }
}

export function useMoodAnalytics(period: number = 30) {
  const { data, loading, error, refetch } = useAnalytics(period, 'moods')
  return {
    data: data as MoodAnalytics | null,
    loading,
    error,
    refetch
  }
}

export function useSymbolAnalytics(period: number = 30) {
  const { data, loading, error, refetch } = useAnalytics(period, 'symbols')
  return {
    data: data as SymbolAnalytics | null,
    loading,
    error,
    refetch
  }
}

export function useTrendAnalytics(period: number = 30) {
  const { data, loading, error, refetch } = useAnalytics(period, 'trends')
  return {
    data: data as TrendAnalytics | null,
    loading,
    error,
    refetch
  }
}

export function useWeeklyReport() {
  const { data, loading, error, refetch } = useAnalytics(7, 'weekly')
  return {
    data: data as PeriodReport | null,
    loading,
    error,
    refetch
  }
}

export function useMonthlyReport() {
  const { data, loading, error, refetch } = useAnalytics(30, 'monthly')
  return {
    data: data as PeriodReport | null,
    loading,
    error,
    refetch
  }
}