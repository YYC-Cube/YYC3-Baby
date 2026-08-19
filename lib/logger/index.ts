/**
 * @fileoverview YYC³ 日志体系统一入口
 * @description P0-2 Winston 日志体系融合：
 *   - server.ts：服务端 Winston 日志（文件轮转 + 控制台）
 *   - analyzer.ts：日志分析器（统计 + 告警规则）
 *   - lib/logger.ts（前端）：浏览器端 localStorage 日志
 */

// 服务端日志：Winston + 每日轮转
export * as server from "./server"
export { error, warn, info, debug, setContext, clearContext } from "./server"

// 日志分析器：统计 + 告警
export { LogAnalyzer, type AlertRule } from "./analyzer"
