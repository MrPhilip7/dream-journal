'use client'

import { useState } from 'react'
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Brain, 
  Heart,
  Sparkles,
  ChevronDown,
  Loader2
} from 'lucide-react'
import { useWeeklyReport, useMonthlyReport } from '@/hooks/use-analytics'

interface ReportsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  const [reportType, setReportType] = useState<'weekly' | 'monthly'>('weekly')
  const [selectedWeek, setSelectedWeek] = useState(0) // 0 = current week
  const [selectedMonth, setSelectedMonth] = useState(0) // 0 = current month
  
  const { data: weeklyData, loading: weeklyLoading } = useWeeklyReport(selectedWeek)
  const { data: monthlyData, loading: monthlyLoading } = useMonthlyReport(selectedMonth)

  if (!isOpen) return null

  const currentData = reportType === 'weekly' ? weeklyData : monthlyData
  const isLoading = reportType === 'weekly' ? weeklyLoading : monthlyLoading

  const weekOptions = [
    { value: 0, label: 'This Week' },
    { value: 1, label: 'Last Week' },
    { value: 2, label: '2 Weeks Ago' },
    { value: 3, label: '3 Weeks Ago' }
  ]

  const monthOptions = [
    { value: 0, label: 'This Month' },
    { value: 1, label: 'Last Month' },
    { value: 2, label: '2 Months Ago' },
    { value: 3, label: '3 Months Ago' }
  ]

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      happy: '😊',
      excited: '🤩',
      calm: '😌',
      confused: '😕',
      anxious: '😰',
      sad: '😢'
    }
    return emojis[mood] || '😐'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const generateReportText = () => {
    if (!currentData) return ''
    
    const period = reportType === 'weekly' ? 'Week' : 'Month'
    const periodLabel = reportType === 'weekly' 
      ? weekOptions[selectedWeek]?.label 
      : monthOptions[selectedMonth]?.label
    
    let report = `# Dream Journal ${period} Report\n`
    report += `## ${periodLabel}\n\n`
    
    if (reportType === 'weekly' && weeklyData) {
      report += `**Period:** ${formatDate(weeklyData.startDate)} - ${formatDate(weeklyData.endDate)}\n\n`
      report += `### Summary\n`
      report += `- **Total Dreams:** ${weeklyData.totalDreams}\n`
      report += `- **Dreams This Week:** ${weeklyData.dreamsThisWeek}\n`
      report += `- **Average per Day:** ${weeklyData.avgPerDay}\n\n`
      
      if (weeklyData.insights && weeklyData.insights.length > 0) {
        report += `### Key Insights\n`
        weeklyData.insights.forEach(insight => {
          report += `- ${insight}\n`
        })
        report += '\n'
      }
      
      if (weeklyData.moodDistribution && weeklyData.moodDistribution.length > 0) {
        report += `### Mood Distribution\n`
        weeklyData.moodDistribution.forEach(mood => {
          report += `- ${mood.mood}: ${mood.count} dreams\n`
        })
        report += '\n'
      }
      
      if (weeklyData.topSymbols && weeklyData.topSymbols.length > 0) {
        report += `### Common Symbols\n`
        weeklyData.topSymbols.forEach(symbol => {
          report += `- ${symbol.symbol}: ${symbol.count} occurrences\n`
        })
      }
    }
    
    if (reportType === 'monthly' && monthlyData) {
      report += `**Period:** ${formatDate(monthlyData.startDate)} - ${formatDate(monthlyData.endDate)}\n\n`
      report += `### Summary\n`
      report += `- **Total Dreams:** ${monthlyData.totalDreams}\n`
      report += `- **Dreams This Month:** ${monthlyData.dreamsThisMonth}\n`
      report += `- **Average per Week:** ${monthlyData.avgPerWeek}\n\n`
      
      if (monthlyData.insights && monthlyData.insights.length > 0) {
        report += `### Key Insights\n`
        monthlyData.insights.forEach(insight => {
          report += `- ${insight}\n`
        })
        report += '\n'
      }
      
      if (monthlyData.moodDistribution && monthlyData.moodDistribution.length > 0) {
        report += `### Mood Distribution\n`
        monthlyData.moodDistribution.forEach(mood => {
          report += `- ${mood.mood}: ${mood.count} dreams\n`
        })
        report += '\n'
      }
      
      if (monthlyData.topSymbols && monthlyData.topSymbols.length > 0) {
        report += `### Common Symbols\n`
        monthlyData.topSymbols.forEach(symbol => {
          report += `- ${symbol.symbol}: ${symbol.count} occurrences\n`
        })
      }
    }
    
    return report
  }

  const downloadReport = () => {
    const reportText = generateReportText()
    const blob = new Blob([reportText], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dream-report-${reportType}-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Dream Reports</h2>
                <p className="text-emerald-100">Generate insights from your dream patterns</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Controls */}
          <div className="mt-4 flex items-center space-x-4">
            {/* Report Type */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Type:</span>
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setReportType('weekly')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    reportType === 'weekly'
                      ? 'bg-white text-emerald-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setReportType('monthly')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    reportType === 'monthly'
                      ? 'bg-white text-emerald-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Period Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Period:</span>
              <div className="relative">
                <select
                  value={reportType === 'weekly' ? selectedWeek : selectedMonth}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    if (reportType === 'weekly') {
                      setSelectedWeek(value)
                    } else {
                      setSelectedMonth(value)
                    }
                  }}
                  className="bg-white/20 text-white rounded-lg px-3 py-1 text-sm appearance-none pr-8 cursor-pointer"
                >
                  {(reportType === 'weekly' ? weekOptions : monthOptions).map(option => (
                    <option key={option.value} value={option.value} className="text-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            {/* Download Button */}
            {currentData && (
              <button
                onClick={downloadReport}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          ) : currentData ? (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Dreams</p>
                      <p className="text-2xl font-bold text-blue-900">{currentData.totalDreams}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        {reportType === 'weekly' ? 'This Week' : 'This Month'}
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {'dreamsThisWeek' in currentData ? currentData.dreamsThisWeek : currentData.dreamsThisMonth}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        Avg per {reportType === 'weekly' ? 'Day' : 'Week'}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {'avgPerDay' in currentData ? currentData.avgPerDay : currentData.avgPerWeek}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Period Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Period</h3>
                <p className="text-gray-600">
                  {formatDate(currentData.startDate)} - {formatDate(currentData.endDate)}
                </p>
              </div>

              {/* Insights */}
              {currentData.insights && currentData.insights.length > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-yellow-900">Key Insights</h3>
                  </div>
                  <ul className="space-y-2">
                    {currentData.insights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2 text-yellow-800">
                        <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mood Distribution */}
              {currentData.moodDistribution && currentData.moodDistribution.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Mood Distribution</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentData.moodDistribution.map(mood => (
                      <div key={mood.mood} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-xl">{getMoodEmoji(mood.mood)}</span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{mood.mood}</p>
                          <p className="text-sm text-gray-500">{mood.count} dreams</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Symbols */}
              {currentData.topSymbols && currentData.topSymbols.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Common Symbols</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentData.topSymbols.map((symbol, index) => (
                      <div key={symbol.symbol} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{symbol.symbol}</p>
                          <p className="text-sm text-gray-500">{symbol.count} occurrences</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No data available for this period</p>
              <p className="text-sm text-gray-400 mt-2">Try selecting a different time period</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}