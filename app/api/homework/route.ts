import { type NextRequest, NextResponse } from "next/server"
import { createRow, isForeignKeyError, listRows } from "@/lib/db/server"
import { requireAuth } from "@/lib/auth/guard"
import { getOwnedChildIds, isChildOwnedBy, pickFields } from "@/lib/api/ownership"

export async function GET(request: NextRequest) {
  // P0-2 数据隔离：作业按当前用户的孩子集合过滤
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const searchParams = request.nextUrl.searchParams
    const childId = searchParams.get("childId")
    const status = searchParams.get("status")

    let childIds: string[]
    if (childId) {
      if (!(await isChildOwnedBy(childId, auth.user.id))) {
        return NextResponse.json({ error: "孩子档案不存在或无权访问", success: false }, { status: 403 })
      }
      childIds = [childId]
    } else {
      childIds = await getOwnedChildIds(auth.user.id)
    }

    let homework: Record<string, unknown>[] = []
    for (const id of childIds) {
      const conditions: Record<string, unknown> = { child_id: id }
      if (status) conditions.status = status
      homework = homework.concat(await listRows("homework_tasks", conditions))
    }
    return NextResponse.json({ data: homework, success: true })
  } catch (error) {
    console.error("[api] Error fetching homework:", error)
    return NextResponse.json({ error: "Failed to fetch homework", success: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await request.json()
    if (!body?.child_id || !body?.subject || !body?.title) {
      return NextResponse.json({ error: "child_id/subject/title 为必填项", success: false }, { status: 400 })
    }
    // P0-3 防越权：child 必须属于当前用户
    if (!(await isChildOwnedBy(body.child_id, auth.user.id))) {
      return NextResponse.json({ error: "孩子档案不存在或无权访问", success: false }, { status: 403 })
    }
    const safeBody = pickFields(body, [
      "child_id",
      "subject",
      "title",
      "description",
      "due_date",
      "status",
      "priority",
    ])
    if (!safeBody.status) safeBody.status = "pending"
    if (!safeBody.priority) safeBody.priority = "normal"
    const newHomework = await createRow("homework_tasks", safeBody)
    return NextResponse.json({ data: newHomework, success: true }, { status: 201 })
  } catch (error) {
    console.error("[api] Error creating homework:", error)
    if (isForeignKeyError(error)) {
      return NextResponse.json({ error: "关联的 child_id 不存在", success: false }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create homework", success: false }, { status: 500 })
  }
}
