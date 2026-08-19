/**
 * AI System Type Definitions
 * AI 系统类型定义 - 聊天消息、交互事件
 *
 * @module types/ai
 * @version 1.0.0
 */

/** 聊天消息类型 */
export type ChatMessageType = 'text' | 'voice' | 'image';

/** 聊天消息角色 */
export type ChatRole = 'user' | 'assistant';

/** 聊天消息 */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  type?: ChatMessageType;
}

/** AI 浮窗交互事件数据 */
export interface AIInteractionData {
  expanded?: boolean;
  listening?: boolean;
  message?: ChatMessage;
}

/** AI 浮窗交互事件类型 */
export type AIInteractionType =
  | 'toggle-expanded'
  | 'voice-click'
  | 'send-message';
