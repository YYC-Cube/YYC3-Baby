/**
 * Type Definitions - Central Hub
 * 小语AI应用 - 类型定义统一入口
 *
 * 核心类型直接定义于此文件，确保稳定性。
 * 专用模块类型通过 re-export 引入。
 *
 * @module types
 * @version 2.0.0
 */

// ═══════════════════════════════════════════════════════════════
//  通用基础类型
// ═══════════════════════════════════════════════════════════════

/** 统一的带字段信息的验证消息 */
export interface ValidationMessage {
  field: string;
  message: string;
  code?: string;
}

/** 通用验证结果 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationMessage[];
  warnings: ValidationMessage[];
  suggestions: ValidationMessage[];
}

/** 通用操作状态 */
export type OperationStatus = 'idle' | 'loading' | 'success' | 'error';

/** 通用消息级别 */
export type MessageLevel = 'info' | 'success' | 'warning' | 'error';

/** 通用难度级别 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** 通用趋势方向 */
export type TrendDirection = 'up' | 'down' | 'stable';

// ═══════════════════════════════════════════════════════════════
//  用户类型
// ═══════════════════════════════════════════════════════════════

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  growthStage: string;
}

export interface UserData {
  id: string;
  name: string;
  age: number;
  avatar: string;
  growthStage: string;
}

export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthday?: Date;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════
//  角色系统类型
// ═══════════════════════════════════════════════════════════════

export interface BirthdayInfo {
  lunar: string;
  solar: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

export type ExpressionTrigger =
  | 'greeting'
  | 'celebration'
  | 'encouragement'
  | 'comfort'
  | 'thinking'
  | 'listening';

export interface ExpressionConfig {
  id: string;
  name: string;
  trigger: ExpressionTrigger;
  imagePath: string;
  description: string;
}

export interface PersonalityConfig {
  traits: {
    friendliness: number;
    curiosity: number;
    empathy: number;
    creativity: number;
    patience: number;
    playfulness: number;
    [key: string]: number;
  };
  description: string;
  preferences: string[];
  dislikes: string[];
}

export interface VoiceSettings {
  enabled: boolean;
  voiceId: string;
  pitch: number;
  speed: number;
  volume: number;
  language: string;
  accent: string;
}

export interface CharacterImages {
  homePage: string;
  growthRecord: string;
  profileInfo: string;
  settings: string;
  aiAvatar: string;
  jointAvatar: string;
  additionalImages: string[];
}

export interface CharacterConfig {
  id: string;
  name: string;
  defaultName: string;
  gender: 'male' | 'female';
  age: number;
  birthday?: BirthdayInfo;
  zodiac?: string;
  themes: ThemeConfig[];
  currentTheme?: string;
  expressions: ExpressionConfig[];
  personality: PersonalityConfig;
  voiceSettings: VoiceSettings;
  avatarPath: string;
  images: CharacterImages;
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════
//  成长核心类型
// ═══════════════════════════════════════════════════════════════

export interface GrowthItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

export interface GrowthDimension {
  name: string;
  progress: number;
  items: GrowthItem[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  earnedDate: string;
}

export interface GrowthRecord {
  id: string;
  age: number;
  stage: string;
  dimensions: GrowthDimension[];
  achievements: Achievement[];
  lastUpdated: string;
}

// ═══════════════════════════════════════════════════════════════
//  文化条目类型
// ═══════════════════════════════════════════════════════════════

export interface CultureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
}

// ═══════════════════════════════════════════════════════════════
//  学习模块类型
// ═══════════════════════════════════════════════════════════════

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  locked: boolean;
}

export interface LearningProgressData {
  subject: string;
  progress: number;
  lessons: Lesson[];
  currentLesson?: Lesson;
}

export interface Recommendation {
  id: string;
  type: 'content' | 'action' | 'question';
  title: string;
  description: string;
  image?: string;
}

// ═══════════════════════════════════════════════════════════════
//  AI / 聊天类型
// ═══════════════════════════════════════════════════════════════

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'voice' | 'image';
}

// ═══════════════════════════════════════════════════════════════
//  通知类型
// ═══════════════════════════════════════════════════════════════

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// ═══════════════════════════════════════════════════════════════
//  导航类型
// ═══════════════════════════════════════════════════════════════

export interface NavigationData {
  cultureId?: string;
  [key: string]: unknown;
}

// ═══════════════════════════════════════════════════════════════
//  Re-exports: 专用模块类型
// ═══════════════════════════════════════════════════════════════

// 成长树类型
export type {
  GrowthNode,
  GrowthContent,
  Attachment,
  Milestone,
  Evidence,
  CulturalElement,
  GrowthMetadata,
  AIAnalysis,
  Insight,
  GrowthRecommendation,
  Pattern,
  Prediction,
  GrowthTimeline,
  GrowthStatistics,
  AIAssistantConfig,
} from './growth';

// 沫语成长守护体系类型
export { GrowthStage } from './growth-system';

export type {
  DevelopmentDimension,
  RoleType,
  GrowthCulturalElement,
  AgeStageConfig,
  MilestoneRecord,
  GrowthSystemRecord,
  DimensionProgress,
  DimensionItem,
  AIAnalysisResult,
  GrowthTrendPrediction,
  CulturalSuggestion,
  SystemConfig,
  AnnualSummary,
  HealthRecord,
  CulturalExperience,
  RoleRecord,
  SystemHealth,
  SystemReport,
} from './growth-system';

// 勋章系统类型
export type {
  Badge,
  BadgeSeries,
  BadgeLevel,
  BadgeCategory,
  BadgeRarity,
  UnlockCondition,
  ConditionType,
  ShareContent,
  BadgeMetadata,
  SeriesProgress,
  SeriesMilestone,
  BadgeReward,
  BadgeGroup,
  BadgeStats,
} from './badge';

// 文化探索类型
export type {
  CultureType,
  InteractiveElement,
  KnowledgePoint,
  CultureMultimedia,
  CultureContent,
  CultureCategory,
  CultureProgress,
} from './culture';

// 活动/任务类型
export type {
  Activity,
  ActivityType,
  ActivityStatus,
  Participant,
  Reward,
  Requirement,
  ActivityFilter,
  ActivityStats,
} from './activity';
