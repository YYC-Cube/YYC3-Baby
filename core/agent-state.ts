/**
 * @fileoverview AgentState 枚举独立模块（纯值，零依赖）
 * @description 客户端组件（IntelligentAIWidget 等）需要 AgentState 做运行时比较，
 *   从 AgenticCore.ts 导入会把 services/prediction 整栈打进客户端包，故抽出。
 */

export enum AgentState {
  IDLE = 'idle',
  PLANNING = 'planning',
  EXECUTING = 'executing',
  REFLECTING = 'reflecting',
  LEARNING = 'learning',
  ERROR = 'error'
}
