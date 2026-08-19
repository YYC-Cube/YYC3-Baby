/**
 * YYC³ 小语AI基础预测器（富基类）
 * 为专项预测引擎（时序/异常/因果）与自适应集成提供统一基座：
 * 配置、模型标识、训练状态、特征工程与数据预处理
 */

// 预测器接口方法按异步 API 契约保留 async 签名，内部为同步模拟实现，
// 属既有设计，定向豁免 require-await。
/* eslint-disable @typescript-eslint/require-await */

import type {
  PredictionConfig,
  PredictionData,
  PredictionResult,
  TrainingResult,
} from "@/types/prediction/common"

export interface FeatureSet {
  names: string[]
  importance: Record<string, number>
}

export abstract class BasePredictor {
  protected readonly config: PredictionConfig
  protected readonly modelId: string
  protected isTrained = false
  protected trainingHistory: TrainingResult[] = []
  protected featureSet: FeatureSet | null = null

  constructor(config: PredictionConfig) {
    this.config = config
    this.modelId = `predictor-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  }

  // —— 子类必须实现的核心接口 ——

  abstract train(data: PredictionData): Promise<TrainingResult>

  abstract predict(data: PredictionData, horizon?: number): Promise<PredictionResult>

  abstract evaluate(testData: PredictionData): Promise<Record<string, number>>

  // 超参搜索钩子（子类按需覆写）
  protected createInstance(_config: PredictionConfig): BasePredictor {
    throw new Error("子类未实现 createInstance")
  }

  protected getSearchSpace(): Record<string, unknown> {
    return {}
  }

  // —— 通用能力 ——

  protected async extractFeatures(data: PredictionData): Promise<FeatureSet> {
    const names = data.features ?? Object.keys(data.data[0]?.features ?? {})
    const even = names.length > 0 ? 1 / names.length : 0
    const importance: Record<string, number> = {}
    for (const n of names) importance[n] = even
    return { names, importance }
  }

  getModelInfo(): { modelId: string; algorithm: string; isTrained: boolean } {
    return { modelId: this.modelId, algorithm: this.config.algorithm, isTrained: this.isTrained }
  }

  // 过滤空值并保持 PredictionData 结构
  protected preprocessData(data: PredictionData): PredictionData {
    const cleaned = data.data.filter(
      (p) => p && typeof p.value === "number" && Number.isFinite(p.value)
    )
    return { ...data, data: cleaned.length > 0 ? cleaned : data.data }
  }

  protected generatePredictionId(): string {
    return `pred-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  }

  async saveModel(_path: string): Promise<void> {
    // 轻量实现：引擎为内存模型，序列化留待持久化层统一处理
  }

  async loadModel(_path: string): Promise<void> {
    // 同上
  }

  // —— 统计工具 ——

  protected calculateMean(values: number[]): number {
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
  }

  protected calculateMedian(values: number[]): number {
    if (!values.length) return 0
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  }

  protected calculateStandardDeviation(values: number[]): number {
    if (values.length < 2) return 0
    const mean = this.calculateMean(values)
    const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (values.length - 1)
    return Math.sqrt(variance)
  }
}
