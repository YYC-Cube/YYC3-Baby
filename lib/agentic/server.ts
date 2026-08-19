/**
 * @fileoverview AgenticCore 服务端单例（仅服务端）
 * @description 自治核心引擎及其 prediction 服务栈只在服务端实例化，
 *   客户端经 /api/agentic HTTP 调用，避免 1.4k 行引擎进浏览器包。
 */

import AgenticCore from "../../core/AgenticCore"

let instance: AgenticCore | null = null

export function getAgenticCore(): AgenticCore {
  if (!instance) {
    instance = new AgenticCore({
      maxConcurrentTasks: 5,
      learningEnabled: true,
      autoOptimization: true,
      privacyMode: "normal",
    })
    // 服务端只记录事件日志；任务进度由客户端轮询 /api/agentic 状态获取
    instance.on("error", (error: Error) => {
      console.error("[agentic] 引擎错误:", error.message)
    })
    console.log("✅ AgenticCore 服务端实例已初始化")
  }
  return instance
}
