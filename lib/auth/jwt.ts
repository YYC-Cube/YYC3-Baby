/**
 * @fileoverview JWT 签发与验证模块（Next.js App Router 适配）
 * @description 移植自 YYC3-AI-Growth-Companion backend/src/middleware/auth.ts，
 *   去掉 Express 依赖，改为纯函数供 App Router route.ts 调用。
 *   安全设计：
 *   - 令牌携带 type 声明（access/refresh），verifyToken 按 expectedType 校验，
 *     防止刷新令牌（30d）被当作访问令牌使用；
 *   - 生产环境必须显式配置 JWT_SECRET；开发环境使用安装级随机密钥
 *     （持久化于 data/.jwt-dev-secret，已 gitignore），不再使用公共常量。
 * @author YYC³
 * @version 1.1.0
 * @created 2026-08-19
 */

import jwt, { type SignOptions } from "jsonwebtoken"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { randomBytes } from "node:crypto"

/** 令牌类型声明 */
export type TokenType = "access" | "refresh"

/** JWT 载荷 */
export interface JWTPayload {
  userId: string
  email: string
  role: string
  type?: TokenType
  iat?: number
  exp?: number
}

const ISSUER = "yyc3-ai-xiaoyu"
const AUDIENCE = "yyc3-ai-xiaoyu-users"
const DEV_SECRET_PATH = `${process.cwd()}/data/.jwt-dev-secret`

let devSecretWarned = false

/** 开发环境安装级随机密钥：持久化到 data/.jwt-dev-secret（gitignored） */
function getDevSecret(): string {
  try {
    if (existsSync(DEV_SECRET_PATH)) {
      const existing = readFileSync(DEV_SECRET_PATH, "utf8").trim()
      if (existing.length >= 32) return existing
    }
    const secret = randomBytes(48).toString("hex")
    mkdirSync(dirname(DEV_SECRET_PATH), { recursive: true })
    writeFileSync(DEV_SECRET_PATH, secret, { mode: 0o600 })
    if (!devSecretWarned) {
      console.warn("⚠️ 未配置 JWT_SECRET，开发环境已生成随机密钥（data/.jwt-dev-secret）。生产部署必须显式配置 JWT_SECRET。")
      devSecretWarned = true
    }
    return secret
  } catch {
    // 文件系统不可用（如只读环境）：进程内随机密钥，重启后令牌全部失效
    return randomBytes(48).toString("hex")
  }
}

/** 从环境变量读取 JWT 密钥（生产缺失即拒绝启动；开发缺失降级为随机密钥） */
function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV !== "production") {
    return getDevSecret()
  }
  throw new Error("JWT_SECRET environment variable is not defined")
}

/** 签发访问令牌（默认 7 天，可用 JWT_EXPIRES_IN 覆盖） */
export function generateToken(payload: JWTPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",
    issuer: ISSUER,
    audience: AUDIENCE,
  }
  return jwt.sign({ ...payload, type: "access" as TokenType }, getSecret(), options)
}

/** 签发刷新令牌（默认 30 天，可用 JWT_REFRESH_EXPIRES_IN 覆盖） */
export function generateRefreshToken(payload: JWTPayload): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "30d",
    issuer: ISSUER,
    audience: AUDIENCE,
  }
  return jwt.sign({ ...payload, type: "refresh" as TokenType }, getSecret(), options)
}

/**
 * 验证令牌并返回载荷；无效/过期/类型不符时抛错
 * @param expectedType 校验令牌类型声明，防止 access/refresh 互换使用
 */
export function verifyToken(token: string, expectedType?: TokenType): JWTPayload {
  const decoded = jwt.verify(token, getSecret(), {
    issuer: ISSUER,
    audience: AUDIENCE,
  }) as JWTPayload
  if (expectedType && decoded.type !== expectedType) {
    throw new Error(`令牌类型错误: 期望 ${expectedType}，实际 ${decoded.type ?? "未声明"}`)
  }
  return decoded
}

/** 从 Authorization 头提取 Bearer 令牌 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  const parts = authHeader.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") return null
  return parts[1]
}

/** 从请求头提取令牌 */
export function extractTokenFromRequest(headers: Headers): string | null {
  return extractToken(headers.get("authorization"))
}
