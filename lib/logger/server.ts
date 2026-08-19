/**
 * @fileoverview YYC³ 服务端日志模块（Winston + 每日轮转）
 * @description 移植自 YYC3-AI-Growth-Companion lib/winston-logger.ts，
 *   提供服务端分级日志、文件轮转、格式化输出与上下文管理。
 *   仅服务端使用（引用 node:fs / node:path / winston），浏览器端请用 lib/logger.ts。
 * @author YYC³
 * @version 2.0.0
 * @created 2026-08-19
 */

import { mkdirSync } from "node:fs"
import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

export type LogLevel = "error" | "warn" | "info" | "debug"

export interface LogContext {
  module?: string
  function?: string
  userId?: string
  sessionId?: string
  requestId?: string
  [key: string]: unknown
}

const isDevelopment = process.env.NODE_ENV === "development"
const isTest = process.env.NODE_ENV === "test"
const isServer = typeof window === "undefined"

const logDir = process.env.LOG_DIR || "logs"

// 确保日志目录存在（服务端文件轮转需要）
if (isServer) {
  try {
    mkdirSync(logDir, { recursive: true })
  } catch {
    // 目录创建失败不阻塞日志系统
  }
}

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    // TransformableInfo 的具名键为 unknown，收敛为可打印的字符串形态
    const { timestamp, level, message, module, function: func, ...metadata } = info as {
      timestamp?: string
      level?: string
      message?: unknown
      module?: string
      function?: string
      [k: string]: unknown
    }
    const ts = String(timestamp)
    let msg = `${ts} [${String(level).toUpperCase()}]`

    if (module) msg += ` [${String(module)}]`
    if (func) msg += ` [${String(func)}]`

    msg += ` ${String(message)}`

    const keys = Object.keys(metadata)
    if (keys.length > 0) {
      const sanitized: Record<string, unknown> = {}
      for (const k of keys) {
        // 避免序列化循环引用导致日志崩溃
        try {
          JSON.stringify(metadata[k])
          sanitized[k] = metadata[k]
        } catch {
          sanitized[k] = String(metadata[k])
        }
      }
      if (Object.keys(sanitized).length > 0) {
        msg += ` ${JSON.stringify(sanitized)}`
      }
    }

    return msg
  })
)

const consoleTransport = new winston.transports.Console({
  level: isDevelopment ? "debug" : "info",
  format: winston.format.combine(winston.format.colorize(), customFormat),
})

const transports: winston.transport[] = [consoleTransport]

if (isServer && !isTest) {
  transports.push(
    new DailyRotateFile({
      filename: `${logDir}/error-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "30d",
      format: customFormat,
    }),
    new DailyRotateFile({
      filename: `${logDir}/combined-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: customFormat,
    })
  )
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  format: customFormat,
  transports,
  exitOnError: false,
})

class ServerLogger {
  private context: LogContext = {}

  setContext(context: Partial<LogContext>): void {
    this.context = { ...this.context, ...context }
  }

  clearContext(): void {
    this.context = {}
  }

  private log(level: LogLevel, message: string, data?: unknown, context?: LogContext): void {
    const mergedContext = { ...this.context, ...context }
    logger.log({
      level,
      message,
      ...mergedContext,
      ...(data !== undefined ? { data } : {}),
    })
  }

  error(message: string, data?: unknown, context?: LogContext): void {
    this.log("error", message, data, context)
  }

  warn(message: string, data?: unknown, context?: LogContext): void {
    this.log("warn", message, data, context)
  }

  info(message: string, data?: unknown, context?: LogContext): void {
    this.log("info", message, data, context)
  }

  debug(message: string, data?: unknown, context?: LogContext): void {
    this.log("debug", message, data, context)
  }
}

const serverLogger = new ServerLogger()

export const error = (message: string, data?: unknown, context?: LogContext) => { serverLogger.error(message, data, context); }

export const warn = (message: string, data?: unknown, context?: LogContext) => { serverLogger.warn(message, data, context); }

export const info = (message: string, data?: unknown, context?: LogContext) => { serverLogger.info(message, data, context); }

export const debug = (message: string, data?: unknown, context?: LogContext) => { serverLogger.debug(message, data, context); }

export const setContext = (context: Partial<LogContext>) => { serverLogger.setContext(context); }

export const clearContext = () => { serverLogger.clearContext(); }

export default serverLogger
