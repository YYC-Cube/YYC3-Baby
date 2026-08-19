/**
 * @fileoverview 数据所有权校验（API Route 专用）
 * @description 写操作防越权（IDOR）：所有按 child_id 关联的数据在写入前，
 *   必须确认该 child 归属于当前认证用户；列表查询按用户的孩子集合过滤。
 */

import { getRow, listRows } from "@/lib/db/server"

/** 当前用户拥有的全部孩子 id */
export async function getOwnedChildIds(userId: string): Promise<string[]> {
  const children = await listRows<{ id: string }>("children", { user_id: userId })
  return children.map((c) => c.id)
}

/** childId 是否归属于 userId（不存在同样视为不属于） */
export async function isChildOwnedBy(childId: unknown, userId: string): Promise<boolean> {
  if (typeof childId !== "string" || childId.length === 0) return false
  const child = await getRow<{ user_id: string }>("children", childId)
  return child?.user_id === userId
}

/** 从请求 body 中仅保留白名单字段（防未知列写入/批量赋值） */
export function pickFields<T extends Record<string, unknown>>(
  body: Record<string, unknown>,
  allowed: readonly (keyof T & string)[]
): Partial<T> {
  const out: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) out[key] = body[key]
  }
  return out as Partial<T>
}
