import { requireAuth } from "@/lib/auth/guard"
import { isChildOwnedBy, pickFields } from "@/lib/api/ownership"
import { deleteRow, getRow, updateRow } from "@/lib/db/server"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const child = await getRow<{ user_id: string }>("children", id)
    if (!child) {
      return NextResponse.json({ error: "孩子档案不存在", success: false }, { status: 404 })
    }
    if (!(await isChildOwnedBy(id, auth.user.id))) {
      return NextResponse.json({ error: "孩子档案不存在或无权访问", success: false }, { status: 403 })
    }

    const body = (await request.json()) as Record<string, unknown>
    // 主键与归属字段不允许通过 PATCH 变更
    const safeBody = pickFields(body, ["name", "nickname", "birth_date", "gender", "avatar_url", "current_stage"])
    const updated = await updateRow("children", id, safeBody)

    if (!updated) {
      return NextResponse.json({ error: "孩子档案不存在", success: false }, { status: 404 })
    }
    return NextResponse.json({ data: updated, success: true })
  } catch (error) {
    console.error("[api] Error updating child:", error)
    return NextResponse.json({ error: "Failed to update child", success: false }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    if (!(await isChildOwnedBy(id, auth.user.id))) {
      const child = await getRow("children", id)
      return NextResponse.json(
        { error: child ? "无权删除该档案" : "孩子档案不存在", success: false },
        { status: child ? 403 : 404 },
      )
    }

    // 外键 ON DELETE CASCADE：关联记录/作业/里程碑随之删除
    const deleted = await deleteRow("children", id)
    if (!deleted) {
      return NextResponse.json({ error: "孩子档案不存在", success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[api] Error deleting child:", error)
    return NextResponse.json({ error: "Failed to delete child", success: false }, { status: 500 })
  }
}
