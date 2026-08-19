/**
 * @fileoverview 鉴权服务层：密码哈希与用户操作（SQLite 适配）
 * @description 移植自 YYC3-AI-Growth-Companion backend/src/controllers/authController.ts，
 *   将 PostgreSQL 查询替换为本项目 lib/db/server.ts 数据访问层。
 * @author YYC³
 * @version 1.0.0
 * @created 2026-08-19
 */

import { createRow, getServerDB, listRows } from "@/lib/db/server"
import bcrypt from "bcryptjs"
import type { AuthUser, UserRow } from "./mapper"
import { toAuthUser } from "./mapper"

export { toAuthUser } from "./mapper"
export type { AuthUser, UserRow } from "./mapper"

/** 按邮箱查找完整用户行（含密码哈希，仅服务端内部使用） */
export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const rows = await listRows<UserRow>("users", { email: String(email).toLowerCase().trim() })
  return rows[0] || null
}

/** 按 ID 查找完整用户行 */
export async function findUserById(userId: string): Promise<UserRow | null> {
  const rows = await listRows<UserRow>("users", { id: userId })
  return rows[0] || null
}

/** 校验密码（bcrypt） */
export async function verifyPassword(plain: string, hash: string | null | undefined): Promise<boolean> {
  if (!hash) return false
  try {
    return await bcrypt.compare(plain, hash)
  } catch {
    return false
  }
}

/** 创建用户（含 bcrypt 密码哈希），邮箱重复时抛错 */
export async function createUser(data: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}): Promise<AuthUser> {
  const email = String(data.email).toLowerCase().trim()
  const existing = await findUserByEmail(email)
  if (existing) throw new Error("该邮箱已注册")

  const passwordHash = await bcrypt.hash(data.password, 12)
  const row = await createRow<UserRow>("users", {
    email,
    name: `${data.firstName}${data.lastName || ""}`,
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phone || null,
    password_hash: passwordHash,
    role: "parent",
    is_active: 1,
    email_verified: 0,
  })
  return toAuthUser(row)
}

/** 更新最后登录时间（异步，不阻塞请求） */
export async function touchLastLogin(userId: string): Promise<void> {
  try {
    const db = getServerDB()
    await db.update("users", userId, { last_login_at: new Date().toISOString() })
  } catch (err) {
    console.error("[auth] 更新最后登录时间失败:", err)
  }
}
