/**
 * @fileoverview 数据域类型（客户端/服务端共用的领域形状）
 * @description 原 lib/db/client.ts（localStorage mock 层）的类型定义。
 *   mock 层已于 2026-08 数据统一迁移中移除，类型归位于此供两端共用。
 */

// 儿童档案类型
export interface Child {
  id: string
  user_id: string
  name: string
  nickname?: string
  birth_date: string
  gender: "male" | "female" | "other"
  avatar_url?: string
  current_stage?: string
  created_at: string
  updated_at?: string
}

// 成长记录类型
export interface GrowthRecord {
  id: string
  child_id: string
  type: "milestone" | "observation" | "emotion" | "learning"
  title: string
  content: string
  media_urls: string[]
  tags: string[]
  emotion?: string
  ai_analysis?: string
  recorded_at: string
  created_at: string
}

// 评估记录类型
export interface Assessment {
  id: string
  child_id: string
  stage_id: string
  dimensions: AssessmentDimension[]
  overall_score: number
  ai_summary: string
  recommendations: string[]
  created_at: string
}

export interface AssessmentDimension {
  id: string
  name: string
  score: number
  max_score: number
  level: "优秀" | "良好" | "一般" | "需关注"
}

// 里程碑记录类型
export interface Milestone {
  id: string
  child_id: string
  milestone_type: string
  title: string
  description?: string
  achieved_at: string
  celebration_data?: {
    shared: boolean
    reactions: number
  }
  created_at: string
}
