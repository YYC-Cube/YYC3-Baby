import { NextResponse } from "next/server"
import { z } from "zod"
import { generateToken, verifyToken } from "@/lib/auth/jwt"
import { findUserById, toAuthUser } from "@/lib/auth/service"

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "refreshToken 为必填"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const parsed = refreshSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation Error", message: parsed.error.issues[0]?.message || "参数错误" },
        { status: 400 }
      )
    }

    let payload
    try {
      payload = verifyToken(parsed.data.refreshToken)
    } catch {
      return NextResponse.json(
        { success: false, error: "Unauthorized", message: "刷新令牌无效或已过期" },
        { status: 401 }
      )
    }

    const row = await findUserById(payload.userId)
    if (!row) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", message: "用户不存在" },
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

    return NextResponse.json({
      success: true,
      data: {
        token: generateToken({ userId: user.id, email: user.email, role: user.role }),
        user,
      },
      meta: { timestamp: new Date().toISOString() },
    })
  } catch (error) {
    console.error("[auth] refresh error:", error)
    return NextResponse.json({ success: false, error: "Server Error", message: "刷新令牌失败" }, { status: 500 })
  }
}
