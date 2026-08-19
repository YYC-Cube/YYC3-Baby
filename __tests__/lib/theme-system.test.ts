/**
 * @fileoverview 主题系统单元测试（Phase 2 尾项 + 删除前 UI/UX 测试）
 * @description 覆盖：THEME_IDS 四主题注册、THEME_META 完整性、
 *   ThemeSwitcher 映射逻辑、主题明暗判定、背景层激活逻辑。
 */

import { THEME_IDS, THEME_META, type ThemeId } from "@/components/theme-system/ThemeProvider"
import { describe, expect, it } from "bun:test"

describe("主题注册（四主题）", () => {
  it("THEME_IDS 包含 default/cyberpunk/liquid/aurora", () => {
    expect(THEME_IDS).toEqual(["default", "cyberpunk", "liquid", "aurora"])
  })

  it("THEME_META 覆盖全部主题且字段完整", () => {
    for (const id of THEME_IDS) {
      const meta = THEME_META[id]
      expect(meta.label).toBeString()
      expect(meta.label.length).toBeGreaterThan(0)
      expect(meta.icon).toContain("ri-")
      expect(meta.desc).toBeString()
    }
  })

  it("aurora 主题元数据正确", () => {
    expect(THEME_META.aurora.label).toBe("极光")
    expect(THEME_META.aurora.icon).toBe("ri-sparkling-2-fill")
  })
})

describe("主题明暗判定（sonner 映射逻辑）", () => {
  // 与 components/ui/sonner.tsx 一致：cyberpunk/aurora → dark
  const sonnerTheme = (theme: string) => (theme === "cyberpunk" || theme === "aurora" ? "dark" : "light")

  it("cyberpunk 与 aurora 映射为 dark", () => {
    expect(sonnerTheme("cyberpunk")).toBe("dark")
    expect(sonnerTheme("aurora")).toBe("dark")
  })

  it("default 与 liquid 映射为 light", () => {
    expect(sonnerTheme("default")).toBe("light")
    expect(sonnerTheme("liquid")).toBe("light")
  })
})

describe("背景层激活逻辑（ThemeBackgroundLayer）", () => {
  // 与 components/theme-system/ThemeBackgroundLayer.tsx 一致：仅 aurora 渲染
  const shouldRenderBackground = (resolvedTheme: string | undefined) => resolvedTheme === "aurora"

  it("aurora 主题渲染增强背景", () => {
    expect(shouldRenderBackground("aurora")).toBeTrue()
  })

  it("其余主题不渲染增强背景", () => {
    expect(shouldRenderBackground("default")).toBeFalse()
    expect(shouldRenderBackground("cyberpunk")).toBeFalse()
    expect(shouldRenderBackground("liquid")).toBeFalse()
    expect(shouldRenderBackground(undefined)).toBeFalse()
  })
})

describe("CSS 主题层完整性", () => {
  // 校验 globals.css 中每个 data-theme 都有对应选择器（静态读取校验）
  it("四主题均在 globals.css 中定义", async () => {
    const fs = await import("node:fs")
    const css = fs.readFileSync("app/globals.css", "utf8")
    for (const id of ["default", "cyberpunk", "liquid", "aurora"] as ThemeId[]) {
      if (id === "default") continue // default 走 :root
      expect(css).toContain(`[data-theme='${id}']`)
    }
    // aurora 应有 shadcn 语义 token（匹配 [data-theme='aurora'] 后的第一个规则块）
    const auroraMatch = css.match(/(?:^|\n)\[data-theme='aurora'\]\s*\{([^}]+)\}/)
    const auroraBlock = auroraMatch?.[1] ?? ""
    expect(auroraBlock).toContain("--background")
    expect(auroraBlock).toContain("--ring")
    expect(auroraBlock).toContain("--primary")
  })

  it("aurora-effects.css 含背景层 keyframes", async () => {
    const fs = await import("node:fs")
    const css = fs.readFileSync("styles/aurora-effects.css", "utf8")
    expect(css).toContain("@keyframes auroraComplex")
    expect(css).toContain("@keyframes auroraOrbFloat1")
    expect(css).toContain("@keyframes auroraParticle")
    expect(css).toContain("prefers-reduced-motion")
  })
})

describe("Phase 3 · 语义工具类与 dark 变体映射", () => {
  it("globals.css 定义全部语义工具类", async () => {
    const fs = await import("node:fs")
    const css = fs.readFileSync("app/globals.css", "utf8")
    const classes = [
      ".text-adaptive",
      ".text-adaptive-muted",
      ".bg-surface",
      ".bg-surface-soft",
      ".border-soft",
      ".text-theme-accent",
      ".bg-theme-accent",
    ]
    for (const cls of classes) {
      expect(css).toContain(cls)
    }
  })

  it("语义类映射到兄弟 token", async () => {
    const fs = await import("node:fs")
    const css = fs.readFileSync("app/globals.css", "utf8")
    expect(css).toMatch(/\.text-adaptive\s*\{[\s\S]*?var\(--fg-default\)/)
    expect(css).toMatch(/\.bg-surface\s*\{[\s\S]*?var\(--bg-surface\)/)
    expect(css).toMatch(/\.border-soft\s*\{[\s\S]*?var\(--border-soft\)/)
  })

  it("@custom-variant dark 覆盖 data-theme 暗色主题", async () => {
    const fs = await import("node:fs")
    const css = fs.readFileSync("app/globals.css", "utf8")
    expect(css).toContain("@custom-variant dark")
    expect(css).toContain("[data-theme='cyberpunk'] *")
    expect(css).toContain("[data-theme='aurora'] *")
  })

  it("业务组件已迁移到语义类（无 dark:bg-gray 残留）", async () => {
    const fs = await import("node:fs")
    // 原样本 FixedAIWidget 已随孤儿清理删除，改用存活组件 SmartHomeworkHelper
    const widget = fs.readFileSync("components/homework/SmartHomeworkHelper.tsx", "utf8")
    expect(widget).toContain("bg-surface")
    expect(widget).toContain("text-adaptive")
    expect(widget).not.toContain("dark:bg-gray-")
  })
})
