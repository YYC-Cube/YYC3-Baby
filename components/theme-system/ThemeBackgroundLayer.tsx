"use client"

/**
 * @file ThemeBackgroundLayer.tsx
 * @description 主题增强背景层（Phase 2 尾项 · 评估报告建议 2）
 * @detail 根据当前 data-theme 条件渲染对应背景组件：
 *   - aurora → AuroraBackground（极光 Orb + 粒子）
 *   - cyberpunk / liquid → 暂由 globals.css 表面接管（背景组件后续 Phase 接入）
 *   - default → 无增强背景
 * 背景层 position:fixed + pointer-events:none，不阻塞交互。
 */

import { useTheme } from "next-themes"
import { AuroraBackground } from "./backgrounds/AuroraBackground"

export function ThemeBackgroundLayer() {
  const { resolvedTheme } = useTheme()

  // 仅 aurora 主题渲染增强背景（其余主题由 globals.css 表面接管）
  if (resolvedTheme !== "aurora") return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <AuroraBackground />
    </div>
  )
}

export default ThemeBackgroundLayer
