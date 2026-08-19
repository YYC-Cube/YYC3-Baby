import { requireAuth } from "@/lib/auth/guard"
import { getOwnedChildIds } from "@/lib/api/ownership"
import { getServerDB } from "@/lib/db/server"
import { NextResponse } from "next/server"

/**
 * 当前用户的聚合统计（首页卡片）：孩子数 / 成长记录 / 里程碑 / 评估
 */
export async function GET(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const childIds = await getOwnedChildIds(auth.user.id)
    const db = getServerDB()

    const [children, records, milestones, assessments] = await Promise.all([
      Promise.resolve(childIds.length),
      countForChildren(db, "growth_records", childIds),
      countForChildren(db, "milestones", childIds),
      countForChildren(db, "growth_assessments", childIds),
    ])

    return NextResponse.json({
      data: { children, records, milestones, assessments },
      success: true,
    })
  } catch (error) {
    console.error("[api] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", success: false }, { status: 500 })
  }
}

/** 按孩子集合计数（count 仅支持 AND 等值条件；孩子数通常 1-3，逐个求和） */
async function countForChildren(
  db: ReturnType<typeof getServerDB>,
  table: "growth_records" | "milestones" | "growth_assessments",
  childIds: string[],
): Promise<number> {
  let sum = 0
  for (const id of childIds) {
    sum += await db.count(table, { child_id: id })
  }
  return sum
}
