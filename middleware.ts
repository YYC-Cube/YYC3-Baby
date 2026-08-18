import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

/**
 * 混合路由架构：
 * - 根路由（/growth、/homework…）= 中文主应用，不经 next-intl 处理
 * - /en/*、/zh/* = 国际化镜像路由，交由 next-intl（默认语言 zh 自动去前缀）
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLocalePath = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (!isLocalePath) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
