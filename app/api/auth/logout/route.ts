import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { refreshToken } = body as { refreshToken?: string }
    // 前端登出：令牌由客户端清除；服务端无需持久化会话（无状态 JWT）
    void refreshToken
    return NextResponse.json({
      success: true,
      message: "登出成功",
      meta: { timestamp: new Date().toISOString() },
    })
  } catch (error) {
    console.error("[auth] logout error:", error)
    return NextResponse.json({ success: false, error: "Server Error", message: "登出失败" }, { status: 500 })
  }
}
