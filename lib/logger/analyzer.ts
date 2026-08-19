/**
 * @fileoverview YYC³ 日志分析器
 * @description 移植自 YYC3-AI-Growth-Companion lib/log-analyzer.ts，
 *   提供服务端日志文件分析、统计与告警规则。
 *   仅服务端使用。
 * @author YYC³
 * @version 1.0.0
 * @created 2026-08-19
 */

import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

interface LogEntry {
  timestamp: string
  level: string
  module?: string
  function?: string
  message: string
  data?: Record<string, unknown>
}

interface LogStats {
  totalEntries: number
  errorCount: number
  warnCount: number
  infoCount: number
  debugCount: number
  errorRate: number
  topErrors: Array<{ message: string; count: number }>
  topModules: Array<{ module: string; count: number }>
  timeRange: { start: string; end: string }
}

export interface AlertRule {
  name: string
  condition: (stats: LogStats) => boolean
  severity: "low" | "medium" | "high" | "critical"
  message: string
}

interface Alert {
  ruleName: string
  severity: string
  message: string
  timestamp: string
}

export class LogAnalyzer {
  private logDir: string
  private alertRules: AlertRule[] = []

  constructor(logDir: string = "logs") {
    this.logDir = logDir
    this.setupDefaultAlertRules()
  }

  private setupDefaultAlertRules(): void {
    this.alertRules = [
      {
        name: "高错误率告警",
        condition: (stats) => stats.errorRate > 0.1,
        severity: "critical",
        message: "错误率过高（>10%）",
      },
      {
        name: "错误数量告警",
        condition: (stats) => stats.errorCount > 50,
        severity: "high",
        message: "错误数量过多（>50）",
      },
      {
        name: "警告数量告警",
        condition: (stats) => stats.warnCount > 100,
        severity: "medium",
        message: "警告数量过多（>100）",
      },
      {
        name: "单错误重复告警",
        condition: (stats) => stats.topErrors[0]?.count > 10,
        severity: "high",
        message: "单个错误重复次数过多（>10）",
      },
    ]
  }

  addAlertRule(rule: AlertRule): void {
    this.alertRules.push(rule)
  }

  removeAlertRule(ruleName: string): void {
    this.alertRules = this.alertRules.filter((rule) => rule.name !== ruleName)
  }

  getAlertRules(): AlertRule[] {
    return [...this.alertRules]
  }

  private parseLogLine(line: string): LogEntry | null {
    const logRegex =
      /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}) \[(ERROR|WARN|INFO|DEBUG)\](?: \[([^\]]+)\])?(?: \[([^\]]+)\])? (.+)$/
    const match = line.match(logRegex)

    if (!match) return null

    const [, timestamp, level, module, func, rawMessage] = match
    let message = rawMessage
    let data: Record<string, unknown> | undefined

    // 解析行尾 JSON 数据
    const dataMatch = rawMessage.match(/^(.+) (\{.+\})$/s)
    if (dataMatch) {
      try {
        data = JSON.parse(dataMatch[2]) as Record<string, unknown>
        message = dataMatch[1]
      } catch {
        // JSON 解析失败保持原样
      }
    }

    return { timestamp, level, module, function: func, message, data }
  }

  /** 解析日志文件，返回统计信息 */
  analyzeLogs(filePaths?: string[]): LogStats {
    const entries: LogEntry[] = []
    const files = filePaths ?? this.getLogFiles()

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf8")
        for (const line of content.split("\n")) {
          const entry = this.parseLogLine(line)
          if (entry) entries.push(entry)
        }
      } catch {
        // 跳过无法读取的文件
      }
    }

    return this.computeStats(entries)
  }

  /** 从纯文本内容分析（供测试/内存日志使用，避免文件系统依赖） */
  analyzeText(text: string): LogStats {
    const entries: LogEntry[] = []
    for (const line of text.split("\n")) {
      const entry = this.parseLogLine(line)
      if (entry) entries.push(entry)
    }
    return this.computeStats(entries)
  }

  private computeStats(entries: LogEntry[]): LogStats {
    const errorCount = entries.filter((e) => e.level === "ERROR").length
    const warnCount = entries.filter((e) => e.level === "WARN").length
    const infoCount = entries.filter((e) => e.level === "INFO").length
    const debugCount = entries.filter((e) => e.level === "DEBUG").length

    // 错误消息 TopN
    const errorMap = new Map<string, number>()
    for (const e of entries.filter((x) => x.level === "ERROR")) {
      errorMap.set(e.message, (errorMap.get(e.message) ?? 0) + 1)
    }
    const topErrors = [...errorMap.entries()]
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 模块 TopN
    const moduleMap = new Map<string, number>()
    for (const e of entries) {
      const m = e.module || "unknown"
      moduleMap.set(m, (moduleMap.get(m) ?? 0) + 1)
    }
    const topModules = [...moduleMap.entries()]
      .map(([module, count]) => ({ module, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const timestamps = entries.map((e) => e.timestamp).sort()

    return {
      totalEntries: entries.length,
      errorCount,
      warnCount,
      infoCount,
      debugCount,
      errorRate: entries.length > 0 ? errorCount / entries.length : 0,
      topErrors,
      topModules,
      timeRange: {
        start: timestamps[0] ?? "",
        end: timestamps[timestamps.length - 1] ?? "",
      },
    }
  }

  /** 根据告警规则评估统计结果 */
  evaluateAlerts(stats: LogStats): Alert[] {
    return this.alertRules
      .filter((rule) => rule.condition(stats))
      .map((rule) => ({
        ruleName: rule.name,
        severity: rule.severity,
        message: rule.message,
        timestamp: new Date().toISOString(),
      }))
  }

  /** 列出日志目录中的日志文件 */
  getLogFiles(): string[] {
    try {
      return readdirSync(this.logDir)
        .filter((f) => f.endsWith(".log"))
        .map((f) => join(this.logDir, f))
        .filter((p) => {
          try {
            return statSync(p).isFile()
          } catch {
            return false
          }
        })
    } catch {
      return []
    }
  }
}

export default LogAnalyzer
