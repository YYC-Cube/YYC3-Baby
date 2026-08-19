/**
 * @fileoverview 日志体系单元测试（P0-2 Winston 日志体系融合）
 * @description 测试 LogAnalyzer 的纯文本解析/统计/告警逻辑（不依赖文件系统），
 *   以及服务端 logger 的基本 API 形状。
 */

import { describe, it, expect } from "bun:test"
import { LogAnalyzer } from "@/lib/logger/analyzer"

// 构造符合服务端格式的日志文本（winston customFormat 输出）
function sampleLogs(): string {
  return [
    "2026-08-19 10:00:00.001 [INFO] [auth] [login] 登录成功 {\"userId\":\"u1\"}",
    "2026-08-19 10:00:01.002 [ERROR] [auth] [login] 登录失败",
    "2026-08-19 10:00:02.003 [WARN] [db] 查询超时",
    "2026-08-19 10:00:03.004 [DEBUG] [api] 调试信息",
    "2026-08-19 10:00:04.005 [ERROR] [db] 数据库连接失败 {\"code\":\"ECONNREFUSED\"}",
    "2026-08-19 10:00:05.006 [ERROR] [db] 数据库连接失败 {\"code\":\"ECONNREFUSED\"}",
    "2026-08-19 10:00:06.007 [INFO] [api] 正常响应",
  ].join("\n")
}

describe("LogAnalyzer 文本解析与统计", () => {
  it("正确解析各等级日志并统计", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText(sampleLogs())

    expect(stats.totalEntries).toBe(7)
    expect(stats.errorCount).toBe(3)
    expect(stats.warnCount).toBe(1)
    expect(stats.infoCount).toBe(2)
    expect(stats.debugCount).toBe(1)
    expect(stats.errorRate).toBeCloseTo(3 / 7, 5)
  })

  it("错误消息 TopN 按出现次数排序", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText(sampleLogs())

    expect(stats.topErrors[0]).toEqual({ message: "数据库连接失败", count: 2 })
    expect(stats.topErrors[1].count).toBe(1)
  })

  it("模块 TopN 统计", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText(sampleLogs())

    expect(stats.topModules[0].module).toBe("db")
    expect(stats.topModules[0].count).toBe(3)
  })

  it("时间范围正确", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText(sampleLogs())

    expect(stats.timeRange.start).toContain("2026-08-19 10:00:00")
    expect(stats.timeRange.end).toContain("2026-08-19 10:00:06")
  })

  it("无法解析的行被忽略", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText("这是一行非日志文本\n2026-08-19 10:00:00.001 [INFO] 正常日志")
    expect(stats.totalEntries).toBe(1)
  })
})

describe("LogAnalyzer 告警规则", () => {
  it("高错误率触发 critical 告警", () => {
    const analyzer = new LogAnalyzer()
    const text = Array.from({ length: 20 }, (_, i) =>
      `2026-08-19 10:00:${String(i).padStart(2, "0")}.000 [ERROR] [api] 错误${i}`
    ).join("\n")
    const stats = analyzer.analyzeText(text) // 20 条全 error，errorRate=1.0
    const alerts = analyzer.evaluateAlerts(stats)

    expect(alerts.some((a) => a.ruleName === "高错误率告警" && a.severity === "critical")).toBeTrue()
  })

  it("错误数超过 50 触发告警", () => {
    const analyzer = new LogAnalyzer()
    const text = Array.from({ length: 60 }, (_, i) =>
      `2026-08-19 10:00:${String(i).padStart(2, "0")}.000 [ERROR] [api] 错误${i}`
    ).join("\n")
    const stats = analyzer.analyzeText(text)
    const alerts = analyzer.evaluateAlerts(stats)

    expect(alerts.some((a) => a.ruleName === "错误数量告警")).toBeTrue()
  })

  it("低负载日志不触发告警", () => {
    const analyzer = new LogAnalyzer()
    const stats = analyzer.analyzeText("2026-08-19 10:00:00.000 [INFO] 正常")
    expect(analyzer.evaluateAlerts(stats)).toHaveLength(0)
  })

  it("支持自定义告警规则", () => {
    const analyzer = new LogAnalyzer()
    analyzer.addAlertRule({
      name: "自定义告警",
      condition: (s) => s.totalEntries > 100,
      severity: "medium",
      message: "日志量异常",
    })
    const stats = analyzer.analyzeText(
      Array.from({ length: 120 }, () => "2026-08-19 10:00:00.000 [INFO] 正常").join("\n")
    )
    expect(analyzer.evaluateAlerts(stats).some((a) => a.ruleName === "自定义告警")).toBeTrue()
  })
})

describe("日志目录扫描", () => {
  it("不存在的目录返回空列表（不抛错）", () => {
    const analyzer = new LogAnalyzer("/tmp/yyc3-nonexistent-log-dir-xyz")
    expect(analyzer.getLogFiles()).toHaveLength(0)
    expect(analyzer.analyzeLogs()).toMatchObject({
      totalEntries: 0,
      errorCount: 0,
      errorRate: 0,
    })
  })
})
