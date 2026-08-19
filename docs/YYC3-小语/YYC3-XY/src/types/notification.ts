/**
 * Notification Type Definitions
 * 通知系统类型定义
 *
 * @module types/notification
 * @version 1.0.0
 */

/** 应用内通知 */
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
