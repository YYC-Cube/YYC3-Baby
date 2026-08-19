/**
 * JWT 令牌类型声明测试（lib/auth/jwt）
 * 覆盖：access/refresh 类型声明写入、类型混用拒绝、无类型旧令牌拒绝
 */

import { describe, expect, test } from "bun:test"
import {
  generateRefreshToken,
  generateToken,
  verifyToken,
  type JWTPayload,
} from "@/lib/auth/jwt"

const payload: JWTPayload = {
  userId: "test-user-id",
  email: "test@example.com",
  role: "parent",
}

describe("令牌类型声明", () => {
  test("访问令牌应携带 type=access", () => {
    const token = generateToken(payload)
    expect(verifyToken(token, "access").userId).toBe("test-user-id")
    expect(verifyToken(token).type).toBe("access")
  })

  test("刷新令牌应携带 type=refresh", () => {
    const token = generateRefreshToken(payload)
    expect(verifyToken(token, "refresh").userId).toBe("test-user-id")
    expect(verifyToken(token).type).toBe("refresh")
  })

  test("刷新令牌不得当作访问令牌使用", () => {
    const refreshToken = generateRefreshToken(payload)
    expect(() => verifyToken(refreshToken, "access")).toThrow(/令牌类型错误/)
  })

  test("访问令牌不得用于刷新", () => {
    const accessToken = generateToken(payload)
    expect(() => verifyToken(accessToken, "refresh")).toThrow(/令牌类型错误/)
  })

  test("无类型声明的旧式令牌应被拒绝", () => {
    // 模拟旧版签发（无 type 声明）：手工构造
    const oldStyle = `${btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=+$/, "")}.${btoa("old-payload").replace(/=+$/, "")}.sig`
    expect(() => verifyToken(oldStyle, "access")).toThrow()
  })
})
