/**
 * @fileoverview JWT 鉴权模块单元测试（P0-1 鉴权中间件融合）
 * @description 聚焦纯函数：JWT 签发/验证、令牌提取、用户行映射。
 *   数据库访问层依赖 node:sqlite（Bun 运行时不可用），由集成测试覆盖，此处用 mock。
 */

import { extractToken, extractTokenFromRequest, generateRefreshToken, generateToken, verifyToken } from "@/lib/auth/jwt"
import { toAuthUser } from "@/lib/auth/mapper"
import { describe, expect, it, mock } from "bun:test"

// JWT 测试使用固定密钥
process.env.JWT_SECRET = "test-secret-for-unit-tests"

describe("JWT 签发与验证", () => {
  const payload = { userId: "u1", email: "test@yyc3.com", role: "parent" }

  it("签发并验证访问令牌", () => {
    const token = generateToken(payload)
    expect(token).toBeString()
    const decoded = verifyToken(token)
    expect(decoded.userId).toBe("u1")
    expect(decoded.email).toBe("test@yyc3.com")
    expect(decoded.role).toBe("parent")
  })

  it("签发并验证刷新令牌", () => {
    const token = generateRefreshToken(payload)
    const decoded = verifyToken(token)
    expect(decoded.userId).toBe("u1")
  })

  it("过期令牌抛出错误", async () => {
    // 通过过期时间构造已过期令牌（sign 时 expiresIn 覆盖载荷 exp）
    const { sign } = await import("jsonwebtoken")
    const expired = sign(payload, process.env.JWT_SECRET as string, { expiresIn: "-10s" })
    expect(() => verifyToken(expired)).toThrow()
  })

  it("错误密钥无法验证", () => {
    process.env.JWT_SECRET = "another-secret"
    const token = generateToken(payload)
    process.env.JWT_SECRET = "test-secret-for-unit-tests"
    expect(() => verifyToken(token)).toThrow()
  })
})

describe("令牌提取", () => {
  it("从 Bearer 头提取令牌", () => {
    expect(extractToken("Bearer abc.def.ghi")).toBe("abc.def.ghi")
  })

  it("非法头返回 null", () => {
    expect(extractToken(null)).toBeNull()
    expect(extractToken("Basic abc")).toBeNull()
    expect(extractToken("Bearer")).toBeNull()
  })

  it("从 Headers 对象提取", () => {
    const headers = new Headers({ authorization: "Bearer xyz" })
    expect(extractTokenFromRequest(headers)).toBe("xyz")
    expect(extractTokenFromRequest(new Headers())).toBeNull()
  })
})

describe("用户行映射 toAuthUser", () => {
  it("映射完整字段（含旧 name 回退）", () => {
    const view = toAuthUser({
      id: "u1",
      email: "parent@yyc3.com",
      name: "张女士",
      first_name: "张",
      last_name: "女士",
      phone: "13800000000",
      avatar_url: "/avatar.png",
      role: "parent",
      is_active: 1,
      email_verified: 1,
      created_at: "2026-01-01T00:00:00.000Z",
    })
    expect(view.firstName).toBe("张")
    expect(view.lastName).toBe("女士")
    expect(view.isActive).toBeTrue()
    expect(view.emailVerified).toBeTrue()
  })

  it("缺失字段有默认值", () => {
    const view = toAuthUser({
      id: "u2",
      email: "x@yyc3.com",
      created_at: "2026-01-01T00:00:00.000Z",
    })
    expect(view.firstName).toBe("")
    expect(view.role).toBe("parent")
    expect(view.isActive).toBeTrue()
    expect(view.emailVerified).toBeFalse()
  })
})

// 避免未使用告警：mock 导入占位
void mock
