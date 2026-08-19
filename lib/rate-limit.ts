/**
 * @fileoverview 进程内固定窗口限流器
 * @description 为无外置缓存（Redis 未接入）的 API 路由提供轻量限流。
 *   固定窗口实现：内存 Map<key, {count, windowStart}>，惰性过期清理。
 *   单进程语义：多实例部署时需换分布式实现，当前部署形态为单实例。
 */

export interface RateLimitResult {
  allowed: boolean
  /** 当前窗口剩余次数（0 表示已用尽） */
  remaining: number
  /** 距窗口重置的秒数 */
  retryAfterSec: number
}

interface WindowState {
  count: number
  windowStart: number
}

const buckets = new Map<string, WindowState>()

// 防止 key 无限增长：每次检查顺带清理过期桶；超过上限时强制全量清理
const MAX_KEYS = 10_000

function sweep(now: number, windowMs: number): void {
  for (const [key, state] of buckets) {
    if (now - state.windowStart >= windowMs) buckets.delete(key)
  }
}

/**
 * 检查并占用一次配额
 * @param key       限流维度键（如 `ai:chat:<userId>`）
 * @param limit     窗口内允许的最大次数
 * @param windowMs  窗口长度（毫秒）
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()

  if (buckets.size > MAX_KEYS) sweep(now, windowMs)

  let state = buckets.get(key)
  if (!state || now - state.windowStart >= windowMs) {
    state = { count: 0, windowStart: now }
    buckets.set(key, state)
  }

  if (state.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((state.windowStart + windowMs - now) / 1000)),
    }
  }

  state.count += 1
  return {
    allowed: true,
    remaining: limit - state.count,
    retryAfterSec: 0,
  }
}

/** 仅测试用：清空所有限流状态 */
export function resetRateLimits(): void {
  buckets.clear()
}
