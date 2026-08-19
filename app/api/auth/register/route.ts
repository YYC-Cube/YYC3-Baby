import { generateRefreshToken, generateToken } from "@/lib/auth/jwt"
import { createUser } from "@/lib/auth/service"
import { NextResponse } from "next/server"
import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(8, "密码至少 8 位"),
  firstName: z.string().min(1, "姓名为必填"),
  lastName: z.string().optional().default(""),
  phone: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation Error", message: parsed.error.issues[0]?.message || "参数错误" },
        { status: 400 }
      )
    }

    const user = await createUser(parsed.data)
    const payload = { userId: user.id, email: user.email, role: user.role }

    return NextResponse.json(
      {
        success: true,
        message: "注册成功",
        data: {
          user,
          tokens: {
            accessToken: generateToken(payload),
            refreshToken: generateRefreshToken(payload),
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
          },
        },
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "注册失败"
    if (message.includes("已注册")) {
      return NextResponse.json({ success: false, error: "Conflict", message }, { status: 409 })
    }
    console.error("[auth] register error:", error)
    return NextResponse.json({ success: false, error: "Server Error", message: "注册失败" }, { status: 500 })
  }
}
