/**
 * @fileoverview 自动附带认证令牌的 fetch 封装（客户端）
 * @description 服务端 API 已要求 Bearer 认证（P0 安全修复）。
 *   所有调用同源 /api/* 的客户端代码应使用 authFetch 替代裸 fetch：
 *   - 自动附带 accessToken；
 *   - 401 时用 refreshToken 单飞刷新并重试一次（并发请求共享同一次刷新）；
 *   - 刷新失败清除本地令牌（下次请求回到未登录态）。
 */

type TokenStore = {
  getAccessToken(): string | null
  getRefreshToken(): string | null
  setAccessToken(token: string): void
  clearTokens(): void
}

// 经由 window/localStorage 间接访问，便于测试替换
const store: TokenStore = {
  getAccessToken: () => (typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null),
  getRefreshToken: () => (typeof window !== "undefined" ? window.localStorage.getItem("refreshToken") : null),
  setAccessToken: (t) => { if (typeof window !== "undefined") window.localStorage.setItem("accessToken", t) },
  clearTokens: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("accessToken")
      window.localStorage.removeItem("refreshToken")
    }
  },
}

let refreshInFlight: Promise<boolean> | null = null
// 刷新失败后的退避窗口：匿名 401（无任何有效凭据）不再反复触发刷新请求
let refreshBackoffUntil = 0

/** 单飞刷新 accessToken：并发 401 共享一次刷新请求 */
export function refreshAccessToken(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = doRefresh().finally(() => { refreshInFlight = null })
  }
  return refreshInFlight
}

async function doRefresh(): Promise<boolean> {
  if (Date.now() < refreshBackoffUntil) return false
  try {
    // 浏览器内相对路径即同源；非浏览器环境（测试）由注入的 location 提供 origin
    const origin = typeof window !== "undefined" && (window as any).location?.origin
      ? (window as any).location.origin
      : ""
    // 双通道：localStorage 有 refreshToken 则随 body 发送（显式客户端），
    // 否则走 httpOnly Cookie（浏览器主路径，凭据随同源请求自动携带）
    const bodyToken = store.getRefreshToken()
    const res = await fetch(`${origin}/api/auth/refresh`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bodyToken ? { refreshToken: bodyToken } : {}),
    })
    if (!res.ok) {
      refreshBackoffUntil = Date.now() + 60_000
      return false
    }
    const data = await res.json()
    if (data?.success && data?.data?.token) {
      // localStorage 模式（显式客户端）同步更新；cookie 模式由 Set-Cookie 完成
      if (bodyToken) store.setAccessToken(data.data.token)
      return true
    }
    refreshBackoffUntil = Date.now() + 60_000
    return false
  } catch {
    refreshBackoffUntil = Date.now() + 60_000
    return false
  }
}

function withAuthHeader(init: RequestInit): RequestInit {
  const headers = new Headers(init.headers)
  const token = store.getAccessToken()
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  return { ...init, headers }
}

function isAuthEndpoint(input: RequestInfo | URL): boolean {
  const url = typeof input === "string" ? input : input instanceof URL ? input.pathname : input.url
  return url.includes("/api/auth/")
}

/** 仅测试用：清空刷新单飞/退避状态 */
export function resetRefreshState(): void {
  refreshInFlight = null
  refreshBackoffUntil = 0
}

/**
 * 带认证的 fetch：401 时自动刷新并重试一次（认证端点自身不重试）
 */
export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const first = await fetch(input, withAuthHeader(init))

  if (first.status !== 401 || isAuthEndpoint(input)) return first

  const refreshed = await refreshAccessToken()
  if (!refreshed) {
    store.clearTokens()
    return first
  }

  // 重试一次（带新令牌），不再二次刷新
  return fetch(input, withAuthHeader(init))
}
