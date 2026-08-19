"use client"

/**
 * 主题切换器：三选一胶囊组，可复用于设置页 / 侧栏 / 弹层。
 * 移植自兄弟项目 YYC3-AI-Growth-Companion components/theme-system/ThemeSwitcher.tsx。
 */

import { useTheme } from "next-themes"
import { THEME_IDS, THEME_META } from "./ThemeProvider"

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="界面主题"
      className="inline-flex gap-1 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface)] p-1"
    >
      {THEME_IDS.map((id) => {
        const meta = THEME_META[id]
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            title={meta.desc}
            onClick={() => { setTheme(id); }}
            className={`flex items-center gap-1.5 rounded-lg text-sm transition-colors ${compact ? "px-2.5 py-1.5" : "px-3 py-2"
              } ${active
                ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium"
                : "text-[var(--fg-muted)] hover:bg-[var(--bg-surface-soft)]"
              }`}
          >
            <i className={meta.icon} aria-hidden />
            {!compact && meta.label}
          </button>
        )
      })}
    </div>
  )
}
