/**
 * Common / Shared Type Definitions
 * 通用类型定义 - 跨模块复用的基础类型
 *
 * @module types/common
 * @version 1.0.0
 */

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

/** 分页参数 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/** 分页响应 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** 时间戳实体基类 */
export interface TimestampedEntity {
  createdAt: string;
  updatedAt: string;
}

/** 通用排序方向 */
export type SortDirection = 'asc' | 'desc';

/** 通用操作状态 */
export type OperationStatus = 'idle' | 'loading' | 'success' | 'error';

/** 通用难度级别 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** 通用趋势方向 */
export type TrendDirection = 'up' | 'down' | 'stable';

/** 通用消息级别 */
export type MessageLevel = 'info' | 'success' | 'warning' | 'error';
