import { requireAuth } from "@/lib/auth/guard"
import { isChildOwnedBy } from "@/lib/api/ownership"
import { deleteRow, getRow } from "@/lib/db/server"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const record = await getRow<{ child_id: string }>("growth_records", id)
    if (!record) {
      return NextResponse.json({ error: "成长记录不存在", success: false }, { status: 404 })
    }
    // 归属校验：记录 → 孩子 → 当前用户
    if (!(await isChildOwnedBy(record.child_id, auth.user.id))) {
      return NextResponse.json({ error: "无权删除该记录", success: false }, { status: 403 })
    }

    const deleted = await deleteRow("growth_records", id)
    if (!deleted) {
      return NextResponse.json({ error: "成长记录不存在", success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[api] Error deleting growth record:", error)
    return NextResponse.json({ error: "Failed to delete growth record", success: false }, { status: 500 })
  }
}
