// 供组件直接引用的语言常量（LanguageSwitcher 等使用）
export const locales = ["zh", "en"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  zh: "简体中文",
  en: "English",
}
