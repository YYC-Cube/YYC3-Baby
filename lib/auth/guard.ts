/**
 * @fileoverview 路由保护辅助（Next.js App Router 适配）
 * @description 移植自 YYC3-AI-Growth-Companion backend/src/middleware/auth.ts 的
 *   authMiddleware / optionalAuthMiddleware / requireRole，改为 NextResponse 语义。
 * @author YYC³
 * @version 1.0.0
 * @created 2026-08-19
 */

import { NextResponse } from "next/server"
import { ACCESS_COOKIE } from "./cookies"
import { extractTokenFromRequest, verifyToken, type JWTPayload } from "./jwt"
import { findUserById, toAuthUser, type AuthUser } from "./service"

/** 当前请求上下文中的认证用户 */
export interface AuthContext {
  user: AuthUser
  payload: JWTPayload
}

/**
 * CSRF 纵深防御：Cookie 认证的非 GET 请求必须同源。
 * SameSite=Lax 已阻断跨站携带，此处校验 Origin 头作为兜底（老浏览器/自定义客户端）。
 */
function isSameOriginCSRF(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true // 非浏览器客户端（curl/SDK）无 Origin，放行交由其他校验
  try {
    const originHost = new URL(origin).host
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
    return !!host && originHost === host
  } catch {
    return false
  }
}

/**
 * 必需认证：无有效令牌时返回 401 JSON 响应
 * 令牌来源：Authorization Bearer 头（API 客户端）或 httpOnly Cookie（浏览器）
 * @returns 认证上下文（成功）或 NextResponse（失败）
 */
export async function requireAuth(request: Request): Promise<AuthContext | NextResponse> {
  // Cookie 认证的非 GET 请求先过同源校验（Bearer 头不受 CSRF 影响）
  const cookieToken = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${ACCESS_COOKIE}=([^;]+)`))?.[1]
  const usingCookie = !extractTokenFromRequest(request.headers) && !!cookieToken
  if (usingCookie && request.method !== "GET" && !isSameOriginCSRF(request)) {
    return NextResponse.json(
      { success: false, error: "Forbidden", message: "跨站请求被拒绝" },
      { status: 403 }
    )
  }

  const token = extractTokenFromRequest(request.headers) ?? cookieToken
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication Error", message: "缺少认证令牌" },
      { status: 401 }
    )
  }

  let payload: JWTPayload
  try {
    // 仅接受 access 令牌：refresh 令牌（30d）不得充当访问凭证
    payload = verifyToken(token, "access")
  } catch (err) {
    const message = err instanceof Error && err.message.includes("expired")
      ? "令牌已过期"
      : "无效令牌"
    return NextResponse.json(
      { success: false, error: "Authentication Error", message },
      { status: 401 }
    )
  }

  const row = await findUserById(payload.userId)
  if (!row) {
    return NextResponse.json(
      { success: false, error: "Authentication Error", message: "用户不存在" },
      { status: 401 }
    )
  }
  const user = toAuthUser(row)
  if (!user.isActive) {
    return NextResponse.json(
      { success: false, error: "Forbidden", message: "账号已停用" },
      { status: 403 }
    )
  }

  return { user, payload }
}

/**
 * 角色检查：仅允许指定角色访问
 * @returns true（通过）或 NextResponse（拒绝）
 */
export function requireRole(user: AuthUser, roles: string | string[]): true | NextResponse {
  const allowed = Array.isArray(roles) ? roles : [roles]
  if (!allowed.includes(user.role)) {
    return NextResponse.json(
      { success: false, error: "Forbidden", message: "权限不足" },
      { status: 403 }
    )
  }
  return true
}
