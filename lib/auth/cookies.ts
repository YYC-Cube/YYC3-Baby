/**
 * @fileoverview 认证令牌 Cookie 传输（httpOnly）
 * @description access/refresh 令牌以 httpOnly Cookie 为主传输通道，
 *   XSS 无法读取；SameSite=Lax 阻断跨站携带，配合 requireAuth 的 Origin
 *   校验（cookie 路径下）构成 CSRF 纵深防御。Bearer 头仍保留（API 客户端兼容）。
 */

import type { NextResponse } from "next/server"

export const ACCESS_COOKIE = "yyc3_at"
export const REFRESH_COOKIE = "yyc3_rt"

// 与 lib/auth/jwt.ts 的默认有效期保持一致（7d / 30d，可被 env 覆盖）
const ACCESS_MAX_AGE = 7 * 24 * 60 * 60
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60

const baseCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
}

/** 登录/刷新成功后写入令牌 Cookie（refresh 限定 /api/auth 路径缩小暴露面） */
export function setAuthCookies(res: NextResponse, accessToken: string, refreshToken?: string): void {
  res.cookies.set(ACCESS_COOKIE, accessToken, {
    ...baseCookie,
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
  })
  if (refreshToken) {
    res.cookies.set(REFRESH_COOKIE, refreshToken, {
      ...baseCookie,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: REFRESH_MAX_AGE,
    })
  }
}

/** 登出时清除令牌 Cookie */
export function clearAuthCookies(res: NextResponse): void {
  res.cookies.set(ACCESS_COOKIE, "", { ...baseCookie, sameSite: "lax", maxAge: 0 })
  res.cookies.set(REFRESH_COOKIE, "", {
    ...baseCookie,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 0,
  })
}
