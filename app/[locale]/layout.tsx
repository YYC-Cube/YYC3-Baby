/**
 * YYC³ AI小语智能成长守护系统 - 国际化布局
 * next-intl v4：locale 路由参数 + 客户端 Provider
 */

import type React from "react"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"

// 注意：根 app/layout.tsx 已渲染 <html>/<body>；
// 此布局只做 locale 校验 + Provider 注入，避免嵌套 <html>
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// 仅允许 zh/en：未知单段路径（如已删除的页面）在路由匹配阶段直接 404，
// 避免落入 [locale] 动态段后被流式渲染成 200 状态 + 404 内容
export const dynamicParams = false

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
}
