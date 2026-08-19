/**
 * authFetch 主动刷新测试（lib/api/auth-fetch）
 * 覆盖：401→刷新→带新令牌重试成功；刷新失败→清除令牌返回原 401；
 *       并发 401 共享单次刷新；认证端点自身不触发刷新。
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test"

// 无 DOM 环境下注入 localStorage/window（authFetch 经 window 读写令牌）
const ls = new Map<string, string>()
;(globalThis as any).window = globalThis
;(globalThis as any).localStorage = {
  getItem: (k: string) => ls.get(k) ?? null,
  setItem: (k: string, v: string) => { ls.set(k, v) },
  removeItem: (k: string) => { ls.delete(k) },
}

const { authFetch, resetRefreshState } = await import("@/lib/api/auth-fetch")

const calls: Array<{ url: string; auth?: string }> = []
const realFetch = globalThis.fetch

function readAuth(init?: RequestInit): string | undefined {
  if (!init?.headers) return undefined
  if (init.headers instanceof Headers) return init.headers.get("Authorization") ?? undefined
  return (init.headers as Record<string, string>).Authorization
}

function mockFetch(handler: (url: string, init?: RequestInit) => { status: number; body: unknown }) {
  ;(globalThis as any).fetch = async (input: any, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.url
    calls.push({ url, auth: readAuth(init) })
    const { status, body } = handler(url, init)
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }) as any
  }
}

beforeEach(() => { ls.clear(); calls.length = 0; resetRefreshState(); ls.set("accessToken", "old-token"); ls.set("refreshToken", "valid-rt") })
afterEach(() => { (globalThis as any).fetch = realFetch })

describe("authFetch 主动刷新", () => {
  test("401 → 刷新 → 带新令牌重试成功", async () => {
    mockFetch((url, init) => {
      if (url.includes("/api/auth/refresh")) return { status: 200, body: { success: true, data: { token: "new-token" } } }
      const auth = readAuth(init)
      return auth === "Bearer new-token"
        ? { status: 200, body: { success: true } }
        : { status: 401, body: { success: false } }
    })

    const res = await authFetch("/api/children")
    expect(res.status).toBe(200)
    expect(ls.get("accessToken")).toBe("new-token")
    // 顺序：原始请求 → 刷新 → 重试
    expect(calls.map((c) => c.url)).toEqual(["/api/children", "/api/auth/refresh", "/api/children"])
    expect(calls[2].auth).toBe("Bearer new-token")
  })

  test("刷新失败 → 清除令牌并返回原 401", async () => {
    mockFetch((url) => {
      if (url.includes("/api/auth/refresh")) return { status: 401, body: { success: false } }
      return { status: 401, body: { success: false } }
    })

    const res = await authFetch("/api/children")
    expect(res.status).toBe(401)
    expect((globalThis as any).localStorage.getItem("accessToken")).toBeNull()
    expect((globalThis as any).localStorage.getItem("refreshToken")).toBeNull()
  })

  test("无本地 refreshToken 时尝试 cookie 模式刷新，失败后透传 401 并进入退避", async () => {
    ls.delete("refreshToken")
    mockFetch(() => ({ status: 401, body: { success: false } }))

    const res = await authFetch("/api/children")
    expect(res.status).toBe(401)
    expect(calls.length).toBe(2) // 原请求 + 一次 cookie 模式刷新尝试

    // 退避窗口内再次 401 不再重复刷新
    calls.length = 0
    await authFetch("/api/children")
    expect(calls.length).toBe(1)
  })

  test("并发两个 401 只发起一次刷新", async () => {
    mockFetch((url, init) => {
      if (url.includes("/api/auth/refresh")) return { status: 200, body: { success: true, data: { token: "new-token" } } }
      const auth = readAuth(init)
      return auth === "Bearer new-token"
        ? { status: 200, body: { success: true } }
        : { status: 401, body: { success: false } }
    })

    const [a, b] = await Promise.all([authFetch("/api/children"), authFetch("/api/homework")])
    expect(a.status).toBe(200)
    expect(b.status).toBe(200)
    const refreshCalls = calls.filter((c) => c.url.includes("/api/auth/refresh"))
    expect(refreshCalls.length).toBe(1)
  })

  test("认证端点 401 不触发刷新（避免循环）", async () => {
    mockFetch(() => ({ status: 401, body: { success: false } }))

    const res = await authFetch("/api/auth/login", { method: "POST" })
    expect(res.status).toBe(401)
    expect(calls.length).toBe(1)
  })

  test("非 401 响应直接透传", async () => {
    mockFetch(() => ({ status: 403, body: { success: false } }))

    const res = await authFetch("/api/children")
    expect(res.status).toBe(403)
    expect(calls.length).toBe(1)
  })
})
