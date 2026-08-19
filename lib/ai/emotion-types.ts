/**
 * YYC³ AI小语智能成长守护系统 - 情感类型定义（纯类型，零依赖）
 * 从 emotion-engine 抽出：客户端代码（Redux store 等）只需枚举/类型时
 * 必须从这里导入，避免经 emotion-engine 顶层加载 @tensorflow/tfjs 进入客户端包。
 */

// 情感类型定义
export enum InfantEmotionType {
  HAPPINESS = 'happiness',      // 快乐
  SADNESS = 'sadness',          // 悲伤
  FEAR = 'fear',               // 恐惧
  ANGER = 'anger',             // 愤怒
  SURPRISE = 'surprise',       // 惊讶
  DISGUST = 'disgust',         // 厌恶
  CURIOSITY = 'curiosity',     // 好奇
  COMFORT = 'comfort',         // 舒适
  HUNGER = 'hunger',           // 饥饿
  DISCOMFORT = 'discomfort',   // 不适
  PAIN = 'pain',               // 疼痛
  ATTENTION = 'attention',     // 需要关注
  NEUTRAL = 'neutral'          // 中性
}

// 年龄段定义
export { InfantEmotionType as EmotionType }

export enum AgeGroup {
  INFANT = 'infant',           // 0-1岁
  TODDLER = 'toddler',         // 1-2岁
  PRESCHOOLER = 'preschooler'   // 2-3岁
}

// 情感分析结果
export interface EmotionResult {
  primary: InfantEmotionType
  secondary?: InfantEmotionType
  confidence: number           // 0-1
  intensity: number            // 0-1
  ageGroup: AgeGroup
  timestamp: Date
  context?: string
}

// 文本情感分析结果
export interface TextEmotionResult {
  emotion: InfantEmotionType
  confidence: number
  keywords: string[]
  sentiment: number           // -1 到 1
  ageAppropriate: boolean
}

// 语音情感分析结果
export interface VoiceEmotionResult {
  emotion: InfantEmotionType
  confidence: number
  cryType?: CryType
  toneQuality: ToneQuality
  volume: number
  clarity: number
  ageAppropriate: boolean
}

// 哭声类型
export enum CryType {
  HUNGER = 'hunger',
  DISCOMFORT = 'discomfort',
  ATTENTION = 'attention',
  PAIN = 'pain',
  SLEEPY = 'sleepy',
  COLIC = 'colic'
}

// 音调质量
export interface ToneQuality {
  pitch: number
  tempo: number
  rhythm: string
  intensity: number
}

// 多模态输入数据
export interface MultiModalInput {
  text?: string
  audio?: ArrayBuffer
  video?: ArrayBuffer
  context?: {
    age: number
    timeOfDay: string
    recentActivities: string[]
    environment: string
  }
}

// 情感记忆数据
export interface EmotionalMemory {
  id: string
  childId: string
  emotion: InfantEmotionType
  intensity: number
  triggers: string[]
  context: string
  frequency: number
  lastOccurrence: Date
  patterns: EmotionalPattern[]
}

// 情感模式
export interface EmotionalPattern {
  trigger: string
  response: InfantEmotionType
  frequency: number
  effectiveness: number
  ageRelevance: number
}

// 年龄段情感特征
export interface AgeGroupCharacteristics {
  primaryEmotions: InfantEmotionType[]
  communication: 'cry-based' | 'word-based' | 'sentence-based' | 'mixed'
  complexity: 'low' | 'medium' | 'high'
  contextDependency: 'low' | 'medium' | 'high'
}

// 多模态情感分析结果
export interface MultiModalEmotionResult {
  type: 'text' | 'audio' | 'video'
  emotion: InfantEmotionType
  confidence: number
  sentiment?: number
  keywords?: string[]
  cryType?: CryType
  toneQuality?: ToneQuality
  volume?: number
  clarity?: number
  ageAppropriate?: boolean
}

// 音频特征
export interface AudioFeatures {
  volume: number
  clarity: number
  pitch: number
  tempo: number
  [key: string]: unknown
}

// 加权情感结果
export interface WeightedEmotion {
  emotion: InfantEmotionType
  weight: number
  intensity: number
  secondary?: InfantEmotionType
}

// 主要情感结果
export interface PrimaryEmotionResult {
  emotion: InfantEmotionType
  intensity: number
  secondary?: InfantEmotionType
}

// 嵌入向量
export interface EmbeddingVector {
  arraySync(): number[]
  shape: number[]
  [key: string]: unknown
}

// 音频缓冲区
export interface DecodedAudioBuffer {
  duration: number
  sampleRate: number
  numberOfChannels: number
  length: number
  getChannelData(channel: number): Float32Array
  [key: string]: unknown
}
