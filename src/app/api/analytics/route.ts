import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days
    const type = searchParams.get('type') || 'overview'

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    const userId = session.user.id

    switch (type) {
      case 'overview':
        return await getOverviewAnalytics(userId, startDate)
      case 'moods':
        return await getMoodAnalytics(userId, startDate)
      case 'symbols':
        return await getSymbolAnalytics(userId, startDate)
      case 'trends':
        return await getTrendAnalytics(userId, startDate)
      case 'weekly':
        return await getWeeklyReport(userId)
      case 'monthly':
        return await getMonthlyReport(userId)
      default:
        return NextResponse.json({ error: 'Invalid analytics type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

async function getOverviewAnalytics(userId: string, startDate: Date) {
  const [totalDreams, dreamsByMood, recentDreams, aiEditedCount] = await Promise.all([
    // Total dreams count
    prisma.note.count({
      where: {
        userId,
        date: { gte: startDate }
      }
    }),
    
    // Dreams by mood
    prisma.note.groupBy({
      by: ['mood'],
      where: {
        userId,
        date: { gte: startDate },
        mood: { not: null }
      },
      _count: true
    }),
    
    // Recent dreams for streak calculation
    prisma.note.findMany({
      where: {
        userId,
        date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      },
      select: { date: true },
      orderBy: { date: 'desc' }
    }),
    
    // AI edited dreams count
    prisma.note.count({
      where: {
        userId,
        date: { gte: startDate },
        aiEdited: true
      }
    })
  ])

  // Calculate dream streak
  const dreamStreak = calculateDreamStreak(recentDreams)
  
  // Calculate average dreams per week
  const weeksDiff = Math.ceil((Date.now() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
  const avgDreamsPerWeek = weeksDiff > 0 ? Math.round(totalDreams / weeksDiff * 10) / 10 : 0

  return NextResponse.json({
    totalDreams,
    dreamStreak,
    avgDreamsPerWeek,
    aiEditedCount,
    moodDistribution: dreamsByMood.map(item => ({
      mood: item.mood,
      count: item._count
    }))
  })
}

async function getMoodAnalytics(userId: string, startDate: Date) {
  const [moodTrends, moodByDay] = await Promise.all([
    // Mood trends over time
    prisma.note.findMany({
      where: {
        userId,
        date: { gte: startDate },
        mood: { not: null }
      },
      select: {
        date: true,
        mood: true
      },
      orderBy: { date: 'asc' }
    }),
    
    // Mood distribution by day of week
    prisma.$queryRaw`
      SELECT 
        strftime('%w', date) as dayOfWeek,
        mood,
        COUNT(*) as count
      FROM Note 
      WHERE userId = ${userId} 
        AND date >= ${startDate}
        AND mood IS NOT NULL
      GROUP BY strftime('%w', date), mood
      ORDER BY dayOfWeek, mood
    `
  ])

  return NextResponse.json({
    moodTrends,
    moodByDay
  })
}

async function getSymbolAnalytics(userId: string, startDate: Date) {
  const notes = await prisma.note.findMany({
    where: {
      userId,
      date: { gte: startDate },
      symbols: { not: null }
    },
    select: {
      symbols: true,
      date: true
    }
  })

  // Process symbols data
  const symbolCounts: Record<string, number> = {}
  const symbolTrends: Record<string, Array<{ date: string; count: number }>> = {}

  notes.forEach(note => {
    if (note.symbols) {
      const symbols = Array.isArray(note.symbols) ? note.symbols : [note.symbols]
      const dateStr = note.date.toISOString().split('T')[0]
      
      symbols.forEach((symbol: string) => {
        // Count occurrences
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1
        
        // Track trends
        if (!symbolTrends[symbol]) {
          symbolTrends[symbol] = []
        }
        
        const existingEntry = symbolTrends[symbol].find(entry => entry.date === dateStr)
        if (existingEntry) {
          existingEntry.count++
        } else {
          symbolTrends[symbol].push({ date: dateStr, count: 1 })
        }
      })
    }
  })

  // Get top symbols
  const topSymbols = Object.entries(symbolCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([symbol, count]) => ({ symbol, count }))

  return NextResponse.json({
    topSymbols,
    symbolTrends,
    totalUniqueSymbols: Object.keys(symbolCounts).length
  })
}

async function getTrendAnalytics(userId: string, startDate: Date) {
  const dreamsByDate = await prisma.$queryRaw`
    SELECT 
      DATE(date) as date,
      COUNT(*) as count,
      AVG(CASE WHEN mood = 'happy' THEN 5
               WHEN mood = 'excited' THEN 4
               WHEN mood = 'calm' THEN 3
               WHEN mood = 'confused' THEN 2
               WHEN mood = 'anxious' THEN 1
               WHEN mood = 'sad' THEN 0
               ELSE 2.5 END) as avgMoodScore
    FROM Note 
    WHERE userId = ${userId} 
      AND date >= ${startDate}
    GROUP BY DATE(date)
    ORDER BY date ASC
  `

  return NextResponse.json({ dreamsByDate })
}

async function getWeeklyReport(userId: string) {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of current week
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 7)

  const [weeklyDreams, previousWeekCount] = await Promise.all([
    prisma.note.findMany({
      where: {
        userId,
        date: {
          gte: weekStart,
          lt: weekEnd
        }
      },
      select: {
        title: true,
        mood: true,
        symbols: true,
        date: true,
        aiEdited: true
      },
      orderBy: { date: 'desc' }
    }),
    
    prisma.note.count({
      where: {
        userId,
        date: {
          gte: new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000),
          lt: weekStart
        }
      }
    })
  ])

  return NextResponse.json({
    period: 'week',
    startDate: weekStart,
    endDate: weekEnd,
    dreams: weeklyDreams,
    totalDreams: weeklyDreams.length,
    previousPeriodCount: previousWeekCount,
    change: weeklyDreams.length - previousWeekCount
  })
}

async function getMonthlyReport(userId: string) {
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)
  
  const monthEnd = new Date(monthStart)
  monthEnd.setMonth(monthEnd.getMonth() + 1)

  const [monthlyDreams, previousMonthCount] = await Promise.all([
    prisma.note.findMany({
      where: {
        userId,
        date: {
          gte: monthStart,
          lt: monthEnd
        }
      },
      select: {
        title: true,
        mood: true,
        symbols: true,
        date: true,
        aiEdited: true
      },
      orderBy: { date: 'desc' }
    }),
    
    prisma.note.count({
      where: {
        userId,
        date: {
          gte: new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, 1),
          lt: monthStart
        }
      }
    })
  ])

  return NextResponse.json({
    period: 'month',
    startDate: monthStart,
    endDate: monthEnd,
    dreams: monthlyDreams,
    totalDreams: monthlyDreams.length,
    previousPeriodCount: previousMonthCount,
    change: monthlyDreams.length - previousMonthCount
  })
}

function calculateDreamStreak(recentDreams: Array<{ date: Date }>): number {
  if (recentDreams.length === 0) return 0
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  // Check if there's a dream today or yesterday (to account for late entries)
  const dreamDates = recentDreams.map(d => {
    const date = new Date(d.date)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
  })
  
  // Start checking from today or yesterday if no dream today
  if (!dreamDates.includes(today.getTime())) {
    currentDate.setDate(currentDate.getDate() - 1)
    if (!dreamDates.includes(currentDate.getTime())) {
      return 0 // No recent dreams
    }
  }
  
  // Count consecutive days with dreams
  while (dreamDates.includes(currentDate.getTime())) {
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }
  
  return streak
}