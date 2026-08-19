"use client"

/**
 * 统一主题 Provider（路径 A · data-theme 机制打通）
 *
 * 基于 next-themes：以 <html data-theme="..."> 驱动三套主题
 * （default 暖阳 / cyberpunk 赛博霓虹 / liquid 液态翡翠），
 * 选择持久化于 localStorage（next-themes 内建），SSR 安全。
 *
 * 移植自兄弟项目 YYC3-AI-Growth-Companion components/theme-system/ThemeProvider.tsx，
 * 作为统一基线（YYC3-Baby）的第一主题机制。token 定义见 app/globals.css 主题层。
 */

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export const THEME_IDS = ["default", "cyberpunk", "liquid"] as const
export type ThemeId = (typeof THEME_IDS)[number]

export const THEME_META: Record<ThemeId, { label: string; icon: string; desc: string }> = {
  default: {
    label: "暖阳",
    icon: "ri-sun-fill",
    desc: "温暖的琥珀色系，适合日常使用",
  },
  cyberpunk: {
    label: "赛博霓虹",
    icon: "ri-flashlight-fill",
    desc: "深色底霓虹青，源自赛博主题设计稿",
  },
  liquid: {
    label: "液态翡翠",
    icon: "ri-drop-fill",
    desc: "清爽的翡翠青绿，源自液态玻璃设计稿",
  },
}

export function ThemeSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      themes={THEME_IDS as unknown as string[]}
      defaultTheme="default"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
