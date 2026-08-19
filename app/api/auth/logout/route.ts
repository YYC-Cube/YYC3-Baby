import { clearAuthCookies } from "@/lib/auth/cookies"
import { error as logError } from "@/lib/logger/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    void request
    // 无状态 JWT 无服务端会话可吊销；清除 httpOnly 令牌 Cookie 即完成登出。
    // 无 Cookie 的 API 客户端由其自行丢弃令牌。
    const res = NextResponse.json({
      success: true,
      message: "登出成功",
      meta: { timestamp: new Date().toISOString() },
    })
    clearAuthCookies(res)
    return res
  } catch (error) {
    logError("登出失败", error, { module: "auth", function: "logout" })
    return NextResponse.json({ success: false, error: "Server Error", message: "登出失败" }, { status: 500 })
  }
}
