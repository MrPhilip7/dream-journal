'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Brain, 
  Sparkles, 
  Target,
  ChevronDown,
  Moon,
  Heart,
  Zap
} from 'lucide-react'
import { useOverviewAnalytics, useMoodAnalytics, useSymbolAnalytics, useTrendAnalytics } from '@/hooks/use-analytics'

interface AnalyticsDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(30)
  const [activeTab, setActiveTab] = useState('overview')
  
  const { data: overviewData, loading: overviewLoading } = useOverviewAnalytics(selectedPeriod)
  const { data: moodData, loading: moodLoading } = useMoodAnalytics(selectedPeriod)
  const { data: symbolData, loading: symbolLoading } = useSymbolAnalytics(selectedPeriod)
  const { data: trendData, loading: trendLoading } = useTrendAnalytics(selectedPeriod)

  if (!isOpen) return null

  const periods = [
    { value: 7, label: '7 Days' },
    { value: 30, label: '30 Days' },
    { value: 90, label: '3 Months' },
    { value: 365, label: '1 Year' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'moods', label: 'Moods', icon: Heart },
    { id: 'symbols', label: 'Symbols', icon: Brain },
    { id: 'trends', label: 'Trends', icon: TrendingUp }
  ]

  const moodColors: Record<string, string> = {
    happy: '#10B981',
    excited: '#F59E0B',
    calm: '#3B82F6',
    confused: '#8B5CF6',
    anxious: '#EF4444',
    sad: '#6B7280'
  }

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Dream Analytics</h2>
                <p className="text-purple-100">Insights into your dream patterns</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Period Selector */}
          <div className="mt-4 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Period:</span>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="bg-white/20 text-white rounded-lg px-3 py-1 text-sm appearance-none pr-8 cursor-pointer"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value} className="text-gray-900">
                    {period.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {overviewLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : overviewData ? (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Total Dreams</p>
                          <p className="text-2xl font-bold text-blue-900">{overviewData.totalDreams}</p>
                        </div>
                        <Moon className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Dream Streak</p>
                          <p className="text-2xl font-bold text-green-900">{overviewData.dreamStreak} days</p>
                        </div>
                        <Target className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 text-sm font-medium">Weekly Average</p>
                          <p className="text-2xl font-bold text-purple-900">{overviewData.avgDreamsPerWeek}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-600 text-sm font-medium">AI Enhanced</p>
                          <p className="text-2xl font-bold text-yellow-900">{overviewData.aiEditedCount}</p>
                        </div>
                        <Sparkles className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>
                  </div>

                  {/* Mood Distribution */}
                  {overviewData.moodDistribution && overviewData.moodDistribution.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
                      <div className="space-y-3">
                        {overviewData.moodDistribution.map(item => {
                          const percentage = Math.round((item.count / overviewData.totalDreams) * 100)
                          return (
                            <div key={item.mood} className="flex items-center space-x-3">
                              <span className="text-lg">{getMoodEmoji(item.mood)}</span>
                              <span className="capitalize font-medium text-gray-700 w-20">{item.mood}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: moodColors[item.mood] || '#6B7280'
                                  }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Moon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No dream data available for this period</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'symbols' && (
            <div className="space-y-6">
              {symbolLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : symbolData ? (
                <>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-600 text-sm font-medium">Unique Symbols</p>
                        <p className="text-2xl font-bold text-indigo-900">{symbolData.totalUniqueSymbols}</p>
                      </div>
                      <Brain className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  
                  {symbolData.topSymbols && symbolData.topSymbols.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Symbols</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {symbolData.topSymbols.map((symbol, index) => (
                          <div key={symbol.symbol} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 capitalize">{symbol.symbol}</p>
                              <p className="text-sm text-gray-500">{symbol.count} occurrences</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No symbol data available for this period</p>
                </div>
              )}
            </div>
          )}

          {(activeTab === 'moods' || activeTab === 'trends') && (
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Advanced charts coming soon!</p>
              <p className="text-sm text-gray-400 mt-2">This feature will include interactive mood trends and dream pattern visualizations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}