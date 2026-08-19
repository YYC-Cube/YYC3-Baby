/**
 * @fileoverview 用户行 ↔ 应用层视图映射（纯函数，无外部依赖，可单测）
 */

/** 应用层用户视图（不含敏感字段） */
export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  role: string
  emailVerified: boolean
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt?: string
}

export interface UserRow extends Record<string, unknown> {
  id: string
  email: string
  name?: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar_url?: string
  role?: string
  password_hash?: string | null
  is_active?: number
  email_verified?: number
  last_login_at?: string
  created_at: string
  updated_at?: string
}

/** 行 → 应用层用户视图 */
export function toAuthUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name || row.name || "",
    lastName: row.last_name || "",
    phone: row.phone,
    avatarUrl: row.avatar_url,
    role: row.role || "parent",
    emailVerified: Boolean(row.email_verified),
    isActive: (row.is_active ?? 1) === 1,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
