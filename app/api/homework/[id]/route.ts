import { requireAuth } from "@/lib/auth/guard"
import { deleteRow, updateRow } from "@/lib/db/server"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // P0-1 鉴权：写操作需登录
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const body = await request.json()
    if (body?.status === "completed" && !body.completed_at) {
      body.completed_at = new Date().toISOString()
    }
    const updated = await updateRow("homework_tasks", id, body)

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
