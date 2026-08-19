/**
 * Character System Type Definitions
 * 角色系统类型定义 - AI角色配置、主题、表情、性格、语音
 *
 * @module types/character
 * @version 1.0.0
 */

/** 生日信息（农历 + 公历） */
export interface BirthdayInfo {
  lunar: string;
  solar: string;
}

/** 主题色彩配置 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

/** 主题字号配置 */
export interface ThemeFontSize {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

/** 主题字重配置 */
export interface ThemeFontWeight {
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
}

/** 主题排版配置 */
export interface ThemeTypography {
  fontFamily: string;
  fontSize: ThemeFontSize;
  fontWeight: ThemeFontWeight;
}

/** 主题配置 */
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  typography: ThemeTypography;
}

/** 表情触发场景 */
export type ExpressionTrigger =
  | 'greeting'
  | 'celebration'
  | 'encouragement'
  | 'comfort'
  | 'thinking'
  | 'listening';

/** 表情配置 */
export interface ExpressionConfig {
  id: string;
  name: string;
  trigger: ExpressionTrigger;
  imagePath: string;
  description: string;
}

/** 性格特征分值 */
export interface PersonalityTraits {
  friendliness: number;
  curiosity: number;
  empathy: number;
  creativity: number;
  patience: number;
  playfulness: number;
}

/** 性格配置 */
export interface PersonalityConfig {
  traits: PersonalityTraits;
  description: string;
  preferences: string[];
  dislikes: string[];
}

/** 语音设置 */
export interface VoiceSettings {
  enabled: boolean;
  voiceId: string;
  pitch: number;
  speed: number;
  volume: number;
  language: string;
  accent: string;
}

/** 角色场景图片集 */
export interface CharacterImages {
  homePage: string;
  growthRecord: string;
  profileInfo: string;
  settings: string;
  aiAvatar: string;
  jointAvatar: string;
  additionalImages: string[];
}

/** 角色完整配置 */
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
