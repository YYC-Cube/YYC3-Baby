import { requireAuth } from "@/lib/auth/guard"
import { createRow, isForeignKeyError, listRows } from "@/lib/db/server"
import { getOwnedChildIds, isChildOwnedBy, pickFields } from "@/lib/api/ownership"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // P0-2 数据隔离：成长记录按当前用户的孩子集合过滤
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const searchParams = request.nextUrl.searchParams
    const childId = searchParams.get("childId")
    const type = searchParams.get("type")

    let childIds: string[]
    if (childId) {
      // 指定孩子时先校验所有权，防止探测他人 childId
      if (!(await isChildOwnedBy(childId, auth.user.id))) {
        return NextResponse.json({ error: "孩子档案不存在或无权访问", success: false }, { status: 403 })
      }
      childIds = [childId]
    } else {
      childIds = await getOwnedChildIds(auth.user.id)
    }

    let records: Record<string, unknown>[] = []
    for (const id of childIds) {
      const conditions: Record<string, unknown> = { child_id: id }
      if (type) conditions.type = type
      records = records.concat(await listRows("growth_records", conditions))
    }
    records.sort(
      (a, b) => new Date(String(b.recorded_at)).getTime() - new Date(String(a.recorded_at)).getTime()
    )

    return NextResponse.json({ data: records, success: true })
  } catch (error) {
    console.error("[api] Error fetching growth records:", error)
    return NextResponse.json({ error: "Failed to fetch growth records", success: false }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await request.json()
    if (!body?.child_id || !body?.title || !body?.content) {
      return NextResponse.json({ error: "child_id/title/content 为必填项", success: false }, { status: 400 })
    }
    // P0-3 防越权：child 必须属于当前用户
    if (!(await isChildOwnedBy(body.child_id, auth.user.id))) {
      return NextResponse.json({ error: "孩子档案不存在或无权访问", success: false }, { status: 403 })
    }
    const safeBody = pickFields(body, [
      "child_id",
      "type",
      "title",
      "content",
      "media_urls",
      "tags",
      "emotion",
      "recorded_at",
    ])
    if (!safeBody.recorded_at) safeBody.recorded_at = new Date().toISOString()
    const newRecord = await createRow("growth_records", safeBody)
    return NextResponse.json({ data: newRecord, success: true }, { status: 201 })
  } catch (error) {
    console.error("[api] Error creating growth record:", error)
    if (isForeignKeyError(error)) {
      return NextResponse.json({ error: "关联的 child_id 不存在", success: false }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create growth record", success: false }, { status: 500 })
  }
}
