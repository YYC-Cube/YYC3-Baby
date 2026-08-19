/**
 * @fileoverview 徽章系统数据 Hook
 * @description 拉取真实成长记录/作业/宝宝数据 → 聚合统计 → 评估徽章 → 持久化新解锁
 */

"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { BadgeProgress, BadgeStats } from "@/types/badges"
import { computeStats, evaluateAll, loadUnlockedMap, saveUnlockedMap, RawGrowthRecord, RawHomework, RawChild } from "@/lib/badges/engine"
import { BADGE_COUNT } from "@/lib/badges/definitions"

export interface UseBadgesReturn {
  badges: BadgeProgress[]
  stats: BadgeStats | null
  totalPoints: number
  unlockedCount: number
  newUnlocks: BadgeProgress[]
  loading: boolean
  error: string | null
  /** 新解锁确认后清除“新”标记 */
  clearNewUnlocks: () => void
  refresh: () => void
}

export function useBadges(childId?: string): UseBadgesReturn {
  const [badges, setBadges] = useState<BadgeProgress[]>([])
  const [stats, setStats] = useState<BadgeStats | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [newUnlocks, setNewUnlocks] = useState<BadgeProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const query = childId ? `?childId=${encodeURIComponent(childId)}` : ""
        const [recordsRes, homeworkRes, childrenRes] = await Promise.all([
          fetch(`/api/growth-records${query}`),
          fetch(`/api/homework${query}`),
          fetch("/api/children"),
        ])

        if (!recordsRes.ok) throw new Error(`成长记录加载失败 (${recordsRes.status})`)

        const recordsJson = (await recordsRes.json()) as { data?: RawGrowthRecord[] }
        const homeworkJson = homeworkRes.ok ? ((await homeworkRes.json()) as { data?: RawHomework[] }) : { data: [] }
        const childrenJson = childrenRes.ok ? ((await childrenRes.json()) as { data?: RawChild[] }) : { data: [] }

        if (cancelled) return

        const s = computeStats(recordsJson.data ?? [], homeworkJson.data ?? [], childrenJson.data ?? [])
        const result = evaluateAll(s, loadUnlockedMap())

        if (result.newUnlocks.length > 0) {
          const map = loadUnlockedMap()
          for (const b of result.badges) {
            if (b.unlocked) map[b.definition.id] = b.unlockedAt ?? new Date().toISOString()
          }
          saveUnlockedMap(map)
          setNewUnlocks(result.newUnlocks)
        }

        setStats(s)
        setBadges(result.badges)
        setTotalPoints(result.totalPoints)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "徽章数据加载失败")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [childId, tick])

  const unlockedCount = useMemo(() => badges.filter((b) => b.unlocked).length, [badges])

  const clearNewUnlocks = useCallback(() => setNewUnlocks([]), [])

  return {
    badges,
    stats,
    totalPoints,
    unlockedCount,
    newUnlocks,
    loading,
    error,
    clearNewUnlocks,
    refresh,
  }
}

export { BADGE_COUNT }
