/**
 * 情感监测组件
 * 实时显示情感状态、趋势和洞察
 */

"use client"

import { useEmotionMonitor, type EmotionInsight } from '@/hooks/useEmotionMonitor'
import { EmotionType } from '@/lib/ai/voice-interaction'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface EmotionMonitorProps {
  compact?: boolean
  showInsights?: boolean
  showHistory?: boolean
  className?: string
}

interface EmotionAlert {
  id: string
  severity: 'high' | 'medium' | 'low'
  message: string
  emotion: EmotionType
  timestamp: number
  suggestions?: string[]
}

interface EmotionEvent {
  id: string
  emotion: EmotionType
  context: string
  timestamp: number
}

interface DetailedReport {
  summary: string
  dominantEmotion?: EmotionType
  emotionDistribution?: Record<EmotionType, number>
  emotions?: Record<string, number>
  trends?: Array<string | {
    emotion: EmotionType
    change: number
  }>
  recommendations?: string[]
  sessionDuration?: number
}

const emotionEmojis: Record<string, string> = {
  happiness: '😊',
  sadness: '😢',
  fear: '😨',
  anger: '😠',
  surprise: '😲',
  disgust: '😒',
  curiosity: '🤔',
  comfort: '😌',
  hunger: '😋',
  discomfort: '😣',
  attention: '👀',
  colic: '😭',
  neutral: '😐'
}

const emotionColors: Record<string, string> = {
  happiness: 'text-yellow-500 bg-yellow-50',
  sadness: 'text-blue-500 bg-blue-50',
  fear: 'text-purple-500 bg-purple-50',
  anger: 'text-red-500 bg-red-50',
  surprise: 'text-orange-500 bg-orange-50',
  disgust: 'text-teal-500 bg-teal-50',
  curiosity: 'text-green-500 bg-green-50',
  comfort: 'text-pink-500 bg-pink-50',
  hunger: 'text-amber-500 bg-amber-50',
  discomfort: 'text-gray-500 bg-gray-50',
  attention: 'text-indigo-500 bg-indigo-50',
  colic: 'text-red-600 bg-red-50',
  neutral: 'text-gray-400 bg-gray-50'
}

export default function EmotionMonitor({
  compact = false,
  showInsights = true,
  showHistory = false,
  className = ''
}: EmotionMonitorProps) {
  const {
    isMonitoring,
    currentEmotionState,
    recentAlerts,
    emotionInsights,
    emotionHistory,
    sessionDuration,
    getEmotionReport,
    clearAlerts
  } = useEmotionMonitor({
    autoAnalyzeInput: true,
    autoTrackBehavior: true,
    enableRealTimeResponse: true
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [showDetailedReport, setShowDetailedReport] = useState(false)
  const [detailedReport, setDetailedReport] = useState<DetailedReport | null>(null)

  useEffect(() => {
    if (showDetailedReport) {
      const report = getEmotionReport?.('hour')
      if (report) {
        setDetailedReport({
          summary: report.summary || '',
          emotions: Object.fromEntries(
            Object.entries(report.emotions || {}).filter(([_, v]) => v !== undefined)
          ),
          trends: report.trends,
          recommendations: report.recommendations
        })
      }
    }
  }, [showDetailedReport, getEmotionReport])

  if (!isMonitoring) {
    return (
      <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-emotion-line text-gray-400" />
          </div>
          <span className="text-gray-500">情感监测准备中...</span>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <motion.div
        className={`bg-white rounded-2xl p-3 shadow-sm border border-gray-100 cursor-pointer ${className}`}
        whileHover={{ scale: 1.02 }}
        onClick={() => { setIsExpanded(!isExpanded); }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${currentEmotionState ? emotionColors[String(currentEmotionState.currentEmotion).toLowerCase()] : 'bg-gray-100'
            }`}>
            {currentEmotionState ? emotionEmojis[String(currentEmotionState.currentEmotion).toLowerCase()] : '😊'}
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">
              {currentEmotionState ? `情感状态: ${getEmotionName(currentEmotionState.currentEmotion)}` : '监测中'}
            </div>
            <div className="text-xs text-gray-500">
              {currentEmotionState ? `强度: ${Math.round(currentEmotionState.intensity * 100)}%` : '分析中...'}
            </div>
          </div>
          {recentAlerts.length > 0 && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <EmotionAlerts alerts={recentAlerts as any} onClear={clearAlerts} />
              {showInsights && <EmotionInsights insights={emotionInsights} />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
            <i className="ri-heart-pulse-line text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">情感实时监测</h3>
            <p className="text-sm text-gray-500">已监测 {Math.floor(sessionDuration / 60)} 分钟</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowDetailedReport(!showDetailedReport); }}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            {showDetailedReport ? '收起报告' : '详细报告'}
          </button>
          <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-300'} animate-pulse`} />
        </div>
      </div>

      {/* 当前情感状态 */}
      {currentEmotionState && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className={`p-4 rounded-xl ${emotionColors[String(currentEmotionState.currentEmotion).toLowerCase()]}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{emotionEmojis[String(currentEmotionState.currentEmotion).toLowerCase()]}</span>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {getEmotionName(currentEmotionState.currentEmotion)}
                  </h4>
                  <p className="text-sm text-gray-600">
                    持续 {Math.floor(currentEmotionState.duration / 60)} 分钟
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">强度</div>
                <div className="text-xl font-bold">{Math.round(currentEmotionState.intensity * 100)}%</div>
              </div>
            </div>

            {/* 趋势指示器 */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">趋势:</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${currentEmotionState.trend === 'improving' ? 'bg-green-100 text-green-700' :
                  currentEmotionState.trend === 'declining' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                }`}>
                {currentEmotionState.trend === 'improving' ? '📈 改善中' :
                  currentEmotionState.trend === 'declining' ? '📉 下降中' : '➡️ 稳定'}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 情感警报 */}
      {recentAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <EmotionAlerts alerts={recentAlerts as any} onClear={clearAlerts} />
        </motion.div>
      )}

      {/* 情感洞察 */}
      {showInsights && emotionInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <EmotionInsights insights={emotionInsights} />
        </motion.div>
      )}

      {/* 情感历史 */}
      {showHistory && emotionHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmotionHistory history={emotionHistory.slice(0, 5) as any} />
        </motion.div>
      )}

      {/* 详细报告 */}
      <AnimatePresence>
        {showDetailedReport && detailedReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <DetailedEmotionReport report={detailedReport} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 子组件
function EmotionAlerts({ alerts, onClear }: { alerts: EmotionAlert[], onClear: () => void }) {
  if (alerts.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-medium text-gray-700">情感警报</h5>
        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          清除全部
        </button>
      </div>
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg border ${alert.severity === 'high' ? 'bg-red-50 border-red-200' :
              alert.severity === 'medium' ? 'bg-orange-50 border-orange-200' :
                'bg-blue-50 border-blue-200'
            }`}
        >
          <div className="flex items-start gap-2">
            <i className={`${alert.severity === 'high' ? 'ri-error-warning-line text-red-500' :
                alert.severity === 'medium' ? 'ri-alert-line text-orange-500' :
                  'ri-information-line text-blue-500'
              } mt-0.5`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{alert.message}</p>
              {alert.suggestions && alert.suggestions.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs text-gray-600">建议:</p>
                  <ul className="text-xs text-gray-500 ml-2">
                    {alert.suggestions.map((suggestion: string, i: number) => (
                      <li key={i}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function EmotionInsights({ insights }: { insights: EmotionInsight[] }) {
  if (insights.length === 0) return null

  return (
    <div>
      <h5 className="text-sm font-medium text-gray-700 mb-2">情感洞察</h5>
      <div className="space-y-2">
        {insights.map((insight, index) => (
          <motion.div
            key={`${insight.timestamp instanceof Date ? insight.timestamp.toISOString() : String(insight.timestamp)}-${index}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${insight.severity === 'success' ? 'bg-green-50 border-green-200' :
                insight.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
              }`}
          >
            <div className="flex items-center gap-2">
              <i className={`${insight.type === 'trend' ? 'ri-line-chart-line' :
                  insight.type === 'pattern' ? 'ri-pulse-line' :
                    'ri-lightbulb-line'
                } text-sm`} />
              <p className="text-sm text-gray-700">{insight.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function EmotionHistory({ history }: { history: EmotionEvent[] }) {
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-700 mb-2">最近情感变化</h5>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {history.map((event) => (
          <div
            key={event.id}
            className={`flex-shrink-0 w-12 h-12 rounded-lg ${emotionColors[String(event.emotion).toLowerCase()]} flex items-center justify-center text-lg border border-gray-200`}
            title={`${getEmotionName(event.emotion)} - ${event.context}`}
          >
            {emotionEmojis[String(event.emotion).toLowerCase()]}
          </div>
        ))}
      </div>
    </div>
  )
}

function DetailedEmotionReport({ report }: { report: DetailedReport }) {
  return (
    <div>
      <h5 className="text-lg font-bold text-gray-800 mb-4">情感分析报告</h5>

      {/* 摘要 */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">{report.summary}</p>
      </div>

      {/* 情感分布 */}
      {report.emotions && Object.keys(report.emotions).length > 0 && (
        <div className="mb-4">
          <h6 className="text-sm font-medium text-gray-700 mb-2">情感分布</h6>
          <div className="space-y-2">
            {Object.entries(report.emotions).map(([emotion, count]) => (
              <div key={emotion} className="flex items-center gap-2">
                <span className="text-lg">{emotionEmojis[emotion as EmotionType]}</span>
                <span className="text-sm text-gray-600">{getEmotionName(emotion as EmotionType)}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / maxObjectValues(report.emotions || {})) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 趋势 */}
      {report.trends && report.trends.length > 0 && (
        <div className="mb-4">
          <h6 className="text-sm font-medium text-gray-700 mb-2">趋势分析</h6>
          <ul className="space-y-1">
            {report.trends.map((trend: string | { emotion: EmotionType; change: number }, index: number) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <i className="ri-arrow-right-s-line text-blue-500 mt-0.5" />
                {typeof trend === 'string' ? trend : `${trend.emotion}: ${trend.change > 0 ? '+' : ''}${trend.change}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 建议 */}
      {report.recommendations && report.recommendations.length > 0 && (
        <div>
          <h6 className="text-sm font-medium text-gray-700 mb-2">建议</h6>
          <ul className="space-y-1">
            {report.recommendations.map((rec: string, index: number) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <i className="ri-checkbox-circle-fill text-green-500 mt-0.5" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// 工具函数
function getEmotionName(emotion: string): string {
  const names: Record<string, string> = {
    happiness: '开心',
    sadness: '难过',
    fear: '害怕',
    anger: '生气',
    surprise: '惊讶',
    disgust: '厌恶',
    curiosity: '好奇',
    comfort: '舒服',
    hunger: '饥饿',
    discomfort: '不舒服',
    attention: '需要关注',
    colic: '肠绞痛',
    neutral: '中性'
  }
  return names[String(emotion).toLowerCase()] || '未知'
}

function maxObjectValues(obj: { [key: string]: number }): number {
  const values = Object.values(obj)
  return values.length > 0 ? Math.max(...values) : 0
}
