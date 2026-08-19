/**
 * @fileoverview 路由保护辅助（Next.js App Router 适配）
 * @description 移植自 YYC3-AI-Growth-Companion backend/src/middleware/auth.ts 的
 *   authMiddleware / optionalAuthMiddleware / requireRole，改为 NextResponse 语义。
 * @author YYC³
 * @version 1.0.0
 * @created 2026-08-19
 */

import { NextRequest, NextResponse } from "next/server"
import { extractTokenFromRequest, verifyToken, type JWTPayload } from "./jwt"
import { findUserById, toAuthUser, type AuthUser } from "./service"

/** 当前请求上下文中的认证用户 */
export interface AuthContext {
  user: AuthUser
  payload: JWTPayload
}

/**
 * 必需认证：无有效令牌时返回 401 JSON 响应
 * @returns 认证上下文（成功）或 NextResponse（失败）
 */
export async function requireAuth(request: NextRequest): Promise<AuthContext | NextResponse> {
  const token = extractTokenFromRequest(request.headers)
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication Error", message: "缺少认证令牌" },
      { status: 401 }
    )
  }

  let payload: JWTPayload
  try {
    payload = verifyToken(token)
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
