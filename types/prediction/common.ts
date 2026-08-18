/**
 * @file 预测系统通用类型定义
 * @description 定义预测结果、质量指标、偏见报告等核心类型
 * @module types/prediction
 * @author YYC³
 * @version 1.0.0
 * @created 2025-12-29
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

/**
 * 预测结果
 */
export interface PredictionResult {
  id: string
  prediction: number | number[]
  confidence: number
  timestamp: number
  metadata?: Record<string, unknown>
  horizon?: number
  modelId?: string
  methodology?: string
  explanation?: string
  confidenceInterval?: Array<{ lower: number; upper: number }>
}

/**
 * 质量指标
 */
export interface QualityMetrics {
  timestamp?: number
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  rmse: number
  mae: number
  r2Score: number
  customMetrics?: Record<string, unknown>
}

/**
 * 偏见报告
 */
export interface BiasReport {
  overall: 'low' | 'medium' | 'high'
  metrics: {
    demographicParity: number
    disparateImpact: number
    equalOpportunity: number
  }
  recommendations: string[]
  affectedGroups: string[]
  mitigation: string[]
}

/**
 * 敏感数据
 */
export interface SensitiveData {
  groups?: Record<string, number[]>
  attributes?: Record<string, unknown[]>
  labels?: string[]
}

/**
 * 校准结果
 */
export interface CalibrationResult {
  originalMetrics: {
    avgConfidence: number
    confidenceVariance: number
    calibrationError: number
    overconfidentRatio: number
  }
  calibratedMetrics: {
    avgConfidence: number
    confidenceVariance: number
    calibrationError: number
    overconfidentRatio: number
  }
  reliabilityDiagram: Array<{
    confidence: number
    empiricalAccuracy: number
    count: number
  }>
  calibrationCurve: Array<{
    predicted: number
    actual: number
    count: number
  }>
  improvement: number
  recommendedMethod: string
}

/**
 * 预测数据点
 */
export interface PredictionDataPoint {
  timestamp: number
  value: number
  features?: Record<string, unknown>
}

/**
 * 预测数据
 */
export interface PredictionData {
  data: PredictionDataPoint[]
  dataType: 'timeseries' | 'tabular' | 'sequential'
  features?: string[]
  target?: string
  frequency?: string
}

/**
 * 预测配置
 */
export interface PredictionConfig {
  name: string
  algorithm: string
  parameters: Record<string, unknown>
  priority?: string
  requirements?: Partial<PredictionTask['requirements']>
  preprocessing?: {
    normalize: boolean
    handleMissing: 'interpolate' | 'mean' | 'median' | 'drop'
    featureEngineering: boolean
    outlierRemoval: boolean
  }
  validation?: {
    method: string
    folds: number
    testSize: number
  }
  constraints?: {
    maxTrainingTime?: number
    memoryLimit?: number
    accuracyThreshold?: number
    realTimeCapability?: boolean
    maxModels?: number
  }
}

/**
 * 预测任务
 */
export interface PredictionTask {
  id: string
  name?: string
  type: 'regression' | 'classification' | 'forecasting' | 'anomaly_detection'
  description?: string
  priority?: 'low' | 'medium' | 'high'
  constraints?: {
    maxTrainingTime?: number
    memoryLimit?: number
    accuracyThreshold?: number
    realTimeCapability?: boolean
    maxModels?: number
  }
  requirements?: {
    accuracy?: 'high' | 'medium' | 'low'
    speed?: 'high' | 'medium' | 'low'
    interpretability?: 'high' | 'medium' | 'low'
    scalability?: 'high' | 'medium' | 'low'
  }
}

/**
 * 预测洞察
 */
export interface PredictionInsights {
  summary: string
  keyPoints: Array<{
    type: string
    description: string
    severity: string
    confidence?: number
    actionability?: string
  }>
  performanceMetrics: {
    accuracy: number
    confidence: number
    stability: number
    avgLatency: number
    predictionCount?: number
  }
  driftAlerts: DriftAlert[]
  recommendations: Array<{
    category: string
    priority: string
    description: string
    expectedImpact: string
    effort: string
  }>
  riskAssessment: {
    overall: 'low' | 'medium' | 'high'
    factors: Array<{
      type: string
      severity: string
      description: string
      impact: string
    }>
    mitigation: string[]
    monitoring: string[]
  }
  confidence: number
}

/**
 * 流式预测
 */
export interface StreamingPrediction {
  timestamp: number
  prediction: number
  confidence: number
  processingTime: number
  dataQuality?: DataQualityMetrics
  modelVersion: string
}

/**
 * 数据流
 */
export interface DataStream {
  data: PredictionDataPoint[]
  qualityMetrics?: Record<string, unknown>
  metadata?: Record<string, unknown>
}

/**
 * 模型选择
 */
export interface ModelSelection {
  selectedModel: string
  alternativeModels: string[]
  confidence: number
  reasoning?: string
}

/**
 * 任务信息
 */
export interface TaskInfo {
  ensemble?: {
    predict: (data: PredictionData, horizon?: number) => Promise<PredictionResult>
    train: (data: PredictionData) => Promise<unknown>
    getModelInfo: () => { modelId: string }
    detectConceptDrift?: (data: PredictionData) => Promise<{ detected: boolean; driftType: string } | undefined>
  }
  predictor?: {
    predict: (data: PredictionData, horizon?: number) => Promise<PredictionResult>
    train: (data: PredictionData) => Promise<unknown>
    getModelInfo: () => { modelId: string }
  }
  config: PredictionConfig | Record<string, unknown>
  data?: PredictionData
  modelSelection?: ModelSelection
  createdAt: number
  lastUpdated?: number
}

/**
 * 预测器
 */
export interface Predictor {
  predict: (data: PredictionData, horizon?: number) => Promise<PredictionResult>
  train: (data: PredictionData) => Promise<unknown>
  getModelInfo: () => { modelId: string; algorithm?: string; isTrained?: boolean }
}

/**
 * 性能指标
 */
export interface PerformanceMetrics {
  accuracy: number
  confidence: number
  stability: number
  avgLatency: number
  predictionCount?: number
}

/**
 * 推荐
 */
export interface Recommendation {
  category: string
  priority: string
  description: string
  expectedImpact: string
  effort: string
}

/**
 * 风险评估
 */
export interface RiskAssessment {
  overall: 'low' | 'medium' | 'high'
  factors: Array<{
    type: string
    severity: string
    description: string
    impact: string
  }>
  mitigation: string[]
  monitoring: string[]
}

/**
 * 关键洞察
 */
export interface KeyInsight {
  type: string
  description: string
  severity: string
  confidence?: number
  actionability?: string
}

/**
 * 模型拟合评估
 */
export interface ModelFitAssessment {
  modelId?: string
  goodnessOfFit: number
  residualAnalysis: ResidualAnalysis
  stabilityMetrics: StabilityMetrics
  biasVarianceTradeoff: BiasVarianceTradeoff
  recommendations: string[]
}

/**
 * 稳定性指标
 */
export interface StabilityMetrics {
  parameterStability: number
  predictionStability: number
  temporalStability: number
  sensitivity: {
    noise: number
    complexity: number
  }
}

/**
 * 偏差方差权衡
 */
export interface BiasVarianceTradeoff {
  bias: number
  variance: number
  irreducibleError: number
  totalError: number
  decomposition: string
}

/**
 * 残差分析
 */
export interface ResidualAnalysis {
  meanError: number
  stdError: number
  skewness: number
  kurtosis: number
  autocorrelation: number
  heteroscedasticity: boolean
}

/**
 * 模型约束
 */
export interface ModelConstraints {
  maxTrainingTime?: number
  memoryLimit?: number
  accuracyThreshold?: number
  maxModels?: number
  minAccuracy?: number
  maxLatency?: number
  realTimeCapability?: boolean
}

/**
 * 模型选择
 */
export interface ModelSelection {
  selectedModel: string
  alternativeModels: string[]
  selectionReason: string
  expectedPerformance: number
  confidence: number
  fittingTime: number
}


// ===== 专项预测引擎所需类型（按 specialized-engines/adaptive-ensemble 用法推导） =====

export type DataPoint = PredictionDataPoint
export type PredictorConfig = PredictionConfig

// 训练结果
export interface TrainingResult {
  modelId: string
  algorithm: string
  parameters: Record<string, unknown>
  trainingTime: number
  trainingScore: number
  validationScore: number
  featureImportance?: Record<string, number>
  trainingMetrics: Record<string, number>
  timestamp: number
}

// 季节性分析
export interface SeasonalityAnalysis {
  detected: boolean
  period: number
  strength: number
  type: string
  confidence: number
}

// 概率预测（含不确定性）
export interface ProbabilisticForecast {
  pointForecast: number[]
  uncertainty: number[]
  predictionIntervals: Array<{ lower: number; upper: number }>
  distribution: string
  confidence: number
}

// 异常点
export interface Anomaly {
  index: number
  timestamp: number
  value: number
  score: number
  type: string
  severity: string | number
}

// 异常检测报告
export interface AnomalyReport {
  anomalies: Anomaly[]
  totalCount: number
  severity: number
  detectionMethod: string
  confidence: number
  timestamp: number
}

// 异常解释
export interface AnomalyExplanation {
  anomalyIndex: number
  explanation: string
  contributingFactors: string[]
  recommendedAction: string
  context: Record<string, unknown>
}

// 因果图
export interface CausalGraphEdge {
  from: string
  to: string
  weight: number
  direction: string
  confidence: number
}

export interface CausalGraph {
  nodes: string[]
  edges: CausalGraphEdge[]
  directionality: string
  confidence: number
  methodology: string
  timestamp: number
}

// 干预模拟
export interface Intervention {
  type: string
  baselineValue?: number
  magnitude?: number
  targetFeature?: string
}

export interface CounterfactualResult {
  intervention: string
  baseline: number
  counterfactual: number
  effectSize: number
  confidence: number
  methodology: string
  assumptions: string[]
}

// 自适应集成相关
export interface PerformanceHistory {
  timestamp: number
  accuracy?: number
  latency?: number
  score?: number
  errorRate?: number
  [key: string]: unknown
}

export interface DataDriftMetrics {
  isDrifted: boolean
  driftScore: number
  severity?: string
  featureDrift?: Record<string, number>
  detectionMethod?: string
  timestamp?: number
}

export interface DriftDetection {
  detected: boolean
  driftType: string
  driftMagnitude: number
  pValue?: number
  detectionMethod?: string
  confidenceInterval?: number[]
  severity?: string
  metrics?: DataDriftMetrics
  timestamp?: number
}

// 集成权重自适应结果
export interface UpdatedWeights {
  weights: number[]
  adaptationReason: string
  performanceGain: number
  timestamp: number
}


// 数据质量指标（监控面板用）
export interface DataQualityMetrics {
  overallScore: number
  completeness: number
  validity: number
  consistency: number
  timeliness: number
  anomalyCount?: number
  missingPatterns?: Record<string, number>
}

// 漂移告警
export interface DriftAlert {
  id: string
  type: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  message?: string
  description: string
  timestamp: number
  metrics?: DataDriftMetrics
}
