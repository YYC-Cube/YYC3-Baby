import { type NextRequest, NextResponse } from "next/server"
import { createRow, isForeignKeyError, listRows } from "@/lib/db/server"
import { requireAuth } from "@/lib/auth/guard"
import { pickFields } from "@/lib/api/ownership"

export async function GET(request: NextRequest) {
  // P0-2 数据隔离：儿童档案仅返回当前登录用户自己的
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const children = await listRows("children", { user_id: auth.user.id })
    return NextResponse.json({ data: children, success: true })
  } catch (error) {
    console.error("[api] Error fetching children:", error)
    return NextResponse.json({ error: "Failed to fetch children", success: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await request.json()
    if (!body?.name || !body?.birth_date) {
      return NextResponse.json({ error: "name 与 birth_date 为必填项", success: false }, { status: 400 })
    }
    // P0-3 防批量赋值：user_id 一律取自认证上下文，字段走白名单
    const safeBody = pickFields(body, [
      "name",
      "nickname",
      "birth_date",
      "gender",
      "avatar_url",
      "current_stage",
    ])
    const newChild = await createRow("children", { ...safeBody, user_id: auth.user.id })
    return NextResponse.json({ data: newChild, success: true }, { status: 201 })
  } catch (error) {
    console.error("[api] Error creating child:", error)
    if (isForeignKeyError(error)) {
      return NextResponse.json({ error: "关联的 user_id 不存在", success: false }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create child", success: false }, { status: 500 })
  }
}
