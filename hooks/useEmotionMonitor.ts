/**
 * @file YYC³ 情感监测React Hook
 * @description 提供跨页面情感状态跟踪和实时响应功能，支持情感分析、行为跟踪和警报系统
 * @module hooks
 * @author YYC³
 * @version 1.0.0
 * @created 2025-12-28
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { setAIEmotion, setAIMessage } from '@/lib/store/slices/aiAssistantSlice'
import {
  emotionMonitor,
  EmotionEvent,
  EmotionalState,
  EmotionAlert,
  EmotionType
} from '@/lib/ai/emotion-monitor'
import { useChildren } from './useChildren'

export interface UseEmotionMonitorOptions {
  autoAnalyzeInput?: boolean
  autoTrackBehavior?: boolean
  alertThreshold?: number
  enableRealTimeResponse?: boolean
}

export interface EmotionInsight {
  type: 'pattern' | 'trend' | 'recommendation'
  message: string
  severity: 'info' | 'warning' | 'success'
  timestamp: Date
  actionable: boolean
}

export function useEmotionMonitor(options: UseEmotionMonitorOptions = {}) {
  const {
    autoAnalyzeInput = true,
    autoTrackBehavior = true,
    alertThreshold = 0.7,
    enableRealTimeResponse = true
  } = options

  const dispatch = useDispatch()
  const { currentChild } = useChildren()
  const aiAssistant = useSelector((state: RootState) => state.aiAssistant)

  // 状态管理
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [currentEmotionState, setCurrentEmotionState] = useState<EmotionalState | null>(null)
  const [recentAlerts, setRecentAlerts] = useState<EmotionAlert[]>([])
  const [emotionInsights, setEmotionInsights] = useState<EmotionInsight[]>([])
  const [emotionHistory, setEmotionHistory] = useState<EmotionEvent[]>([])

  // 引用
  const lastPageRef = useRef<string>('')
  const sessionStartTime = useRef<number>(Date.now())
  const behaviorTrackingRef = useRef<Map<string, number>>(new Map())

  // 初始化情感监测
  useEffect(() => {
    if (currentChild && !isMonitoring) {
      emotionMonitor.start()
      setIsMonitoring(true)

      // 注册警报处理器
      emotionMonitor.onAlert((alert: EmotionAlert) => {
        handleEmotionAlert(alert)
      })

      console.log(`🎯 为${currentChild.name}启动情感监测`)
    }

    return () => {
      if (isMonitoring) {
        emotionMonitor.stop()
        setIsMonitoring(false)
      }
    }
  }, [currentChild, isMonitoring])

  // 定期更新状态
  useEffect(() => {
    if (!isMonitoring) return

    const updateInterval = setInterval(() => {
      const state = emotionMonitor.getCurrentState()
      setCurrentEmotionState(state)

      if (state) {
        // 更新AI助手情感状态
        dispatch(setAIEmotion(state.currentEmotion))

        // 生成情感洞察
        generateEmotionInsights(state)
      }

      // 更新历史记录
      const history = emotionMonitor.getEventHistory(10)
      setEmotionHistory(history)

    }, 3000) // 每3秒更新一次

    return () => { clearInterval(updateInterval); }
  }, [isMonitoring, dispatch])

  /**
   * 分析用户输入的情感
   */
  const analyzeUserInput = useCallback((text: string, context: string = '') => {
    if (!autoAnalyzeInput || !currentChild) return

    const emotion = emotionMonitor.analyzeUserInput(text, context, currentChild.id)

    // 实时响应
    if (enableRealTimeResponse) {
      handleEmotionResponse(emotion, text)
    }

    console.log(`🧠 分析用户输入情感: ${emotion} (${text})`)
  }, [autoAnalyzeInput, enableRealTimeResponse, currentChild])

  /**
   * 跟踪用户行为
   */
  const trackBehavior = useCallback((action: string, page?: string) => {
    if (!autoTrackBehavior || !currentChild) return

    const currentPage = page || window.location.pathname
    const emotion = emotionMonitor.analyzeBehavior(action, currentPage, currentChild.id)

    // 页面切换跟踪
    if (currentPage !== lastPageRef.current) {
      trackPageTransition(lastPageRef.current, currentPage)
      lastPageRef.current = currentPage
    }

    // 行为频率统计
    const key = `${action}_${currentPage}`
    behaviorTrackingRef.current.set(key, (behaviorTrackingRef.current.get(key) || 0) + 1)

    console.log(`📊 跟踪行为: ${action} on ${currentPage} -> ${emotion || 'no emotion'}`)
  }, [autoTrackBehavior, currentChild])

  /**
   * 手动记录情感事件
   */
  const recordEmotionEvent = useCallback((
    emotion: EmotionType,
    intensity: number,
    context: string,
    source: 'user_input' | 'behavior' | 'system_trigger' | 'voice' = 'system_trigger'
  ) => {
    if (!currentChild) return

    emotionMonitor.recordEvent({
      emotion,
      intensity,
      context,
      source,
      childId: currentChild.id,
      metadata: {
        page: window.location.pathname
      }
    })

    console.log(`📝 手动记录情感事件: ${emotion} (${intensity})`)
  }, [currentChild])

  /**
   * 获取情感报告
   */
  const getEmotionReport = useCallback((timeRange: 'hour' | 'day' | 'week' = 'hour') => {
    if (!currentChild) return null

    return emotionMonitor.generateEmotionReport(currentChild.id, timeRange)
  }, [currentChild])

  /**
   * 处理情感警报
   */
  const handleEmotionAlert = useCallback((alert: EmotionAlert) => {
    setRecentAlerts(prev => [alert, ...prev.slice(0, 4)]) // 保持最近5个警报

    // 根据警报类型生成AI响应
    if (enableRealTimeResponse && alert.type === 'emotional_concern') {
      const concernResponse = generateConcernResponse(alert)
      dispatch(setAIMessage(concernResponse))
    }
  }, [enableRealTimeResponse, dispatch])

  /**
   * 生成情感洞察
   */
  const generateEmotionInsights = useCallback((state: EmotionalState) => {
    const insights: EmotionInsight[] = []

    // 趋势分析
    if (state.trend === 'improving') {
      insights.push({
        type: 'trend',
        message: '情感状态正在改善，继续保持！',
        severity: 'success',
        timestamp: new Date(),
        actionable: false
      })
    } else if (state.trend === 'declining') {
      insights.push({
        type: 'trend',
        message: '情感状态有所下降，需要更多关注',
        severity: 'warning',
        timestamp: new Date(),
        actionable: true
      })
    }

    // 持续时间分析
    if (state.duration > 300) { // 5分钟
      insights.push({
        type: 'pattern',
        message: `${state.currentEmotion}状态已持续${Math.floor(state.duration / 60)}分钟`,
        severity: 'info',
        timestamp: new Date(),
        actionable: state.intensity > 0.7
      })
    }

    // 触发因素分析
    if (state.triggers.length > 0) {
      insights.push({
        type: 'recommendation',
        message: `主要触发因素: ${state.triggers.slice(0, 2).join(', ')}`,
        severity: 'info',
        timestamp: new Date(),
        actionable: false
      })
    }

    setEmotionInsights(insights)
  }, [])

  /**
   * 处理情感响应
   */
  const handleEmotionResponse = useCallback((emotion: EmotionType, input: string) => {
    const responses: { [key in EmotionType]?: string[] } = {
      [EmotionType.HAPPINESS]: [
        '看到你这么开心，我也很高兴呢！',
        '你的快乐很有感染力！',
        '继续保持这种好心情哦！'
      ],
      [EmotionType.SADNESS]: [
        '感觉你有点不开心，需要我陪伴吗？',
        '没关系，每个人都会有难过的时候',
        '想和我说说发生了什么吗？'
      ],
      [EmotionType.ANGER]: [
        '深呼吸，我们一起冷静下来',
        '我在这里陪着你，慢慢来',
        '生气是正常的，我们一起找到解决办法'
      ],
      [EmotionType.FEAR]: [
        '别担心，我在这里保护你',
        '害怕是很正常的感觉，我们可以一起面对',
        '有我在，一切都会好起来的'
      ],
      [EmotionType.CURIOSITY]: [
        '你真是个爱探索的好奇宝宝！',
        '让我们一起发现这个世界的奥秘',
        '你的好奇心真棒！'
      ],
      [EmotionType.ATTENTION]: [
        '我在这里，专心陪你',
        '你是我最重要的小宝贝',
        '我正在认真听你说话呢'
      ]
    }

    const emotionResponses = responses[emotion] || ['我感受到了你的情绪']
    const randomResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)]

    // 智能延迟响应，避免过于频繁
    setTimeout(() => {
      dispatch(setAIMessage({
        id: `emotion-${Date.now()}`,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      }))
    }, 1000 + Math.random() * 2000) // 1-3秒随机延迟
  }, [dispatch])

  /**
   * 跟踪页面转换
   */
  const trackPageTransition = useCallback((fromPage: string, toPage: string) => {
    if (!currentChild) return

    emotionMonitor.recordEvent({
      emotion: EmotionType.CURIOSITY,
      intensity: 0.5,
      context: `页面转换: ${fromPage} → ${toPage}`,
      source: 'behavior',
      childId: currentChild.id,
      metadata: {
        page: toPage,
        action: 'page_navigation'
      }
    })
  }, [currentChild])

  /**
   * 生成关心响应
   */
  const generateConcernResponse = useCallback((alert: EmotionAlert) => {
    const concernResponses = [
      '我感觉你可能需要一些额外的关心和支持',
      '我在这里陪着你，你可以告诉我发生了什么',
      '有时候我们需要一点帮助，这完全没问题',
      '让我们一起度过这个困难的时刻'
    ]

    return {
      id: `emotion-${Date.now()}`,
      role: 'assistant' as const,
      content: concernResponses[Math.floor(Math.random() * concernResponses.length)],
      timestamp: new Date()
    }
  }, [])

  /**
   * 清除警报
   */
  const clearAlerts = useCallback(() => {
    setRecentAlerts([])
  }, [])

  /**
   * 确认警报
   */
  const acknowledgeAlert = useCallback((alertId: string) => {
    setRecentAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
  }, [])

  return {
    // 状态
    isMonitoring,
    currentEmotionState,
    recentAlerts,
    emotionInsights,
    emotionHistory,

    // 方法
    analyzeUserInput,
    trackBehavior,
    recordEmotionEvent,
    getEmotionReport,
    clearAlerts,
    acknowledgeAlert,

    // 统计信息
    sessionDuration: Math.floor((Date.now() - sessionStartTime.current) / 1000),
    behaviorStats: Object.fromEntries(behaviorTrackingRef.current)
  }
}

export default useEmotionMonitor