/**
 * @fileoverview JWT 签发与验证模块（Next.js App Router 适配）
 * @description 移植自 YYC3-AI-Growth-Companion backend/src/middleware/auth.ts，
 *   去掉 Express 依赖，改为纯函数供 App Router route.ts 调用。
 * @author YYC³
 * @version 1.0.0
 * @created 2026-08-19
 */

import jwt, { type SignOptions } from "jsonwebtoken"

/** JWT 载荷 */
export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

const ISSUER = "yyc3-ai-xiaoyu"
const AUDIENCE = "yyc3-ai-xiaoyu-users"

/** 从环境变量读取 JWT 密钥（缺失时开发环境使用降级值） */
function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    // 开发环境降级：未配置 JWT_SECRET 时使用可复现默认值，生产必须显式配置
    if (process.env.NODE_ENV !== "production") {
      return "yyc3-dev-secret-do-not-use-in-prod"
    }
    throw new Error("JWT_SECRET environment variable is not defined")
  }
  return secret
}

/** 签发访问令牌（默认 7 天） */
export function generateToken(payload: JWTPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",
    issuer: ISSUER,
    audience: AUDIENCE,
  }
  return jwt.sign(payload, getSecret(), options)
}

/** 签发刷新令牌（默认 30 天） */
export function generateRefreshToken(payload: JWTPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "30d",
    issuer: ISSUER,
    audience: AUDIENCE,
  }
  return jwt.sign(payload, getSecret(), options)
}

/** 验证令牌并返回载荷；无效/过期时抛出 Error */
export function verifyToken(token: string): JWTPayload {
  const decoded = jwt.verify(token, getSecret(), {
    issuer: ISSUER,
    audience: AUDIENCE,
  }) as JWTPayload
  return decoded
}

/** 从 Authorization 头提取 Bearer 令牌 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  const parts = authHeader.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") return null
  return parts[1]
}

/** 从 NextRequest 请求头提取令牌 */
export function extractTokenFromRequest(headers: Headers): string | null {
  return extractToken(headers.get("authorization"))
}
