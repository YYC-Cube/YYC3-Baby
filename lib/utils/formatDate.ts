/**
 * YYC³ AI小语智能成长守护系统 - 日期格式化工具
 * 面向中文优先的多语言日期展示（zh-CN / en-US），无效输入统一返回 '--'
 */

type DateInput = Date | number | string | null | undefined

function toDate(input: DateInput): Date | null {
  if (input === null || input === undefined) return null
  const d = input instanceof Date ? input : new Date(input)
  return Number.isNaN(d.getTime()) ? null : d
}

// 长日期：2024年1月15日 / January 15, 2024
export function formatDate(
  input: DateInput,
  locale: string = "zh-CN",
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
): string {
  const d = toDate(input)
  if (!d) return "--"
  return new Intl.DateTimeFormat(locale, options).format(d)
}

// 相对时间：刚刚 / 30秒钟前 / 15分钟前 / 昨天 / 前天 / 2个月前 / 2年前
export function formatRelativeTime(input: DateInput, locale: string = "zh-CN"): string {
  const d = toDate(input)
  if (!d) return "--"

  const diffMs = Date.now() - d.getTime()
  const abs = Math.abs(diffMs)
  const before = diffMs >= 0 // 早于现在为"前"

  const seconds = Math.floor(abs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (!before) {
    // 未来时间退化为绝对短日期
    return formatShortDate(d, locale)
  }

  if (seconds < 10) return locale === "zh-CN" ? "刚刚" : "just now"

  // 中文的"昨天/前天"特例
  if (locale === "zh-CN" && days === 1) return "昨天"
  if (locale === "zh-CN" && days === 2) return "前天"

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" })
  if (seconds < 60) return rtf.format(-seconds, "second")
  if (minutes < 60) return rtf.format(-minutes, "minute")
  if (hours < 24) return rtf.format(-hours, "hour")
  if (days < 30) return rtf.format(-days, "day")
  if (days < 365) return rtf.format(-months, "month")
  return rtf.format(-years, "year")
}

// 短日期：2024/01/15（zh） / 01/15/2024（en）
export function formatShortDate(input: DateInput, locale: string = "zh-CN"): string {
  const d = toDate(input)
  if (!d) return "--"

  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return locale === "zh-CN" ? `${y}/${m}/${day}` : `${m}/${day}/${y}`
}

// 日期时间：2024年1月15日 14:30（zh） / January 15, 2024, 02:30 PM（en）
export function formatDateTime(input: DateInput, locale: string = "zh-CN"): string {
  const d = toDate(input)
  if (!d) return "--"

  if (locale === "zh-CN") {
    const date = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d)
    const hh = String(d.getHours()).padStart(2, "0")
    const mm = String(d.getMinutes()).padStart(2, "0")
    return `${date} ${hh}:${mm}`
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

// 周岁计算（同日为 0，未来日期为 0）
export function calculateAge(birthDate: DateInput, referenceDate: DateInput = new Date()): number {
  const birth = toDate(birthDate)
  const ref = toDate(referenceDate)
  if (!birth || !ref || birth > ref) return 0

  let age = ref.getFullYear() - birth.getFullYear()
  const beforeBirthday =
    ref.getMonth() < birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() < birth.getDate())
  if (beforeBirthday) age -= 1
  return Math.max(age, 0)
}
