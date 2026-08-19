import { requireAuth } from "@/lib/auth/guard"
import { isChildOwnedBy, pickFields } from "@/lib/api/ownership"
import { deleteRow, getRow, updateRow } from "@/lib/db/server"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    // P0-3 防越权：任务 → 孩子 → 归属用户 三级校验
    const task = await getRow<{ child_id: string }>("homework_tasks", id)
    if (!task) {
      return NextResponse.json({ error: "Homework not found", success: false }, { status: 404 })
    }
    if (!(await isChildOwnedBy(task.child_id, auth.user.id))) {
      return NextResponse.json({ error: "无权修改该作业", success: false }, { status: 403 })
    }

    const body = (await request.json()) as Record<string, unknown>
    // 主键与归属字段不允许通过 PATCH 变更
    const { id: _ignoredId, child_id: _ignoredChildId, created_at: _ignoredCreatedAt, ...rest } = body ?? {}
    if (rest?.status === "completed" && !rest.completed_at) {
      rest.completed_at = new Date().toISOString()
    }
    const safeBody = pickFields(rest, [
      "subject",
      "title",
      "description",
      "due_date",
      "status",
      "priority",
      "ai_feedback",
      "completed_at",
    ])
    const updated = await updateRow("homework_tasks", id, safeBody)

    if (!updated) {
      return NextResponse.json({ error: "Homework not found", success: false }, { status: 404 })
    }
    return NextResponse.json({ data: updated, success: true })
  } catch (error) {
    console.error("[api] Error updating homework:", error)
    return NextResponse.json({ error: "Failed to update homework", success: false }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    // P0-3 防越权：先校验归属再删除
    const task = await getRow<{ child_id: string }>("homework_tasks", id)
    if (!task) {
      return NextResponse.json({ error: "Homework not found", success: false }, { status: 404 })
    }
    if (!(await isChildOwnedBy(task.child_id, auth.user.id))) {
      return NextResponse.json({ error: "无权删除该作业", success: false }, { status: 403 })
    }

    const deleted = await deleteRow("homework_tasks", id)
    if (!deleted) {
      return NextResponse.json({ error: "Homework not found", success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[api] Error deleting homework:", error)
    return NextResponse.json({ error: "Failed to delete homework", success: false }, { status: 500 })
  }
}
