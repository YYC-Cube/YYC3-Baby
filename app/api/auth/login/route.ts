import { generateRefreshToken, generateToken } from "@/lib/auth/jwt"
import { findUserByEmail, toAuthUser, touchLastLogin, verifyPassword } from "@/lib/auth/service"
import { error as logError, info as logInfo } from "@/lib/logger/server"
import { NextResponse } from "next/server"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(1, "密码为必填"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation Error", message: parsed.error.issues[0]?.message || "参数错误" },
        { status: 400 }
      )
    }

    const row = await findUserByEmail(parsed.data.email)
    if (!row || !(await verifyPassword(parsed.data.password, row.password_hash))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", message: "邮箱或密码错误" },
        { status: 401 }
      )
    }

    const user = toAuthUser(row)
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", message: "账号已停用" },
        { status: 401 }
      )
    }

    // 异步更新最后登录时间（不阻塞响应）
    void touchLastLogin(user.id)

    const payload = { userId: user.id, email: user.email, role: user.role }
    logInfo("登录成功", { userId: user.id, email: user.email }, { module: "auth", function: "login" })

    return NextResponse.json({
      success: true,
      message: "登录成功",
      data: {
        user,
        tokens: {
          accessToken: generateToken(payload),
          refreshToken: generateRefreshToken(payload),
          expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        },
      },
      meta: { timestamp: new Date().toISOString() },
    })
  } catch (error) {
    logError("登录失败", error, { module: "auth", function: "login" })
    return NextResponse.json({ success: false, error: "Server Error", message: "登录失败" }, { status: 500 })
  }
}
