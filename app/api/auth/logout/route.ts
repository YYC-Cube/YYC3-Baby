import { clearAuthCookies } from "@/lib/auth/cookies"
import { NextResponse } from "next/server"

export function POST() {
  // 无状态 JWT 无服务端会话可吊销；清除 httpOnly 令牌 Cookie 即完成登出。
  // 无 Cookie 的 API 客户端由其自行丢弃令牌。
  const res = NextResponse.json({
    success: true,
    message: "登出成功",
    meta: { timestamp: new Date().toISOString() },
  })
  clearAuthCookies(res)
  return res
}
